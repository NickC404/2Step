import { execFileSync } from 'child_process';
import { existsSync, readFileSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

if (!existsSync(join(dist, 'manifest.json'))) {
    console.error('dist/manifest.json not found. Run npm run build first.');
    process.exit(1);
}

const { version } = JSON.parse(readFileSync(join(dist, 'manifest.json'), 'utf8'));
const zipPath = join(root, `2step-${version}.zip`);

// Replace rather than update, so files removed from dist/ don't linger in the zip
rmSync(zipPath, { force: true });

// Zip from inside dist/ so manifest.json sits at the top level, as the Web Store requires
execFileSync('zip', ['-r', '-q', '-X', zipPath, '.', '-x', '*.DS_Store'], { cwd: dist, stdio: 'inherit' });

console.log(`Packaged ${zipPath}`);
