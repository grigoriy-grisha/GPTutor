import React, { memo, useMemo } from "react";

import { Paragraph } from "@vkontakte/vkui";

import classes from "./MessengerParagraph.module.css";
import { GptMessage } from "$entity/GPT/GptMessage";
import Markdown from "../../../services/Markdown";

interface IProps {
  message: GptMessage;
}

function MessengerParagraph({ message }: IProps) {
  const markdown = useMemo(() => new Markdown(), []);

  const html = markdown.render(message.content$.get());

  return (
    <Paragraph weight="3" className={classes.paragraph}>
      <div className={classes.codeContainer}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Paragraph>
  );
}

export default memo(MessengerParagraph);
