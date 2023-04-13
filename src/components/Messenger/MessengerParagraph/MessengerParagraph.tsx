import React, { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";

import { Paragraph } from "@vkontakte/vkui";

import classes from "./MessengerParagraph.module.css";
import CodeBlock from "../../CodeBlock/CodeBlock";
import { GptMessage } from "$entity/GPT/GptMessage";

interface IProps {
  message: GptMessage;
}

function isBlockCode(children: [string]) {
  let spacersCount = 0;
  for (const letter of children[0]) {
    if (letter === " ") spacersCount++;
    if (spacersCount === 8) return true;
  }

  return false;
}

const Code = ({ children, className }: any) => {
  return (
    <CodeBlock
      hasCopy
      className={className || isBlockCode(children) ? "text" : undefined}
    >
      {children}
    </CodeBlock>
  );
};

const P = (props: any) => <span className="paragraph" {...props} />;

function MessengerParagraph({ message }: IProps) {
  return (
    <Paragraph weight="3" className={classes.paragraph}>
      <ReactMarkdown components={useMemo(() => ({ p: P, code: Code }), [])}>
        {message.content$.get()}
      </ReactMarkdown>
    </Paragraph>
  );
}

export default memo(MessengerParagraph);
