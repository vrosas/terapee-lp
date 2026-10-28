// Gera reel.mp4 a partir de reel.html, quadro a quadro.
// Na raiz do repositório:  python3 -m http.server 8099 &
//                          node _social/instagram-google-agenda/src/render-reel.cjs
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FPS = 30, SECONDS = 16;
const dir = path.join(__dirname, '..');
const frames = fs.mkdtempSync(path.join(require('os').tmpdir(), 'reel-'));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('http://127.0.0.1:8099/_social/instagram-google-agenda/src/reel.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.getAnimations().forEach(a => a.pause()));
  for (let i = 0; i < FPS * SECONDS; i++) {
    const t = (i * 1000) / FPS;
    await page.evaluate(t => document.getAnimations().forEach(a => { a.currentTime = t; }), t);
    await page.screenshot({ path: path.join(frames, `f${String(i).padStart(4, '0')}.png`) });
  }
  await browser.close();
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-framerate', String(FPS), '-i', path.join(frames, 'f%04d.png'),
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-crf', '18', '-movflags', '+faststart',
    path.join(dir, 'reel.mp4')]);
  fs.rmSync(frames, { recursive: true });
  console.log('ok', path.join(dir, 'reel.mp4'));
})();
