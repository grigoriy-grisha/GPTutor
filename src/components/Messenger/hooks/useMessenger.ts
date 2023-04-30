import { useEffect } from "react";

import { ChatGpt } from "$/entity/GPT";
import { LessonItem } from "$/entity/lessons";

import { useMessengerScroll } from "./useMessengerScroll";

type HookMessengerParams = {
  lesson: LessonItem | null;
  chatGpt: ChatGpt;
};

export function useMessenger({ chatGpt, lesson }: HookMessengerParams) {
  const isTyping = chatGpt.sendCompletions$.loading.get();

  const { scrollRef, scrollToBottom } = useMessengerScroll(isTyping);

  const onStartChat = () => {
    const initialRequest = lesson?.initialRequest;
    if (initialRequest) initialRequest.select();

    chatGpt.send(initialRequest?.text || "Привет, что ты можешь?");
  };

  const handlerSend = (message: string) => {
    if (!message) return;
    chatGpt.send(message);
    setTimeout(scrollToBottom, 50);
  };

  useEffect(() => () => chatGpt.abortSend(), [chatGpt]);

  return {
    isTyping,
    scrollRef,
    onStartChat,
    handlerSend,
  };
}
