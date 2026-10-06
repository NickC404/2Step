// Generates the extension's static icon set (icons/icon{16,32,48,128}.png)
// from the 2Step shield logo, using the Chromium that ships with Playwright.
//
//   npm run gen:icons
//
// These are the manifest's default icons. The toolbar icon is still recoloured
// at runtime by background.js (green / red / grey); this set is the fallback and
// the Web Store listing icon.
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../icons');
const SIZES = [16, 32, 48, 128];

const svg = (size) => `<!doctype html><meta charset="utf-8">
<style>html,body{margin:0;padding:0;background:transparent}</style>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#2563eb"/>
      <stop offset="1" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="url(#g)"/>
  <polyline points="8.5 11.5 11 14 15.5 8.5" fill="none" stroke="#fff"
    stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await mkdir(OUT, { recursive: true });

for (const size of SIZES) {
  await page.setContent(svg(size), { waitUntil: 'networkidle' });
  const el = await page.$('svg');
  const buf = await el.screenshot({ omitBackground: true });
  await writeFile(resolve(OUT, `icon${size}.png`), buf);
  console.log(`  wrote icons/icon${size}.png`);
}

await browser.close();
console.log('Done.');
