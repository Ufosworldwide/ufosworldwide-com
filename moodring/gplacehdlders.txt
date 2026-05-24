/**
 * Generate all required PWA icons for MOOD RING
 * Run: node generate-icons.js
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outDir = path.join(__dirname, 'icons');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const cx = size / 2, cy = size / 2;

  // Background
  ctx.fillStyle = '#05030c';
  ctx.fillRect(0, 0, size, size);

  // Outer glow ring
  const outerR = size * 0.44;
  const innerR = size * 0.28;

  // Glow
  const glow = ctx.createRadialGradient(cx, cy, innerR * 0.5, cx, cy, outerR * 1.2);
  glow.addColorStop(0, 'transparent');
  glow.addColorStop(0.7, 'rgba(180,140,255,0.15)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR * 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Main ring
  const ringGrad = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);
  ringGrad.addColorStop(0, 'rgba(200,140,255,0.3)');
  ringGrad.addColorStop(0.4, 'rgba(200,140,255,0.9)');
  ringGrad.addColorStop(0.7, 'rgba(77,255,180,0.8)');
  ringGrad.addColorStop(1, 'rgba(77,170,255,0.5)');

  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
  ctx.fillStyle = ringGrad;
  ctx.fill();

  // Ring border
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(200,160,255,0.8)';
  ctx.lineWidth = size * 0.018;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(77,255,200,0.6)';
  ctx.lineWidth = size * 0.012;
  ctx.stroke();

  // Moon emoji in center
  ctx.font = `${innerR * 1.3}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🌕', cx, cy);

  return canvas.toBuffer('image/png');
}

sizes.forEach(size => {
  const buf = drawIcon(size);
  const out = path.join(outDir, `icon-${size}.png`);
  fs.writeFileSync(out, buf);
  console.log(`✓ icon-${size}.png`);
});

console.log('\n✦ All icons generated in /icons/');
