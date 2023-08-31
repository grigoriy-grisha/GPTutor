import { useRef } from "react";

import { useEffectSkipFirst } from "$/hooks/useEffectSkipFirst";

export function useSyncToRef<T>(data: T) {
  const ref = useRef(data);
  useEffectSkipFirst(() => {
    ref.current = data;
  }, [data]);
  return ref;
}
