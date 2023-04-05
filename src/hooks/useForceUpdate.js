import { useCallback, useState } from "react";

export function useForceUpdate() {
  const [, update] = useState({});
  return useCallback(() => update(), []);
}
