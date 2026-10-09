import { readFile, writeFile } from 'node:fs/promises';
import { parse } from 'yaml';

const root = new URL('../', import.meta.url);

// Drop placeholder strings ("TODO ...") and anything left empty after that.
function clean(value) {
  if (typeof value === 'string') return value.trim().startsWith('TODO') ? undefined : value;
  if (Array.isArray(value)) {
    const items = value.map(clean).filter((v) => v !== undefined);
    return items.length ? items : undefined;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([k, v]) => [k, clean(v)])
      .filter(([, v]) => v !== undefined);
    return entries.length ? Object.fromEntries(entries) : undefined;
  }
  return value;
}

function yearsSince(yyyyMm, now = new Date()) {
  const [year, month] = String(yyyyMm).split('-').map(Number);
  return Math.floor((now.getFullYear() - year) + (now.getMonth() + 1 - (month || 1)) / 12);
}

const raw = parse(await readFile(new URL('profile.yml', root), 'utf8'));
const data = clean(raw);
if (data.career_start) data.years = yearsSince(data.career_start);

const blocks = [];
for (const name of data.sections) {
  const { default: render } = await import(`./sections/${name}.mjs`);
  const block = render(data)?.trim();
  if (block) blocks.push(block);
}

const banner = '<!-- GENERATED FILE: edit profile.yml and run `npm run render` -->';
await writeFile(new URL('README.md', root), `${banner}\n\n${blocks.join('\n\n')}\n`);
console.log(`README.md rendered (${blocks.length} sections)`);
