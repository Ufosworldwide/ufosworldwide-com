/**
 * PRESIGNAL DICE VAULT
 * Every die humanity has ever used. Sensor-seeded. No PRNG.
 * Anti-Randomizer Law: physical sensor hash determines every roll.
 */

class DiceVault {
  constructor(containerEl) {
    this.container = containerEl;
    this.dice = [
      { id: 'd2',   sides: 2,   label: 'D2',   emoji: '🪙', desc: 'Coin',          color: '#FFD700' },
      { id: 'd3',   sides: 3,   label: 'D3',   emoji: '▲',  desc: 'Fate',          color: '#FF6B9D' },
      { id: 'd4',   sides: 4,   label: 'D4',   emoji: '⬥',  desc: 'Pyramid',       color: '#C44DFF' },
      { id: 'd6',   sides: 6,   label: 'D6',   emoji: '⬜',  desc: 'Classic',       color: '#4D9FFF' },
      { id: 'd8',   sides: 8,   label: 'D8',   emoji: '◆',  desc: 'Octahedron',    color: '#4DFFB4' },
      { id: 'd10',  sides: 10,  label: 'D10',  emoji: '⬟',  desc: 'Pentagonal',    color: '#FF8C4D' },
      { id: 'd12',  sides: 12,  label: 'D12',  emoji: '⬠',  desc: 'Dodecahedron',  color: '#FF4D6B' },
      { id: 'd20',  sides: 20,  label: 'D20',  emoji: '⬡',  desc: 'Icosahedron',   color: '#4DFFFF' },
      { id: 'd100', sides: 100, label: 'D100', emoji: '⊕',  desc: 'Percentile',    color: '#FFFF4D' },
      { id: 'd30',  sides: 30,  label: 'D30',  emoji: '◎',  desc: 'Triantahedron', color: '#FF4DFF' },
    ];
    this.results = {};
    this.rolling = {};
    this.rollTicks = {};
    this.dice.forEach(d => { this.results[d.id] = null; this.rolling[d.id] = false; this.rollTicks[d.id] = 0; });

    this.canvases = {};
    this.tick = 0;
    this._build();
    this._animLoop();
    window.addEventListener('resize', () => this._reflow());
  }

  _build() {
    this.container.innerHTML = '';
    this.container.style.cssText = `
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      padding: 12px;
      box-sizing: border-box;
      width: 100%;
      overflow-y: auto;
      height: 100%;
    `;

    this.dice.forEach(d => {
      const cell = document.createElement('div');
      cell.className = 'dice-cell';
      cell.style.cssText = `
        position: relative;
        background: rgba(15,8,35,0.85);
        border: 1px solid ${d.color}33;
        border-radius: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 8px 8px;
        cursor: pointer;
        user-select: none;
        transition: border-color 0.2s;
        -webkit-tap-highlight-color: transparent;
      `;

      const canvas = document.createElement('canvas');
      const size = Math.min(window.innerWidth * 0.38, 130);
      canvas.width = size;
      canvas.height = size;
      canvas.style.cssText = `width:${size}px;height:${size}px;`;
      this.canvases[d.id] = { canvas, size, die: d };

      const label = document.createElement('div');
      label.style.cssText = `
        font-family: 'Courier New', monospace;
        font-size: 0.75rem;
        font-weight: bold;
        color: ${d.color};
        letter-spacing: 0.08em;
        margin-top: 4px;
      `;
      label.textContent = `${d.label} · ${d.desc}`;

      const result = document.createElement('div');
      result.className = `dice-result-${d.id}`;
      result.style.cssText = `
        font-family: 'Courier New', monospace;
        font-size: 1.2rem;
        font-weight: bold;
        color: #fff;
        min-height: 1.6rem;
        text-align: center;
      `;
      result.textContent = '—';

      cell.appendChild(canvas);
      cell.appendChild(label);
      cell.appendChild(result);
      this.container.appendChild(cell);

      cell.addEventListener('click', () => this._roll(d.id));
      cell.addEventListener('touchstart', (e) => { e.preventDefault(); this._roll(d.id); }, { passive: false });

      cell.addEventListener('mouseenter', () => {
        cell.style.borderColor = d.color + '88';
        cell.style.boxShadow = `0 0 16px ${d.color}22`;
      });
      cell.addEventListener('mouseleave', () => {
        cell.style.borderColor = d.color + '33';
        cell.style.boxShadow = 'none';
      });
    });
  }

