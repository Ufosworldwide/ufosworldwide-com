/**
 * PRESIGNAL EMOJI MATRIX ENGINE
 * Sensor data → emoji curtain. Every emoji is a live data point.
 * No decoration. Each character means something.
 */

class EmojiMatrix {
  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.cols = 0;
    this.rows = 0;
    this.drops = [];
    this.chars = [];
    this.fontSize = 18;
    this.active = true;
    this.sensorState = null;

    // Emoji dictionaries keyed by sensor domain
    this.MOOD_HAPPY    = ['😄','😂','🥰','😍','🤩','😊','🌟','✨','💫','🎉','🦋','🌈','💖','🎵','🌸'];
    this.MOOD_NEUTRAL  = ['😐','🤔','😶','🙂','😑','💭','🔮','🌀','⚡','🌙','🔵','⭕','🔷','💠','🌊'];
    this.MOOD_SAD      = ['😔','😢','😞','😟','💔','🌧','🌑','⬛','🔴','❌','🌫','💀','🕳','🖤','🌪'];
    this.ENERGY_HIGH   = ['⚡','🔥','💥','🌊','🎆','🚀','⚡','💢','🌪','🔴','🔥'];
    this.ENERGY_LOW    = ['🌙','💤','😴','🌿','🍃','🌊','💧','❄️','🌫','⬛'];
    this.MOTION        = ['📡','🔄','↗️','↘️','↙️','↖️','⬆️','⬇️','➡️','⬅️','🔃'];
    this.MAGNETIC      = ['🧲','🔵','🔴','⚙️','🌐','📡','🛸','⚡','🔮','🌀'];
    this.AUDIO_HIGH    = ['🔊','📢','🎵','🎶','🎸','🥁','🎺','🎷','🔔','📣'];
    this.AUDIO_LOW     = ['🔇','🤫','🌿','💧','🌊','💤','🌙','⭕','🔵'];
    this.MOON          = ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'];
    this.BATTERY_HIGH  = ['🔋','⚡','💚','✅'];
    this.BATTERY_LOW   = ['🪫','⚠️','🔴','❗'];
    this.WIFI          = ['📶','📡','🌐','🔗','💻','📱'];
    this.COMPASS       = ['🧭','⬆️','↗️','➡️','↘️','⬇️','↙️','⬅️','↖️'];
    this.FACE_HAPPY    = ['😁','😄','🤣','😊','🥳','🎊','💃','🕺','🌟','🎉'];
    this.FACE_SAD      = ['😢','😭','😞','💔','😔','🌧','😟','😣','💧'];
    this.MYSTERY       = ['🔮','🌀','💠','⚗️','🧿','🔯','☯️','🌌','🪐','🌠'];

    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cols = Math.floor(this.canvas.width / this.fontSize);
    this.rows = Math.floor(this.canvas.height / this.fontSize);
    this.drops = Array(this.cols).fill(1).map(() => Math.random() * this.rows);
    this._rebuildChars();
  }

  _rebuildChars() {
    if (!this.sensorState) {
      this.chars = Array(this.cols).fill('🔮');
      return;
    }
    const s = this.sensorState;
    const pool = [];

    // Mood weighting
    if (s.composite.mood > 0.65) {
      pool.push(...this.MOOD_HAPPY, ...this.MOOD_HAPPY, ...this.FACE_HAPPY);
    } else if (s.composite.mood < 0.35) {
      pool.push(...this.MOOD_SAD, ...this.MOOD_SAD, ...this.FACE_SAD);
    } else {
      pool.push(...this.MOOD_NEUTRAL, ...this.MYSTERY);
    }

    // Energy
    if (s.composite.energy > 0.5) pool.push(...this.ENERGY_HIGH);
    else pool.push(...this.ENERGY_LOW);

    // Motion
    if (s.accel.delta > 1) pool.push(...this.MOTION);

    // Audio
    if (s.audio.rms > 0.15) pool.push(...this.AUDIO_HIGH);
    else if (s.audio.rms < 0.03) pool.push(...this.AUDIO_LOW);

    // Magnetic/compass
    pool.push(this.COMPASS[Math.floor(s.mag.heading / 45) % 8]);
    if (s.mag.absolute) pool.push(...this.MAGNETIC);

    // Moon phase
    pool.push(this.MOON[Math.floor(s.geo.moonPhase * 8)] || '🌙');

    // Battery
    if (s.battery.level < 0.2) pool.push(...this.BATTERY_LOW);
    else if (s.battery.level > 0.8) pool.push(...this.BATTERY_HIGH);

    // Network
    if (s.network.type !== 'unknown') pool.push(...this.WIFI);

    // Mystery always sprinkled
    pool.push(...this.MYSTERY);

    // Assign each column a char from pool
    this.chars = Array(this.cols).fill(null).map(() =>
      pool[Math.floor(Math.random() * pool.length)]
    );
  }

  updateSensors(state) {
    this.sensorState = state;
    if (Math.random() < 0.05) this._rebuildChars(); // gradual refresh
  }

  _getMoodColor(mood, energy) {
    // White (joy) → gold → green → blue → red → black (despair)
    const spectrum = [
      { t: 1.0,  r: 255, g: 255, b: 255 }, // pure white = max happiness
      { t: 0.85, r: 255, g: 240, b: 100 }, // gold
      { t: 0.65, r: 100, g: 255, b: 180 }, // cyan-green
      { t: 0.5,  r: 120, g: 160, b: 255 }, // blue
      { t: 0.35, r: 200, g: 80,  b: 255 }, // purple
      { t: 0.2,  r: 255, g: 80,  b: 40  }, // orange-red
      { t: 0.1,  r: 200, g: 20,  b: 20  }, // red
      { t: 0.0,  r: 20,  g: 0,   b: 0   }, // near black
    ];

    let lo = spectrum[spectrum.length - 1], hi = spectrum[0];
    for (let i = 0; i < spectrum.length - 1; i++) {
      if (mood >= spectrum[i + 1].t && mood <= spectrum[i].t) {
        hi = spectrum[i]; lo = spectrum[i + 1]; break;
      }
    }
    const t = (mood - lo.t) / (hi.t - lo.t || 1);
    const r = Math.floor(lo.r + (hi.r - lo.r) * t);
    const g = Math.floor(lo.g + (hi.g - lo.g) * t);
    const b = Math.floor(lo.b + (hi.b - lo.b) * t);
    const alpha = 0.35 + energy * 0.45;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  draw() {
    if (!this.active) return;
    const ctx = this.ctx;
    const mood = this.sensorState?.composite.mood ?? 0.5;
    const energy = this.sensorState?.composite.energy ?? 0.1;

    // Fade trail
    ctx.fillStyle = 'rgba(5, 3, 12, 0.18)';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.font = `${this.fontSize}px serif`;

    for (let i = 0; i < this.cols; i++) {
      const char = this.chars[i] || '·';
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      // Color per column based on position-weighted mood
      const colMood = Math.max(0, Math.min(1, mood + (Math.sin(i * 0.3 + Date.now() * 0.001) * 0.15)));
      ctx.fillStyle = this._getMoodColor(colMood, energy);
      ctx.fillText(char, x, y);

      // Reset drop
      if (y > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
        // Refresh this column's char
        if (this.sensorState) {
          const pool = this._getQuickPool();
          this.chars[i] = pool[Math.floor(Math.random() * pool.length)];
        }
      }
      this.drops[i] += 0.4 + energy * 0.8;
    }

    requestAnimationFrame(() => this.draw());
  }

  _getQuickPool() {
    if (!this.sensorState) return this.MYSTERY;
    const s = this.sensorState;
    const pool = [...this.MYSTERY];
    if (s.composite.mood > 0.5) pool.push(...this.MOOD_HAPPY);
    else pool.push(...this.MOOD_SAD);
    if (s.composite.energy > 0.4) pool.push(...this.ENERGY_HIGH);
    if (s.audio.rms > 0.1) pool.push(...this.AUDIO_HIGH);
    pool.push(this.MOON[Math.floor(s.geo.moonPhase * 8)] || '🌙');
    return pool;
  }
}

window.EmojiMatrix = EmojiMatrix;
