export default function toolbox({ toolbox }) {
  if (!toolbox) return '';
  const rows = Object.entries(toolbox).map(([group, skills]) => `- **${group}**: ${skills.join(' · ')}`);
  return `## Toolbox\n\n${rows.join('\n')}`;
}
