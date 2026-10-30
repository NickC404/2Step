// Refreshes 2fa.directory/sites.json from the upstream 2FA Directory API.
//
//   npm run update:sites
//
// The upstream feed is an array of [name, entry] pairs. We flatten it to a
// domain-keyed map ({ "domain": { methods, ... } }), expanding each entry's
// additional-domains, and sort alphabetically so diffs stay minimal. Sites
// with no 2FA are kept as {} (the popup treats them as "not supported").
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { methodConfig } from '../src/methodConfig.js';
import { isDomain, VALID } from './site-validation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../2fa.directory/sites.json');
const API = 'https://api.2fa.directory/v3/all.json';

// Upstream field -> local field. This order also defines the key order emitted
// for each site, matching the existing file's convention. Only fields the
// extension uses are imported; anything else upstream sends is left out.
const FIELDS = [
  ['tfa', 'methods'],
  ['documentation', 'documentation'],
];

async function main() {
  console.log(`Fetching ${API} ...`);
  const res = await fetch(API);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching directory`);
  const entries = await res.json();

  // No prototype, so a domain can never collide with an inherited property.
  const sites = Object.create(null);
  const rejected = [];
  for (const [, obj] of entries) {
    if (!obj || !obj.domain) continue;
    const val = {};
    for (const [src, dst] of FIELDS) {
      const v = obj[src];
      if (!v || (Array.isArray(v) && !v.length)) continue;
      if (!VALID[dst](v)) {
        rejected.push(`${obj.domain} ${dst}: ${JSON.stringify(v)}`);
        continue;
      }
      val[dst] = v;
    }
    const extra = Array.isArray(obj['additional-domains']) ? obj['additional-domains'] : [];
    for (const d of [obj.domain, ...extra]) {
      if (!isDomain(d)) {
        rejected.push(`domain: ${JSON.stringify(d)}`);
        continue;
      }
      sites[d] = val;
    }
  }

  if (rejected.length) {
    console.warn(`\n⚠ Dropped ${rejected.length} value(s) that failed validation:`);
    for (const r of rejected) console.warn(`  ${r}`);
    console.warn('');
  }

  // Sort alphabetically by domain for stable, reviewable diffs.
  const sorted = Object.create(null);
  for (const d of Object.keys(sites).sort()) sorted[d] = sites[d];

  // Warn about method IDs the UI can't render (see src/methodConfig.js).
  const known = new Set(Object.keys(methodConfig));
  const unknown = new Set();
  for (const v of Object.values(sorted)) {
    for (const m of v.methods || []) if (!known.has(m)) unknown.add(m);
  }
  if (unknown.size) {
    console.warn(`\n⚠ Unknown method IDs not in methodConfig.js (will render as "Unknown"): ${[...unknown].join(', ')}`);
    console.warn('  Add them to src/methodConfig.js and src/components/SiteDetails.vue.\n');
  }

  // Diff summary against the current file.
  let prev = {};
  try { prev = JSON.parse(await readFile(OUT, 'utf8')); } catch { /* first run */ }
  const prevKeys = new Set(Object.keys(prev));
  const added = Object.keys(sorted).filter((d) => !prevKeys.has(d));
  const removed = Object.keys(prev).filter((d) => !(d in sorted));

  await writeFile(OUT, JSON.stringify(sorted, null, 4) + '\n');

  console.log(`✔ Wrote ${Object.keys(sorted).length} domains to 2fa.directory/sites.json`);
  console.log(`  +${added.length} added, -${removed.length} removed vs previous`);
  if (removed.length) console.log(`  removed: ${removed.join(', ')}`);
  console.log('\nRun `npm run build` to copy the refreshed data into dist/.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
