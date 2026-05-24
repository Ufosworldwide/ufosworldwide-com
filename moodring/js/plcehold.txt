/**
 * PRESIGNAL SENSOR ENGINE v1.0
 * Anti-Randomizer Law: No PRNG. All output driven by physical sensor measurement.
 * Sensors: Accelerometer, Gyroscope, Magnetometer, Microphone, Camera, Geolocation, Battery, Network
 */

class PresignalSensorEngine {
  constructor() {
    this.state = {
      accel: { x: 0, y: 0, z: 0, delta: 0 },
      gyro: { alpha: 0, beta: 0, gamma: 0, rate: 0 },
      mag: { heading: 0, absolute: false },
      audio: { rms: 0, peak: 0, dominantFreq: 0, bass: 0, mid: 0, treble: 0 },
      face: { mouthOpen: 0, detected: false, smile: 0 },
      geo: { lat: 0, lng: 0, moonPhase: 0, moonName: '' },
      battery: { level: 1, charging: false },
      network: { type: 'unknown', strength: 0 },
      light: { lux: -1 },
      composite: { mood: 0, energy: 0, harmony: 0, signal: 0 }
    };

    this.listeners = [];
    this.audioCtx = null;
    this.analyser = null;
    this.audioData = null;
    this.faceStream = null;
    this.faceCanvas = null;
    this.faceCtx = null;
    this.faceInterval = null;
    this._prevAccel = { x: 0, y: 0, z: 0 };
    this._prevGyroRate = 0;
    this.active = false;
  }

  async init() {
    this.active = true;
    await this._initMotion();
    await this._initAudio();
    await this._initGeo();
    await this._initBattery();
    this._initNetwork();
    this._startCompositeLoop();
  }

