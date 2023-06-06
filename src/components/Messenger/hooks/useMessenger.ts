import { useMessengerScroll } from "./useMessengerScroll";
import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";

type HookMessengerParams = {
  chatGpt: ChatGptTemplate;
};

export function useMessenger({ chatGpt }: HookMessengerParams) {
  const isTyping = chatGpt.sendCompletions$.loading.get();

  const { scrollRef, scrollToBottom, showScrollDown } =
    useMessengerScroll(isTyping);

  const handlerSend = (message: string) => {
    if (!message) return;
    chatGpt.send(message);
    setTimeout(scrollToBottom, 50);
  };

  return {
    isTyping,
    scrollRef,
    showScrollDown,
    handlerSend,
    scrollToBottom,
  };
}
