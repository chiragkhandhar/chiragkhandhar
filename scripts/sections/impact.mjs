export default function impact({ impact }) {
  if (!impact) return '';
  return `## Selected impact\n\n${impact.map((item) => `- ${item}`).join('\n')}`;
}
