import { useEffect, useState } from "react";

export function useDebounceValue<T>(
  initValue: T,
  getValue: () => T,
  depends: any[],
  delay: number
) {
  const [debouncedValue, setDebouncedValue] = useState(initValue);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(getValue()), delay);
    return () => clearTimeout(handler);
  }, depends);

  return debouncedValue;
}
