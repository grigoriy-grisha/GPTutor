import { useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";

export function useSubscribe(...subjects) {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const unsubscribes = subjects.map((subject) =>
      subject?.subscribe(forceUpdate)
    );

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe && unsubscribe());
    };
  }, []);
}
