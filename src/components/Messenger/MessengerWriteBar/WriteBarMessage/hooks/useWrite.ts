import { useRef, useState } from "react";

type HookWriteParams = {
  isTyping: boolean;
  handleSend: (value: string) => void;
};

export function useWrite({ isTyping, handleSend }: HookWriteParams) {
  const [value, setValue] = useState("");

  const valueRef = useRef("");
  const isTypingRef = useRef(isTyping);
  valueRef.current = value;
  isTypingRef.current = isTyping;

  const onEnterSend = (event: any) => {
    if (isTypingRef.current) return;
    if (event.key !== "Enter") return;

    event.preventDefault();
    handleSend(valueRef.current);
    setValue("");
  };

  return {
    value,
    setValue,
    onEnterSend,
  };
}
