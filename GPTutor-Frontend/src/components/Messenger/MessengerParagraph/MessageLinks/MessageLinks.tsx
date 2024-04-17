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

function MessageLinks({ containerRef, html }: IProps) {
  return (
    <div className={classes.container}>
      {useDebounceValue<JSX.Element[]>(
        [],
        () => {
          const links = containerRef.current!.querySelectorAll("a");

          return [...links].map((link, index) => (
            <Tappable href={link.href} key={index} target="_blank">
              <Card className={classes.card} mode="shadow">
                <img
                  width={14}
                  height={14}
                  src={faviconFetch({ uri: link.href, fallbackText: "G" })}
                  alt=""
                />
                <span>{link.innerText}</span>
              </Card>
            </Tappable>
          ));
        },
        [html],
        300
      )}
    </div>
  );
}

export default MessageLinks;
