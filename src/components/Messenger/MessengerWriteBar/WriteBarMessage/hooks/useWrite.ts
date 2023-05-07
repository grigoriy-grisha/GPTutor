import { useEffect, useRef, useState } from "react";
import { useTimer } from "$/hooks/useTimer";

type HookWriteParams = {
  isDone: boolean;
  isTyping: boolean;
  handleSend: (value: string) => void;
};

export function useWrite({ isDone, isTyping, handleSend }: HookWriteParams) {
  const { value: time, start } = useTimer({
    interval: 1000,
    initialValue: () => 16,
    tickHandler: (number) => number - 1,
    finisher: (number) => number === 0,
  });

  const isTimeExpire = time === 0 || time === 16;

  useEffect(() => {
    if (isDone) start(15);
  }, [isDone]);

  const [value, setValue] = useState("");

  const valueRef = useRef("");
  const isTypingRef = useRef(isTyping);
  valueRef.current = value;
  isTypingRef.current = isTyping;

  const onEnterSend = (event: any) => {
    if (!isTimeExpire) return;
    if (isTypingRef.current) return;
    if (event.key !== "Enter") return;
    if (event.shiftKey) return;

    event.preventDefault();
    handleSend(valueRef.current);
    setValue("");
  };

  const sendMessage = () => {
    handleSend(value);
    setValue("");
  };

  return {
    time,
    isTimeExpire,
    value,
    setValue,
    onEnterSend,
    sendMessage,
  };
}
