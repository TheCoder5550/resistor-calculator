// Generates array with numbers from 0 to n
export default function copies(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}