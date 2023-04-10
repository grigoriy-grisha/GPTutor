import React, { memo } from "react";
import ReactMarkdown from "react-markdown";

import { Paragraph } from "@vkontakte/vkui";

import classes from "./MessengerParagraph.module.css";
import CodeBlock from "../../CodeBlock/CodeBlock";

function isOneOperand(children) {
  return children[0].split(" ").length === 1;
}

function MessengerParagraph({ message }) {
  return (
    <Paragraph weight="3" className={classes.paragraph}>
      <ReactMarkdown
        components={{
          p: (props) => <span className="paragraph" {...props} />,
          code: ({ children, className }) => {
            return (
              <CodeBlock hasCopy hasFullScreen className={className}>
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
