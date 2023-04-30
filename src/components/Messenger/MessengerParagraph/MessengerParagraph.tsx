import React, { memo, useMemo, useRef } from "react";

import { Paragraph } from "@vkontakte/vkui";

import Markdown from "../../../services/Markdown";
import { BlockCode } from "./BlockCode";
import { useDebounceValue } from "../../../hooks/useDebounceValue";

import { GptMessage } from "$/entity/GPT/GptMessage";

import classes from "./MessengerParagraph.module.css";

interface IProps {
  message: GptMessage;
}

function MessengerParagraph({ message }: IProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const markdown = useMemo(() => new Markdown(), []);
  const html = markdown.render(message.content$.get());

  return (
    <Paragraph weight="3" className={classes.paragraph}>
      <div ref={containerRef} className={classes.codeContainer}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      {useDebounceValue<JSX.Element[]>(
        [],
        () => {
          const pres =
            containerRef.current?.querySelectorAll("[data-pre-container]") ||
            [];
          return [...pres].map((pre, index) => (
            <BlockCode elem={pre as HTMLElement} key={index} />
          ));
        },
        [html],
        200
      )}
    </Paragraph>
  );
}

export default memo(MessengerParagraph);
