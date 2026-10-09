const line = (name, summary) => `- **${name}**${summary ? `: ${summary}` : ''}`;
const details = (summary, items) =>
  items.length ? ['<details>', `<summary>${summary}</summary>`, '', ...items, '', '</details>', ''] : [];

export default function experience({ experience }) {
  if (!experience) return '';
  const current = experience.filter((role) => role.current);
  const earlier = experience.filter((role) => !role.current);
  const lines = ['## Experience', ''];

  for (const { org, title, summary, highlights = [], engagements = [] } of current) {
    lines.push(`### ${org}${title ? `, ${title}` : ''}`, '');
    if (summary) lines.push(summary, '');
    lines.push(...highlights.map((h) => `- ${h}`));
    if (highlights.length) lines.push('');

    for (const { client, summary: s, highlights: h = [] } of engagements.filter((e) => e.current)) {
      lines.push(`**${client}** · current`, '');
      if (s) lines.push(s, '');
      lines.push(...h.map((item) => `- ${item}`), '');
    }
    const past = engagements.filter((e) => !e.current).map(({ client, summary: s }) => line(client, s));
    lines.push(...details(`Earlier at ${org}`, past));
  }

  const before = current[0]?.org ? `Before ${current[0].org}` : 'Earlier roles';
  lines.push(...details(before, earlier.map(({ org, summary }) => line(org, summary))));
  return lines.join('\n');
}
