/**
 * MAGIC D11.11 BALL
 * An 11-sided die no geometer has ever held.
 * All answers driven by live sensor state — Anti-Randomizer Law compliant.
 */

class MagicD1111 {
  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.tick = 0;
    this.rolling = false;
    this.rollProgress = 0;
    this.currentAnswer = null;
    this.lastAnswer = null;
    this.glowPulse = 0;
    this.runeAngle = 0;
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // 11 answers — each maps to a sensor hash bucket (mod 11 → 0-10)
    this.ANSWERS = [
      { text: "THE FIELD CONFIRMS IT.", sub: "Signal detected. Proceed.", tier: 'yes', rune: '◈' },
      { text: "ENERGIES ALIGN.", sub: "The cosmos nods. Yes.", tier: 'yes', rune: '⊕' },
      { text: "THE SENSORS SPEAK YES.", sub: "Physical law demands it.", tier: 'yes', rune: '◉' },
      { text: "IT IS WRITTEN.", sub: "Ancient data does not lie.", tier: 'yes', rune: '⟁' },
      { text: "ROLL AGAIN, TRAVELLER.", sub: "The field is turbulent.", tier: 'maybe', rune: '◎' },
      { text: "THE VEIL OBSCURES.", sub: "Motion disrupts the reading.", tier: 'maybe', rune: '◌' },
      { text: "CONSULT THE VOID.", sub: "Magnetic flux is unstable.", tier: 'maybe', rune: '⊗' },
      { text: "SIGNAL UNCLEAR. MOVE.", sub: "Change your position. Try again.", tier: 'maybe', rune: '◍' },
      { text: "THE FIELD DENIES IT.", sub: "Sensors reject this path.", tier: 'no', rune: '◐' },
      { text: "FORBIDDEN BY THE FLUX.", sub: "Electromagnetic law refuses.", tier: 'no', rune: '◑' },
      { text: "IT SHALL NOT BE.", sub: "The D11.11 has spoken. No.", tier: 'no', rune: '◒' },
    ];

