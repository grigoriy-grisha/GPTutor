import React, { memo } from "react";
import ReactMarkdown from "react-markdown";

import { Paragraph } from "@vkontakte/vkui";

import classes from "./MessengerParagraph.module.css";
import CodeBlock from "../../CodeBlock/CodeBlock";
import { GPTMessage } from "../../../entity/GPT/types";

interface IProps {
  message: GPTMessage;
}

function MessengerParagraph({ message }: IProps) {
  return (
    <Paragraph weight="3" className={classes.paragraph}>
      <ReactMarkdown
        components={{
          p: (props) => <span className="paragraph" {...props} />,
          code: ({ children, className }) => {
            return (
              <CodeBlock hasCopy className={className}>
                {children}
              </CodeBlock>
            );
          },
        }}
      >
        {message.content}
      </ReactMarkdown>
    </Paragraph>
  );
}

export default memo(MessengerParagraph);
