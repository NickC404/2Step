// Generates the Chrome Web Store listing images into store-assets/:
//
//   screenshot-{1..4}.png   1280x800 listing screenshots
//   promo-small.png         440x280 small promo tile
//
//   npm run build && npm run gen:store-assets
//
// The popup captures are taken from the real built extension (dist/), loaded
// into the Chromium that ships with Playwright. Only the active tab's URL is
// stubbed, so each shot can show a chosen site.
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');
const OUT = resolve(__dirname, '../store-assets');

const POPUP = { width: 400, height: 600 };

// Each shot: the site the popup should think it's on, the steps to reach the
// view, and the copy shown beside it.
const SHOTS = [
  {
    url: 'https://github.com/',
    title: 'Know if a site supports two\u2011factor authentication',
    body: 'Open 2Step on any website to see whether you can protect your account with a second step, and which methods it offers.',
    legend: true,
  },
  {
    url: 'https://archive.org/',
    title: 'Spot the accounts you can’t lock down',
    body: 'When a site has no second step to offer, 2Step tells you plainly, so you know where a strong, unique password matters most.',
  },
  {
    url: 'https://github.com/',
    title: 'Search a directory of over 3,000 sites',
    body: 'Look up any service before you sign up. The data comes from the community-maintained 2FA Directory and ships with the extension.',
    steps: async (frame) => {
      await frame.getByRole('tab', { name: 'Directory' }).click();
      await frame.getByRole('searchbox').first().fill('bank');
    },
  },
  {
    url: 'https://github.com/',
    title: 'A checklist for better account security',
    body: 'Work through practical tips in order of importance and tick them off as you go. Nothing you do leaves your browser.',
    steps: async (frame) => {
      await frame.getByRole('tab', { name: 'Tips' }).click();
      const boxes = frame.locator('#tabpanel-tips button[aria-pressed]');
      await boxes.nth(0).click();
      await boxes.nth(1).click();
    },
  },
];

const SHIELD = 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z';

// Toolbar icon states, drawn to match background.js.
const legendIcon = (from, to, mark) => `
  <svg width="28" height="28" viewBox="0 0 32 32">
    <defs><linearGradient id="l${from.slice(1)}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
    </linearGradient></defs>
    <path d="M16 2 4 6v10c0 8 12 14 12 14s12-6 12-14V6z" fill="url(#l${from.slice(1)})"/>
    <path d="${mark}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const legend = `
  <div class="legend">
    <p class="legend-title">The toolbar icon shows the answer before you click</p>
    <div class="legend-row">
      <span>${legendIcon('#10b981', '#059669', 'M11 16l4 4 6-7')}Supported</span>
      <span>${legendIcon('#f43f5e', '#e11d48', 'M12 12l8 8M20 12l-8 8')}Not supported</span>
    </div>
  </div>`;

const BASE_CSS = `
  * { box-sizing: border-box; }
  html, body { margin: 0; }
  body {
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    background:
      radial-gradient(900px 600px at 85% 10%, rgba(96, 165, 250, .35), transparent 60%),
      linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%);
    overflow: hidden;
  }
  .brand { display: flex; align-items: center; gap: 10px; font-weight: 700; letter-spacing: -.01em; }
