import { writeFileSync } from 'fs';
import { createCanvas } from 'canvas';

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#D97706';
  ctx.fillRect(0, 0, size, size);
  
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JB', size / 2, size / 2);
  
  return canvas.toBuffer('image/png');
}

writeFileSync('public/icon-192.png', generateIcon(192));
writeFileSync('public/icon-512.png', generateIcon(512));
console.log('Icons generated successfully');
