import { useRef, useState } from "react";
import { useAdaptivityWithJSMediaQueries } from "@vkontakte/vkui";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";

type HookWriteParams = {
  chatGpt: ChatGptTemplate;
  handleSend: (value: string) => void;
};

export function useWrite({ chatGpt, handleSend }: HookWriteParams) {
  const { sizeX } = useAdaptivityWithJSMediaQueries();
  const [value, setValue] = useState("");
  const isTyping = chatGpt.sendCompletions$.loading.get();

  const valueRef = useRef("");
  const isTypingRef = useRef(isTyping);
  valueRef.current = value;
  isTypingRef.current = isTyping;

  const onEnterSend = (event: any) => {
    if (!valueRef.current.trim()) return;
    if (sizeX !== "regular") return;

    if (chatGpt.isBlockActions$.get()) return;
    if (!chatGpt.timer.isStopped$.get()) return;
    if (isTypingRef.current) return;
    if (event.key !== "Enter") return;
    if (event.shiftKey) return;

    event.preventDefault();
    handleSend(valueRef.current);
    setValue("");
  };

  const sendMessage = () => {
    if (chatGpt.isBlockActions$.get()) return;

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