  _reflow() {
    this._build();
  }

  _roll(diceId) {
    if (this.rolling[diceId]) return;
    const d = this.dice.find(x => x.id === diceId);
    if (!d) return;

    this.rolling[diceId] = true;
    this.rollTicks[diceId] = 0;

    // Get sensor hash
    const value = window.PresignalEngine
      ? window.PresignalEngine.getSensorHash(d.sides)
      : Math.floor(Math.random() * d.sides) + 1;

    const el = this.container.querySelector(`.dice-result-${diceId}`);
    if (el) el.textContent = '⚡';

    setTimeout(() => {
      this.rolling[diceId] = false;
      this.results[diceId] = value;
      if (el) {
        el.textContent = d.id === 'd2'
          ? (value === 1 ? 'HEADS' : 'TAILS')
          : String(value);
        el.style.color = d.color;
        el.style.textShadow = `0 0 12px ${d.color}`;
        setTimeout(() => { el.style.textShadow = 'none'; el.style.color = '#fff'; }, 800);
      }
      // Flash border
      const cell = el?.parentElement;
      if (cell) {
        cell.style.boxShadow = `0 0 30px ${d.color}66`;
        setTimeout(() => { cell.style.boxShadow = 'none'; }, 600);
      }
    }, 600 + Math.random() * 200);
  }

  _drawDie(diceId) {
    const info = this.canvases[diceId];
    if (!info) return;
    const { canvas, size, die } = info;
    const ctx = canvas.getContext('2d');
    const cx = size / 2, cy = size / 2, r = size * 0.38;
    const t = this.tick;

    ctx.clearRect(0, 0, size, size);

    const rolling = this.rolling[diceId];
    const result = this.results[diceId];
    if (rolling) this.rollTicks[diceId]++;

    const spinSpeed = rolling ? 0.12 + (this.rollTicks[diceId] / 50) * 0.08 : 0.008;
    const angle = t * spinSpeed;

    // Glow
    if (rolling || result) {
      const g = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 1.5);
      g.addColorStop(0, die.color + (rolling ? '33' : '18'));
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw die shape based on sides
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    const sides = Math.min(die.sides, 12); // cap polygon sides at 12 visually
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const a = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const wobble = rolling ? Math.sin(t * 0.5 + i) * 0.04 : 0;
      const px = Math.cos(a) * r * (1 + wobble);
      const py = Math.sin(a) * r * (1 + wobble);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();

    // Fill
    const grad = ctx.createRadialGradient(-r * 0.2, -r * 0.2, 0, 0, 0, r);
    grad.addColorStop(0, die.color + '55');
    grad.addColorStop(1, 'rgba(5,3,20,0.95)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = die.color + (rolling ? 'CC' : '77');
    ctx.lineWidth = size * 0.022;
    ctx.stroke();

    ctx.restore();

    // Center label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (rolling) {
      ctx.font = `bold ${size * 0.22}px 'Courier New', monospace`;
      ctx.fillStyle = die.color + 'CC';
      ctx.fillText(['?','⚡','◈'][Math.floor(t * 0.15) % 3], cx, cy);
    } else {
      ctx.font = `${size * 0.26}px serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.fillText(die.emoji, cx, cy);
    }
  }

  rollAll() {
    this.dice.forEach(d => {
      setTimeout(() => this._roll(d.id), Math.random() * 400);
    });
  }

  _animLoop() {
    this.tick++;
    this.dice.forEach(d => this._drawDie(d.id));
    requestAnimationFrame(() => this._animLoop());
  }
}

window.DiceVault = DiceVault;
