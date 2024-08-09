export default function usePositivePoints(points: number) {
  if (points < 0) {
    points = points * -1;
  }
  return String(points).padStart(4, "0").split("");
}