  // ── MOTION ──────────────────────────────────────────────────────────────────
  async _initMotion() {
    // Request permission on iOS 13+
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      try { await DeviceMotionEvent.requestPermission(); } catch (e) {}
    }
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try { await DeviceOrientationEvent.requestPermission(); } catch (e) {}
    }

    window.addEventListener('devicemotion', (e) => {
      if (!e.accelerationIncludingGravity) return;
      const ax = e.accelerationIncludingGravity.x || 0;
      const ay = e.accelerationIncludingGravity.y || 0;
      const az = e.accelerationIncludingGravity.z || 0;
      const dx = ax - this._prevAccel.x;
      const dy = ay - this._prevAccel.y;
      const dz = az - this._prevAccel.z;
      this.state.accel = {
        x: ax, y: ay, z: az,
        delta: Math.sqrt(dx*dx + dy*dy + dz*dz)
      };
      this._prevAccel = { x: ax, y: ay, z: az };
      if (e.rotationRate) {
        const ra = e.rotationRate.alpha || 0;
        const rb = e.rotationRate.beta || 0;
        const rg = e.rotationRate.gamma || 0;
        const rate = Math.sqrt(ra*ra + rb*rb + rg*rg);
        this.state.gyro.rate = rate;
        this._prevGyroRate = rate;
      }
      this._notify();
    });

    window.addEventListener('deviceorientation', (e) => {
      this.state.gyro.alpha = e.alpha || 0;
      this.state.gyro.beta = e.beta || 0;
      this.state.gyro.gamma = e.gamma || 0;
      this.state.mag.heading = e.alpha || 0;
      this.state.mag.absolute = e.absolute || false;
    });
  }

  // ── AUDIO ────────────────────────────────────────────────────────────────────
  async _initAudio() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.8;
      const src = this.audioCtx.createMediaStreamSource(stream);
      src.connect(this.analyser);
      this.audioData = new Uint8Array(this.analyser.frequencyBinCount);
      this._audioLoop();
    } catch (e) {
      console.warn('Audio init failed:', e);
    }
  }

  _audioLoop() {
    if (!this.active) return;
    if (!this.analyser) return;
    this.analyser.getByteFrequencyData(this.audioData);
    const len = this.audioData.length;

    // RMS
    let sum = 0;
    for (let i = 0; i < len; i++) sum += this.audioData[i] ** 2;
    this.state.audio.rms = Math.sqrt(sum / len) / 255;

    // Peak
    this.state.audio.peak = Math.max(...this.audioData) / 255;

    // Bands (bass 0-250Hz, mid 250-4kHz, treble 4k+)
    const nyquist = this.audioCtx.sampleRate / 2;
    const binHz = nyquist / len;
    const bassEnd = Math.floor(250 / binHz);
    const midEnd = Math.floor(4000 / binHz);

    let bassSum = 0, midSum = 0, trebSum = 0;
    for (let i = 0; i < bassEnd; i++) bassSum += this.audioData[i];
    for (let i = bassEnd; i < midEnd; i++) midSum += this.audioData[i];
    for (let i = midEnd; i < len; i++) trebSum += this.audioData[i];

    this.state.audio.bass = (bassSum / bassEnd) / 255;
    this.state.audio.mid = (midSum / (midEnd - bassEnd)) / 255;
    this.state.audio.treble = (trebSum / (len - midEnd)) / 255;

    // Dominant frequency
    let maxBin = 0, maxVal = 0;
    for (let i = 1; i < len; i++) {
      if (this.audioData[i] > maxVal) { maxVal = this.audioData[i]; maxBin = i; }
    }
    this.state.audio.dominantFreq = maxBin * binHz;

    requestAnimationFrame(() => this._audioLoop());
  }

  // ── CAMERA / FACE ────────────────────────────────────────────────────────────
  async initCamera(videoEl, canvasEl, facing = 'user') {
    try {
      if (this.faceStream) {
        this.faceStream.getTracks().forEach(t => t.stop());
      }
      this.faceCanvas = canvasEl;
      this.faceCtx = canvasEl.getContext('2d');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: 320, height: 240 }
      });
      this.faceStream = stream;
      videoEl.srcObject = stream;
      videoEl.play();
      if (this.faceInterval) clearInterval(this.faceInterval);
      this.faceInterval = setInterval(() => this._analyzeFace(videoEl), 100);
    } catch (e) {
      console.warn('Camera init failed:', e);
    }
  }

  _analyzeFace(videoEl) {
    if (!this.faceCtx || !videoEl.videoWidth) return;
    const w = 320, h = 240;
    this.faceCanvas.width = w;
    this.faceCanvas.height = h;
    this.faceCtx.drawImage(videoEl, 0, 0, w, h);

    // Lightweight mouth-region brightness analysis
    // Mouth region: roughly lower third of face center
    const mx = Math.floor(w * 0.3), my = Math.floor(h * 0.6);
    const mw = Math.floor(w * 0.4), mh = Math.floor(h * 0.2);

    try {
      const imageData = this.faceCtx.getImageData(mx, my, mw, mh);
      const d = imageData.data;
      let bright = 0, pixels = d.length / 4;
      for (let i = 0; i < d.length; i += 4) {
        bright += (d[i] * 0.299 + d[i+1] * 0.587 + d[i+2] * 0.114);
      }
      const avgBright = bright / pixels / 255;

      // Full frame brightness for face detection baseline
      const full = this.faceCtx.getImageData(0, 0, w, h);
      const fd = full.data;
      let fb = 0;
      for (let i = 0; i < fd.length; i += 16) {
        fb += (fd[i] * 0.299 + fd[i+1] * 0.587 + fd[i+2] * 0.114);
      }
      const fullAvg = fb / (fd.length / 64) / 255;

      // If mouth region is darker than average → mouth open (teeth/shadow contrast)
      const contrast = fullAvg - avgBright;
      this.state.face.detected = fullAvg > 0.05;
      this.state.face.mouthOpen = Math.max(0, Math.min(1, contrast * 3));
      this.state.face.smile = Math.max(0, Math.min(1, avgBright * 1.5));
    } catch (e) {}
  }

  stopCamera() {
    if (this.faceStream) {
      this.faceStream.getTracks().forEach(t => t.stop());
      this.faceStream = null;
    }
    if (this.faceInterval) {
      clearInterval(this.faceInterval);
      this.faceInterval = null;
    }
    this.state.face = { mouthOpen: 0, detected: false, smile: 0 };
  }

  // ── GEOLOCATION + MOON ──────────────────────────────────────────────────────
  async _initGeo() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos => {
      this.state.geo.lat = pos.coords.latitude;
      this.state.geo.lng = pos.coords.longitude;
      const mp = this._calcMoonPhase(new Date());
      this.state.geo.moonPhase = mp.phase;
      this.state.geo.moonName = mp.name;
      this.state.geo.moonEmoji = mp.emoji;
    }, () => {
      // fallback — still calculate moon from date
      const mp = this._calcMoonPhase(new Date());
      this.state.geo.moonPhase = mp.phase;
      this.state.geo.moonName = mp.name;
      this.state.geo.moonEmoji = mp.emoji;
    });
  }

  _calcMoonPhase(date) {
    // Accurate lunar phase calculation
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let y = year, m = month;
    if (m < 3) { y--; m += 12; }
    const a = Math.floor(y / 100);
    const b = 2 - a + Math.floor(a / 4);
    const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
    const daysSinceNew = (jd - 2451549.5) % 29.53058867;
    const phase = daysSinceNew < 0 ? daysSinceNew + 29.53058867 : daysSinceNew;
    const normalized = phase / 29.53058867;

    const phases = [
      { max: 0.033, name: 'New Moon', emoji: '🌑' },
      { max: 0.25,  name: 'Waxing Crescent', emoji: '🌒' },
      { max: 0.283, name: 'First Quarter', emoji: '🌓' },
      { max: 0.5,   name: 'Waxing Gibbous', emoji: '🌔' },
      { max: 0.533, name: 'Full Moon', emoji: '🌕' },
      { max: 0.75,  name: 'Waning Gibbous', emoji: '🌖' },
      { max: 0.783, name: 'Last Quarter', emoji: '🌗' },
      { max: 1.0,   name: 'Waning Crescent', emoji: '🌘' },
    ];
    const p = phases.find(ph => normalized <= ph.max) || phases[phases.length - 1];
    return { phase: normalized, name: p.name, emoji: p.emoji };
  }

  // ── BATTERY ─────────────────────────────────────────────────────────────────
  async _initBattery() {
    if (!navigator.getBattery) return;
    try {
      const bat = await navigator.getBattery();
      this.state.battery.level = bat.level;
      this.state.battery.charging = bat.charging;
      bat.addEventListener('levelchange', () => { this.state.battery.level = bat.level; });
      bat.addEventListener('chargingchange', () => { this.state.battery.charging = bat.charging; });
    } catch (e) {}
  }

  // ── NETWORK ─────────────────────────────────────────────────────────────────
  _initNetwork() {
    if (!navigator.connection) return;
    const update = () => {
      this.state.network.type = navigator.connection.effectiveType || 'unknown';
      this.state.network.strength = navigator.connection.downlink || 0;
    };
    update();
    navigator.connection.addEventListener('change', update);
  }

  // ── COMPOSITE SIGNAL ─────────────────────────────────────────────────────────
  _startCompositeLoop() {
    setInterval(() => {
      const s = this.state;
      // mood: face + audio combined (0=sad/angry, 1=happy)
      const audioHappy = s.audio.treble * 0.6 + s.audio.mid * 0.3 - s.audio.bass * 0.3;
      const faceMood = s.face.mouthOpen * 0.5 + s.face.smile * 0.5;
      s.composite.mood = Math.max(0, Math.min(1, audioHappy * 0.6 + faceMood * 0.4));

      // energy: motion + audio volume
      const motionEnergy = Math.min(1, s.accel.delta / 5);
      s.composite.energy = Math.max(0, Math.min(1, motionEnergy * 0.5 + s.audio.rms * 0.5));

      // harmony: low motion + stable orientation + quiet = calm harmony
      const motionCalm = 1 - Math.min(1, s.accel.delta / 10);
      const gyroCalm = 1 - Math.min(1, s.gyro.rate / 50);
      s.composite.harmony = (motionCalm * 0.5 + gyroCalm * 0.5);

      // signal hash: sensor fingerprint for dice/8ball determinism
      s.composite.signal = (
        Math.abs(s.accel.x * 1000) +
        Math.abs(s.accel.y * 1000) +
        Math.abs(s.gyro.alpha * 100) +
        Math.floor(s.audio.rms * 10000) +
        Math.floor(s.mag.heading * 10)
      ) | 0;

      this._notify();
    }, 50);
  }

  // ── SENSOR HASH (for dice/ball rolls) ───────────────────────────────────────
  getSensorHash(sides) {
    const s = this.state;
    const raw = (
      Math.abs(s.accel.x * 73856) ^
      Math.abs(s.accel.y * 49979) ^
      Math.abs(s.accel.z * 83711) ^
      Math.floor(s.gyro.alpha * 997) ^
      Math.floor(s.audio.rms * 99991) ^
      Math.floor(s.mag.heading * 7919) ^
      Date.now()
    ) >>> 0;
    return (raw % sides) + 1;
  }

  subscribe(fn) { this.listeners.push(fn); }
  _notify() { this.listeners.forEach(fn => fn(this.state)); }
}

window.PresignalEngine = new PresignalSensorEngine();
