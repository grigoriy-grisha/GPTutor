import React, { memo, useMemo, useRef } from "react";

import { Paragraph } from "@vkontakte/vkui";

import Markdown from "$/services/Markdown";
import { GptMessage } from "$/entity/GPT";

import classes from "./MessengerParagraph.module.css";
import DebouncedCode from "./DebouncedCode";

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
      {<DebouncedCode containerRef={containerRef} html={html} />}
    </Paragraph>
  );
}

export default memo(MessengerParagraph);
