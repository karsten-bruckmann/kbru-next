export function unique<T>(
  array: T[],
  comparator: (a: T, b: T) => boolean
): T[] {
  return array.filter(
    (r, i, all) => all.findIndex((r2) => comparator(r, r2)) === i
  );
}
