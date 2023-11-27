import React from "react";
import throttle from "lodash.throttle";

import { useSyncToRef } from "./useSyncToRef";

type UseInfiniteScrollDirection = "down" | "up";

interface UseInfinityScrollConfig {
  loading: boolean;
  hasNextPage: boolean;
  threshold?: number;
  startObservingDelay?: number;
  scrollCheckInterval?: number;
  direction?: UseInfiniteScrollDirection;
  onLoadMore: () => void;
}

type ScrollableElement = HTMLElement | Window | null | undefined;

function isWindow(element: HTMLElement | Window | Document): element is Window {
  return element === window || element === document;
}

const scrollRemainderDetectors = {
  down: function (element: HTMLElement | Window) {
    if (isWindow(element))
      return (
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight
      );
    return element.scrollHeight - element.scrollTop - element.offsetHeight;
  },
  up: function (element: HTMLElement | Window) {
    if (isWindow(element)) return element.scrollY;
    return element.scrollTop;
  },
};

export function useInfinityScroll({
  scrollCheckInterval = 500,
  threshold = 500,
  loading,
  startObservingDelay = 0,
  direction = "down",
  hasNextPage,
  onLoadMore,
}: UseInfinityScrollConfig) {
  const [scrollableElement, setScrollableElement] =
    React.useState<ScrollableElement>(null);
  const loadingRef = useSyncToRef(loading);
  const hasNextPageRef = useSyncToRef(hasNextPage);
  const onLoadMoreRef = useSyncToRef(onLoadMore);

  useScrollListener({
    scrollableElement,
    threshold,
    startObservingDelay,
    scrollCheckInterval,
    direction,
    hasNextPage: hasNextPageRef,
    loading: loadingRef,
    onLoadMore: onLoadMoreRef,
  });

  return setScrollableElement;
}

function useScrollListener({
  scrollableElement,
  hasNextPage,
  loading,
  threshold,
  direction,
  onLoadMore,
  scrollCheckInterval,
  startObservingDelay,
}: {
  scrollableElement: ScrollableElement | null;
  threshold: number;
  scrollCheckInterval: number;
  startObservingDelay: number;
  direction: UseInfiniteScrollDirection;
  hasNextPage: React.MutableRefObject<boolean>;
  loading: React.MutableRefObject<boolean>;
  onLoadMore: React.MutableRefObject<() => void>;
}) {
  React.useEffect(() => {
    if (!scrollableElement) return () => null;

    const listener = throttle((event: any) => {
      if (!hasNextPage.current || loading.current) return;
      const scrollToEnd = scrollRemainderDetectors[direction](event.target);

      if (scrollToEnd < 0) return;
      if (scrollToEnd > threshold) return;
      onLoadMore.current();
    }, scrollCheckInterval);

    const startObservingTimeout = setTimeout(() => {
      document.addEventListener("scroll", listener, true);
    }, startObservingDelay);

    return () => {
      clearTimeout(startObservingTimeout);
      document.removeEventListener("scroll", listener, true);
    };
  }, [
    direction,
    startObservingDelay,
    hasNextPage,
    loading,
    onLoadMore,
    scrollCheckInterval,
    scrollableElement,
    threshold,
  ]);
}
