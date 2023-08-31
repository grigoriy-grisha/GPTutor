import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export function useEffectSkipFirst(
  callback: EffectCallback,
  dependencies?: DependencyList
) {
  const wasChanged = useRef(false);
  useEffect(() => {
    if (wasChanged.current) return callback();
    wasChanged.current = true;
  }, dependencies);
}
