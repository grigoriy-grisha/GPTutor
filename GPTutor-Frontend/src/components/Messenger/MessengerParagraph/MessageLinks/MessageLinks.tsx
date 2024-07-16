import React, { useEffect } from "react";
import { useDebounceValue } from "$/hooks/useDebounceValue";
import { BlockCode } from "$/components/Messenger/MessengerParagraph/DebouncedCode/BlockCode";
import { Card, Link, Tappable } from "@vkontakte/vkui";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import faviconFetch from "favicon-fetch";

import classes from "./MessageLinks.module.css";

interface IProps {
  containerRef: React.RefObject<HTMLElement>;
  html: string;
}

function getSafeHost(link: string) {
  try {
    return new URL(link).host;
  } catch (e) {
    return null;
  }
}

function MessageLinks({ containerRef, html }: IProps) {
  const elements = useDebounceValue<React.ReactElement[]>(
    [],
    () => {
      const links = containerRef.current!.querySelectorAll("a");

      return [...links]
        .map((link, index) => {
          const host = getSafeHost(link.href);
          if (!host) return null;

          return (
            <Tappable href={link.href} key={index} target="_blank">
              <Card className={classes.card} mode="shadow">
                <img
                  width={14}
                  height={14}
                  src={faviconFetch({ uri: link.href, fallbackText: "G" })}
                  alt=""
                />
                <span>{host}</span>
              </Card>
            </Tappable>
          );
        })
        .filter(Boolean) as React.ReactElement[];
    },
    [html],
    300
  );

  if (elements.length === 0) return null;

  return <div className={classes.container}>{elements}</div>;
}

export default MessageLinks;
