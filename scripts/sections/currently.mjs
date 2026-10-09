export default function currently({ currently }) {
  if (!currently) return '';
  return `## Currently\n\n${currently.map((item) => `- ${item}`).join('\n')}`;
}
