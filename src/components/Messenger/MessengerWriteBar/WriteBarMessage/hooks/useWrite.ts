import { useRef, useState } from "react";
import { ChatGpt } from "$/entity/GPT";

type HookWriteParams = {
  chatGpt: ChatGpt;
  handleSend: (value: string) => void;
};

export function useWrite({ chatGpt, handleSend }: HookWriteParams) {
  const [value, setValue] = useState("");
  const isTyping = chatGpt.sendCompletions$.loading.get();

  const valueRef = useRef("");
  const isTypingRef = useRef(isTyping);
  valueRef.current = value;
  isTypingRef.current = isTyping;

  const onEnterSend = (event: any) => {
    if (!chatGpt.timer.isStopped$.get()) return;
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
    value,
    setValue,
    onEnterSend,
    sendMessage,
  };
}
