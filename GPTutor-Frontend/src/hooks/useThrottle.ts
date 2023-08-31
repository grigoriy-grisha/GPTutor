import { useRef } from "react";

export function useThrottle<Params extends any[]>(
  fn: (...params: Params) => void,
  wait: number
) {
  const timerRef = useRef<number | null>(null);

  return function (...params: Params) {
    if (!timerRef.current) {
      timerRef.current = window.setTimeout(() => {
        fn(...params);
        timerRef.current = null;
      }, wait);
    }
  };
}
