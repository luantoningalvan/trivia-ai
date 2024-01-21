export function secondsToMinutes(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  const minutesFormatted = String(minutes).padStart(2, "0");
  const secondsFormatted = String(secondsLeft).padStart(2, "0");

  return `${minutesFormatted}:${secondsFormatted}`;
}