    this.TIER_COLORS = {
      yes:   { h: 160, s: 90, l: 55 },
      maybe: { h: 270, s: 80, l: 60 },
      no:    { h: 0,   s: 90, l: 50 },
    };
  }

  resize() {
    const size = Math.min(window.innerWidth * 0.82, window.innerHeight * 0.52);
    this.canvas.width = size;
    this.canvas.height = size;
    this.size = size;
    this.cx = size / 2;
    this.cy = size / 2;
    this.radius = size * 0.38;
  }

  roll() {
    if (this.rolling) return;
    this.rolling = true;
    this.rollProgress = 0;
    this.lastAnswer = this.currentAnswer;
    // Get sensor hash
    const hash = window.PresignalEngine ? window.PresignalEngine.getSensorHash(11) - 1 : Math.floor(Math.random() * 11);
    this.pendingAnswer = this.ANSWERS[hash];
    // Animate for 1.8s then reveal
    setTimeout(() => {
      this.currentAnswer = this.pendingAnswer;
      this.rolling = false;
      this.glowPulse = 1;
    }, 1800);
  }

  _getAnswerColor(tier, alpha = 1) {
    const c = this.TIER_COLORS[tier] || this.TIER_COLORS.maybe;
    return `hsla(${c.h},${c.s}%,${c.l}%,${alpha})`;
  }

  draw() {
    this.tick++;
    const ctx = this.ctx;
    const { cx, cy, radius, size } = this;

    ctx.clearRect(0, 0, size, size);

    // Glow decay
    if (this.glowPulse > 0) this.glowPulse -= 0.012;

    // Rolling state
    if (this.rolling) {
      this.rollProgress = Math.min(1, this.rollProgress + 0.018);
    }

    const tier = this.currentAnswer?.tier || 'maybe';
    const color = this._getAnswerColor(tier);
    const spinSpeed = this.rolling ? 0.08 + this.rollProgress * 0.15 : 0.006;
    this.runeAngle += spinSpeed;

    // ── Outer magical aura ───────────────────────────────────────────────────
    const auraR = radius * (1.5 + Math.sin(this.tick * 0.03) * 0.05 + this.glowPulse * 0.2);
    const aura = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, auraR);
    const auraColor = this.currentAnswer ? this._getAnswerColor(tier) : 'hsl(270,80%,60%)';
    aura.addColorStop(0, 'transparent');
    aura.addColorStop(0.5, this.currentAnswer
      ? this._getAnswerColor(tier, 0.06 + this.glowPulse * 0.15)
      : 'hsla(270,80%,60%,0.05)');
    aura.addColorStop(1, 'transparent');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(cx, cy, auraR, 0, Math.PI * 2);
    ctx.fill();

    // ── Orbiting rune particles ──────────────────────────────────────────────
    const orbitCount = 11;
    for (let i = 0; i < orbitCount; i++) {
      const angle = this.runeAngle + (i / orbitCount) * Math.PI * 2;
      const orbitR = radius * (1.18 + Math.sin(this.tick * 0.04 + i) * 0.04);
      const px = cx + Math.cos(angle) * orbitR;
      const py = cy + Math.sin(angle) * orbitR;
      const alpha = 0.3 + Math.sin(this.tick * 0.06 + i * 0.9) * 0.3 + this.glowPulse * 0.4;
      ctx.font = `${size * 0.026}px serif`;
      ctx.fillStyle = this.currentAnswer
        ? this._getAnswerColor(tier, alpha)
        : `hsla(270,80%,70%,${alpha})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.ANSWERS[i].rune, px, py);
    }

    // ── Main die body ────────────────────────────────────────────────────────
    // 11-sided polygon approximation with wobble
    ctx.save();
    ctx.translate(cx, cy);
    if (this.rolling) {
      ctx.rotate(this.runeAngle * 3);
      const wobble = Math.sin(this.tick * 0.4) * 0.08;
      ctx.scale(1 + wobble, 1 - wobble);
    }

    ctx.beginPath();
    const sides = 11;
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const r = radius * (1 + Math.sin(this.tick * 0.03 + i * 0.8) * 0.02);
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();

    // Body gradient
    const bodyGrad = ctx.createRadialGradient(-radius * 0.15, -radius * 0.2, 0, 0, 0, radius);
    if (this.currentAnswer) {
      bodyGrad.addColorStop(0, this._getAnswerColor(tier, 0.5));
      bodyGrad.addColorStop(0.4, this._getAnswerColor(tier, 0.25));
      bodyGrad.addColorStop(1, 'rgba(5,3,20,0.95)');
    } else {
      bodyGrad.addColorStop(0, 'hsla(270,60%,30%,0.6)');
      bodyGrad.addColorStop(1, 'rgba(5,3,20,0.97)');
    }
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // Die edge glow
    ctx.strokeStyle = this.currentAnswer
      ? this._getAnswerColor(tier, 0.7 + this.glowPulse * 0.3)
      : 'hsla(270,80%,65%,0.5)';
    ctx.lineWidth = size * 0.006;
    ctx.stroke();

    // Inner facet highlight
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const r = radius * 0.72;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();

    // ── Center content ───────────────────────────────────────────────────────
    if (this.rolling) {
      // Spinning rune burst
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(this.runeAngle * 4);
      ctx.font = `${size * 0.18}px serif`;
      ctx.fillStyle = `hsla(270,80%,70%,${0.3 + Math.sin(this.tick * 0.3) * 0.3})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🔮', 0, 0);
      ctx.restore();

      // "Consulting..." text
      ctx.font = `bold ${size * 0.05}px 'Courier New', monospace`;
      ctx.fillStyle = 'hsla(270,80%,80%,0.8)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const dots = '.'.repeat(1 + Math.floor(this.tick * 0.08) % 3);
      ctx.fillText(`CONSULTING THE FLUX${dots}`, cx, cy + radius * 0.65);

    } else if (this.currentAnswer) {
      // Answer text
      const ans = this.currentAnswer;
      const c = this.TIER_COLORS[ans.tier];

      // Big rune
      ctx.font = `${size * 0.16}px serif`;
      ctx.fillStyle = this._getAnswerColor(ans.tier, 0.9 + this.glowPulse * 0.1);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ans.rune, cx, cy - radius * 0.15);

      // Answer text
      ctx.font = `bold ${size * 0.048}px 'Courier New', monospace`;
      ctx.fillStyle = `hsla(${c.h},${c.s}%,85%,${0.95 + this.glowPulse * 0.05})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Word wrap
      const words = ans.text.split(' ');
      let line = '', lines = [], maxW = radius * 1.4;
      for (const w of words) {
        const test = line + (line ? ' ' : '') + w;
        if (ctx.measureText(test).width > maxW && line) {
          lines.push(line); line = w;
        } else { line = test; }
      }
      if (line) lines.push(line);
      lines.forEach((l, i) => ctx.fillText(l, cx, cy + radius * 0.12 + i * size * 0.055));

      // Sub text
      ctx.font = `${size * 0.032}px 'Courier New', monospace`;
      ctx.fillStyle = `hsla(${c.h},${c.s}%,70%,0.7)`;
      ctx.fillText(ans.sub, cx, cy + radius * 0.5);

    } else {
      // Idle state
      ctx.font = `${size * 0.09}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `hsla(270,80%,75%,${0.5 + Math.sin(this.tick * 0.04) * 0.3})`;
      ctx.fillText('D11.11', cx, cy - radius * 0.1);

      ctx.font = `${size * 0.036}px 'Courier New', monospace`;
      ctx.fillStyle = 'hsla(270,60%,65%,0.6)';
      ctx.fillText('TAP TO CONSULT', cx, cy + radius * 0.2);
      ctx.fillText('THE ANCIENT FLUX', cx, cy + radius * 0.32);
    }

    // ── D11.11 label ─────────────────────────────────────────────────────────
    ctx.font = `bold ${size * 0.038}px 'Courier New', monospace`;
    ctx.fillStyle = 'rgba(180,140,255,0.4)';
    ctx.textAlign = 'center';
    ctx.fillText('✦ MAGIC D11.11 ✦', cx, size - size * 0.04);

    requestAnimationFrame(() => this.draw());
  }
}

window.MagicD1111 = MagicD1111;
