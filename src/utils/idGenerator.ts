// Gives empty ID ~0.03 % of the time, thus might cause error
export default function idGenerator() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substring(2, 10)
}
