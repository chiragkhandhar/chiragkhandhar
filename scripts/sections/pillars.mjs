export default function pillars({ pillars }) {
  if (!pillars) return '';
  const rows = pillars.map(({ title, proof }) => `- **${title}**${proof ? `: ${proof}` : ''}`);
  return `## What I bring\n\n${rows.join('\n')}`;
}
