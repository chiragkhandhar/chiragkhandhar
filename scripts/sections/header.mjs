export default function header({ name, title, company, client, headline, banner, links }) {
  const lines = [];
  if (banner?.light) {
    lines.push(
      '<picture>',
      `  <source media="(prefers-color-scheme: dark)" srcset="${banner.dark ?? banner.light}">`,
      `  <img alt="${name}" src="${banner.light}">`,
      '</picture>',
      '',
    );
  }
  lines.push(`# ${name}`, '');
  const role = [title && `**${title}**`, company && `@ ${company}`, client && `· currently with ${client}`];
  if (title || company) lines.push(role.filter(Boolean).join(' '));
  if (headline) lines.push('', `${headline}`);
  if (links) {
    lines.push('', Object.entries(links).map(([label, url]) => `[${label}](${url})`).join(' · '));
  }
  return lines.join('\n');
}
