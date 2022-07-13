export function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)

  return `${minutes.toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}:${Math.floor(
    ms % 1000,
  )
    .toString()
    .padStart(3, "0")}`
}
