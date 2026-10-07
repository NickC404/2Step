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

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../2fa.directory/sites.json');
const API = 'https://api.2fa.directory/v3/all.json';

// Upstream field -> local field. This order also defines the key order emitted
// for each site, matching the existing file's convention.
const FIELDS = [
  ['tfa', 'methods'],
  ['custom-software', 'custom-software'],
  ['custom-hardware', 'custom-hardware'],
  ['documentation', 'documentation'],
  ['notes', 'notes'],
  ['recovery', 'recovery'],
];

// Fields that hold links. The popup opens these, so anything that isn't a plain
// http(s) URL is dropped at import time rather than shipped in the bundle.
const URL_FIELDS = new Set(['documentation', 'recovery']);
const isHttpUrl = (v) => typeof v === 'string' && /^https?:\/\//i.test(v);

async function main() {
  console.log(`Fetching ${API} ...`);
  const res = await fetch(API);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching directory`);
  const entries = await res.json();

  const sites = {};
  const rejected = [];
  for (const [, obj] of entries) {
    if (!obj || !obj.domain) continue;
    const val = {};
    for (const [src, dst] of FIELDS) {
      const v = obj[src];
      if (!v || (Array.isArray(v) && !v.length)) continue;
      if (URL_FIELDS.has(dst) && !isHttpUrl(v)) {
        rejected.push(`${obj.domain} ${dst}: ${JSON.stringify(v)}`);
        continue;
      }
      val[dst] = v;
    }
    for (const d of [obj.domain, ...(obj['additional-domains'] || [])]) {
      sites[d] = val;
    }
  }

  if (rejected.length) {
    console.warn(`\n⚠ Dropped ${rejected.length} link(s) that are not http(s) URLs:`);
    for (const r of rejected) console.warn(`  ${r}`);
    console.warn('');
  }

  // Sort alphabetically by domain for stable, reviewable diffs.
  const sorted = {};
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
