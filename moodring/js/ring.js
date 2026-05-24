/**
 * PRESIGNAL MOOD RING RENDERER
 * 80s MTV × New Age 90s × Retro ring art
 * Color: white (joy) → gold → cyan → purple → red → black (despair)
 */

class MoodRingRenderer {
  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.mood = 0.5;
    this.energy = 0.1;
    this.moonPhase = 0.5;
    this.moonEmoji = '🌕';
    this.rms = 0;
    this.pulse = 0;
    this.tick = 0;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const size = Math.min(window.innerWidth * 0.72, window.innerHeight * 0.42);
    this.canvas.width = size;
    this.canvas.height = size;
    this.size = size;
    this.cx = size / 2;
    this.cy = size / 2;
    this.outerR = size * 0.44;
    this.innerR = size * 0.28;
  }

  update(state) {
    this.mood = state.composite.mood;
    this.energy = state.composite.energy;
    this.moonPhase = state.geo.moonPhase;
    this.moonEmoji = state.geo.moonEmoji || '🌙';
    this.rms = state.audio.rms;
    this.harmony = state.composite.harmony;
  }

  _moodToColor(mood, alpha = 1) {
    const stops = [
      { t: 1.00, h: 0,   s: 0,   l: 100 },   // white
      { t: 0.85, h: 48,  s: 100, l: 65  },   // gold
      { t: 0.70, h: 160, s: 100, l: 60  },   // cyan-green
      { t: 0.55, h: 200, s: 90,  l: 65  },   // sky blue
      { t: 0.40, h: 270, s: 80,  l: 60  },   // purple
      { t: 0.25, h: 320, s: 90,  l: 45  },   // magenta-red
      { t: 0.10, h: 0,   s: 90,  l: 35  },   // red
      { t: 0.00, h: 0,   s: 80,  l: 6   },   // near-black
    ];
    let lo = stops[stops.length - 1], hi = stops[0];
    for (let i = 0; i < stops.length - 1; i++) {
      if (mood >= stops[i + 1].t && mood <= stops[i].t) {
        hi = stops[i]; lo = stops[i + 1]; break;
      }
    }
    const t = (mood - lo.t) / ((hi.t - lo.t) || 1);
    const h = lo.h + (hi.h - lo.h) * t;
    const s = lo.s + (hi.s - lo.s) * t;
    const l = lo.l + (hi.l - lo.l) * t;
    return `hsla(${h},${s}%,${l}%,${alpha})`;
  }

  draw() {
    this.tick++;
    const ctx = this.ctx;
    const { cx, cy, outerR, innerR, size, mood, energy, rms } = this;

    // Audio pulse
    this.pulse = this.pulse * 0.85 + rms * 0.15;
    const breathe = Math.sin(this.tick * 0.04) * 0.015;
    const pulseFactor = 1 + this.pulse * 0.18 + breathe;

    ctx.clearRect(0, 0, size, size);

    // ── Outer glow halo ──────────────────────────────────────────────────────
    const haloR = outerR * pulseFactor * 1.35;
    const halo = ctx.createRadialGradient(cx, cy, innerR * 0.8, cx, cy, haloR);
    halo.addColorStop(0, this._moodToColor(mood, 0));
    halo.addColorStop(0.6, this._moodToColor(mood, 0.08 + energy * 0.12));
    halo.addColorStop(1, this._moodToColor(mood, 0));
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
    ctx.fill();

    // ── Rotating outer rune ring ─────────────────────────────────────────────
    const runeCount = 12;
    const runeR = outerR * pulseFactor * 1.12;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.tick * 0.005 * (1 + energy * 2));
    for (let i = 0; i < runeCount; i++) {
      const angle = (i / runeCount) * Math.PI * 2;
      const rx = Math.cos(angle) * runeR;
      const ry = Math.sin(angle) * runeR;
      ctx.font = `${size * 0.028}px serif`;
      ctx.fillStyle = this._moodToColor(mood, 0.5 + Math.sin(this.tick * 0.07 + i) * 0.3);
      ctx.fillText(['◈','⟁','◉','⊕','◎','⊗','◌','◍','◐','◑','◒','◓'][i], rx - 5, ry + 5);
    }
    ctx.restore();

    // ── Main ring body ───────────────────────────────────────────────────────
    const ringGrad = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR * pulseFactor);
    ringGrad.addColorStop(0,   this._moodToColor(mood, 0.3));
    ringGrad.addColorStop(0.3, this._moodToColor(mood, 0.95));
    ringGrad.addColorStop(0.6, this._moodToColor(Math.min(1, mood + 0.1), 0.85));
    ringGrad.addColorStop(1,   this._moodToColor(Math.max(0, mood - 0.15), 0.4));

    ctx.beginPath();
    ctx.arc(cx, cy, outerR * pulseFactor, 0, Math.PI * 2);
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
    ctx.fillStyle = ringGrad;
    ctx.fill();

    // ── Ring shimmer overlay ─────────────────────────────────────────────────
    const shimmerAngle = (this.tick * 0.02) % (Math.PI * 2);
    const sx = cx + Math.cos(shimmerAngle) * (outerR * 0.7);
    const sy = cy + Math.sin(shimmerAngle) * (outerR * 0.7);
    const shimmer = ctx.createRadialGradient(sx, sy, 0, sx, sy, outerR * 0.5);
    shimmer.addColorStop(0, `rgba(255,255,255,${0.15 + mood * 0.25})`);
    shimmer.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, outerR * pulseFactor, 0, Math.PI * 2);
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
    ctx.fillStyle = shimmer;
    ctx.fill();

    // ── Ring border strokes ──────────────────────────────────────────────────
    ctx.beginPath();
    ctx.arc(cx, cy, outerR * pulseFactor, 0, Math.PI * 2);
    ctx.strokeStyle = this._moodToColor(mood, 0.8);
    ctx.lineWidth = size * 0.006;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.strokeStyle = this._moodToColor(mood, 0.5);
    ctx.lineWidth = size * 0.004;
    ctx.stroke();

    // ── Audio frequency bars (inner ring) ───────────────────────────────────
    if (window.PresignalEngine?.analyser) {
      const data = window.PresignalEngine.audioData;
      if (data) {
        const bars = 64;
        const step = Math.floor(data.length / bars);
        for (let i = 0; i < bars; i++) {
          const val = (data[i * step] || 0) / 255;
          const angle = (i / bars) * Math.PI * 2 - Math.PI / 2;
          const barLen = val * innerR * 0.4;
          const r1 = innerR - barLen;
          const r2 = innerR - 2;
          const x1 = cx + Math.cos(angle) * r1;
          const y1 = cy + Math.sin(angle) * r1;
          const x2 = cx + Math.cos(angle) * r2;
          const y2 = cy + Math.sin(angle) * r2;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = this._moodToColor(mood, 0.6 + val * 0.4);
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }

    // ── Moon in center ───────────────────────────────────────────────────────
    ctx.font = `${innerR * 0.85}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = `rgba(255,255,255,${0.7 + Math.sin(this.tick * 0.03) * 0.2})`;
    ctx.fillText(this.moonEmoji || '🌙', cx, cy);

    // ── CRT scanline overlay on ring ─────────────────────────────────────────
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, outerR * pulseFactor, 0, Math.PI * 2);
    ctx.clip();
    for (let y = 0; y < size; y += 3) {
      ctx.fillStyle = 'rgba(0,0,0,0.04)';
      ctx.fillRect(0, y, size, 1);
    }
    ctx.restore();

    requestAnimationFrame(() => this.draw());
  }
}

window.MoodRingRenderer = MoodRingRenderer;
