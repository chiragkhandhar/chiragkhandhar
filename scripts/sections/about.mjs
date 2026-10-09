export default function about({ about, years }) {
  if (!about) return '';
  const text = years ? about.replaceAll('{years}', years) : about.replaceAll('{years}+ years of ', '');
  return `## About\n\n${text}`;
}
