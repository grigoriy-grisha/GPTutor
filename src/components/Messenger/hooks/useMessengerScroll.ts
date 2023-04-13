import { useCallback, useEffect, useRef } from "react";

function getScrollBottom(elem: HTMLDivElement) {
  return elem.scrollHeight - elem.scrollTop - elem.clientHeight;
}

const maxAutoScrollValue = 150;
const autoScrollTimeValue = 500;

export function useMessengerScroll(isTyping: boolean) {
  const scrollRef = useRef<HTMLDivElement>();
  const intervalId = useRef<NodeJS.Timeout>();
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
  }, []);

  useEffect(() => {
    const onScrollDetect = () => {
      if (scrollTimeout.current) return;

      scrollTimeout.current = setTimeout(() => {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = null;
      }, autoScrollTimeValue);
    };

    scrollRef.current?.addEventListener("scroll", onScrollDetect);

    return () => {
      scrollRef.current?.removeEventListener("scroll", onScrollDetect);
    };
  }, []);

  useEffect(() => {
    if (!isTyping) return clearTimeout(intervalId.current);

    intervalId.current = setInterval(() => {
      if (!scrollRef.current || scrollTimeout.current) return;

      if (getScrollBottom(scrollRef.current) > maxAutoScrollValue) return;

      scrollToBottom();
    }, autoScrollTimeValue);

    return () => clearTimeout(intervalId.current);
  }, [isTyping]);

  return { scrollRef, scrollToBottom };
}
