import { useEffect } from "react";

import { useForceUpdate } from "./useForceUpdate";
import { Subject } from "../utils";

export function useSubscribe(...subjects: (Subject<any> | undefined)[]) {
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
