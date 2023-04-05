import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Paragraph, useConfigProvider } from "@vkontakte/vkui";

import classes from "./MessengerParagraph.module.css";

function isOneOperand(children) {
  return children[0].split(" ").length === 1;
}

function MessengerParagraph({ message }) {
  const { appearance } = useConfigProvider();

  return (
    <Paragraph weight="3" className={classes.paragraph}>
      <ReactMarkdown
        components={{
          p: (props) => <span className="paragraph" {...props} />,
          code: ({ node, inline, className, children, ...props }) => (
            <SyntaxHighlighter
              className={isOneOperand(children) ? "isOneOperand" : undefined}
              style={appearance === "dark" ? oneDark : oneLight}
              children={String(children).replace(/\n$/, "")}
              language="js"
              {...props}
            />
          ),
        }}
      >
        {message.message}
      </ReactMarkdown>
    </Paragraph>
  );
}

export default memo(MessengerParagraph);
