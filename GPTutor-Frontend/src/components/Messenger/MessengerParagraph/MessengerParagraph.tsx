import React, { memo, useMemo, useRef } from "react";

import { Paragraph } from "@vkontakte/vkui";

import Markdown from "$/services/Markdown";
import { GptMessage } from "$/entity/GPT";

import classes from "./MessengerParagraph.module.css";
import DebouncedCode from "./DebouncedCode";
import ErrorBlock from "./ErrorBlock";

interface IProps {
  message: GptMessage;
}

const errorContent = `
\`\`\`javascript
Сеть ChatGPT перегружена. Попробуйте через минуту
   _______  GPT
  |.-----.|       Err 
  ||x . x||  GPT Error  
  ||_.-._||         GPT
  \`--)-(--\`  GPT Er
 __[=== o]___       Error
|:::::::::::|\\   ror GPT
\`-=========-\`() 
`;

function MessengerParagraph({ message }: IProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const markdown = useMemo(() => new Markdown(), []);
  const html = markdown.render(
    message.isError ? errorContent : message.content$.get()
  );

  if (message.failedModeration$.get()) {
    return (
      <div className={classes.paragraph}>
        <ErrorBlock />
      </div>
    );
  }

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
