import { useEffect, useRef } from "react";

function useDebounce<Params extends any[]>(
  fn: (...params: Params) => void,
  delay: number = 500
) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (...args: Params) => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default useDebounce;
