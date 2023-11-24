export function splitEvery<T>(splitCount: number, arr: T[]) {
  const result = [];
  for (let i = 0; i < arr.length; i += splitCount) {
    result.push(arr.slice(i, i + splitCount));
  }
  return result;
}