`;

const brand = (size) => `
  <div class="brand" style="font-size:${size}px">
    <svg width="${size * 1.25}" height="${size * 1.25}" viewBox="0 0 24 24" fill="none" stroke="#fff"
      stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="${SHIELD}"/><polyline points="9 11 11 13 15 9"/>
    </svg>2Step
  </div>`;

const screenshotHtml = (shot, popupPng) => `<!doctype html><meta charset="utf-8">
<style>
  ${BASE_CSS}
  body { width: 1280px; height: 800px; display: grid; grid-template-columns: 1fr 400px; column-gap: 96px;
    align-items: center; padding: 0 120px 0 104px; }
  h1 { font-size: 50px; line-height: 1.08; letter-spacing: -.025em; margin: 36px 0 20px; text-wrap: balance; }
  p.body { font-size: 21px; line-height: 1.5; margin: 0; color: #dbeafe; max-width: 30em; }
  .popup { width: 400px; height: 600px; border-radius: 14px; overflow: hidden;
    box-shadow: 0 40px 80px -20px rgba(2, 6, 23, .55), 0 0 0 1px rgba(255, 255, 255, .12); }
  .popup img { display: block; width: 400px; height: 600px; }
  .legend { margin-top: 40px; padding-top: 28px; border-top: 1px solid rgba(255, 255, 255, .2); }
  .legend-title { margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #dbeafe; }
  .legend-row { display: flex; gap: 32px; font-size: 16px; font-weight: 500; }
  .legend-row span { display: flex; align-items: center; gap: 10px; }
</style>
<div>
  ${brand(24)}
  <h1>${shot.title}</h1>
  <p class="body">${shot.body}</p>
  ${shot.legend ? legend : ''}
</div>
<div class="popup"><img src="data:image/png;base64,${popupPng.toString('base64')}"></div>`;

const promoHtml = `<!doctype html><meta charset="utf-8">
<style>
  ${BASE_CSS}
  body { width: 440px; height: 280px; display: flex; flex-direction: column; justify-content: center; padding: 0 44px; }
  p { margin: 14px 0 0; font-size: 21px; line-height: 1.3; font-weight: 500; color: #dbeafe; text-wrap: balance; }
</style>
${brand(46)}
<p>Check any site’s two-factor authentication support</p>`;

async function findExtensionId(context) {
  let [worker] = context.serviceWorkers();
  if (!worker) worker = await context.waitForEvent('serviceworker', { timeout: 30000 });
  return new URL(worker.url()).host;
}

async function capturePopup(context, extensionId, shot) {
  const page = await context.newPage();
  await page.setViewportSize(POPUP);
  // The popup asks chrome.tabs for the active tab; answer with the shot's URL.
  await page.addInitScript((url) => {
    if (globalThis.chrome?.tabs) chrome.tabs.query = async () => [{ url }];
  }, shot.url);
  await page.goto(`chrome-extension://${extensionId}/popup/index.html`);
  const frame = page.frameLocator('#sandbox-frame');
  await frame.getByRole('tab', { name: 'Current' }).waitFor();
  if (shot.steps) await shot.steps(frame);
  await page.mouse.move(0, 0);
  await page.waitForTimeout(400);
  const png = await page.screenshot();
  await page.close();
  return png;
}

async function renderHtml(context, html, width, height) {
  const page = await context.newPage();
  await page.setViewportSize({ width, height });
  await page.setContent(html, { waitUntil: 'load' });
  const png = await page.screenshot({ clip: { x: 0, y: 0, width, height } });
  await page.close();
  return png;
}

const context = await chromium.launchPersistentContext('', {
  channel: 'chromium',
  headless: true,
  deviceScaleFactor: 2,
  args: [`--disable-extensions-except=${DIST}`, `--load-extension=${DIST}`],
});
const extensionId = await findExtensionId(context);
await mkdir(OUT, { recursive: true });

// Popups are captured at 2x for sharpness; the final images must be exact
// store sizes, so they're composed in a 1x context.
const popups = [];
for (const shot of SHOTS) popups.push(await capturePopup(context, extensionId, shot));
await context.close();

const browser = await chromium.launch();
const flat = await browser.newContext({ deviceScaleFactor: 1 });
for (const [i, shot] of SHOTS.entries()) {
  const name = `screenshot-${i + 1}.png`;
  await writeFile(resolve(OUT, name), await renderHtml(flat, screenshotHtml(shot, popups[i]), 1280, 800));
  console.log(`  wrote store-assets/${name}`);
}
await writeFile(resolve(OUT, 'promo-small.png'), await renderHtml(flat, promoHtml, 440, 280));
console.log('  wrote store-assets/promo-small.png');
await browser.close();
console.log('Done.');
