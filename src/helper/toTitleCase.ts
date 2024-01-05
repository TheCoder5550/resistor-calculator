export default function toTitleCase(s: string) {
  return s.charAt(0).toLocaleUpperCase() + s.slice(1);
}