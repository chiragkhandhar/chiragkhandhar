// Fails unless package.json's version is greater than the base branch's.
// Usage: node scripts/check-version.mjs <base-ref>   (e.g. origin/main)
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const baseRef = process.argv[2] ?? 'origin/main';
const head = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version;

let base;
try {
  base = JSON.parse(execFileSync('git', ['show', `${baseRef}:package.json`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).version;
} catch {
  console.log(`No package.json on ${baseRef}; skipping check (head is ${head}).`);
  process.exit(0);
}

const parse = (v) => {
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(v ?? '');
  if (!m) throw new Error(`Invalid version "${v}"; expected MAJOR.MINOR.PATCH`);
  return m.slice(1).map(Number);
};
const [a, b] = [parse(head), parse(base ?? '0.0.0')];
const cmp = a.map((n, i) => n - b[i]).find((d) => d !== 0) ?? 0;

if (cmp <= 0) {
  console.error(`Version not bumped: ${baseRef} is ${base}, this branch is ${head}.`);
  console.error('Run `npm version patch|minor|major --no-git-tag-version` and commit.');
  process.exit(1);
}
console.log(`Version bumped: ${base ?? 'none'} → ${head}`);
