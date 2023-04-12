import { sig } from "dignals";

import { sendCompletions } from "../../api/completions";
import ReactivePromise from "../../services/ReactivePromise";

import { GPTMessage, GPTRoles } from "./types";

const errorContent = `
\`\`\`javascript
Chat GPT приболел. Попробуйте позже
   _______  GPT
  |.-----.|       Err 
  ||x . x||  GPT Error  
  ||_.-._||         GPT
  \`--)-(--\`  GPT Er
 __[=== o]___       Error
|:::::::::::|\\   ror GPT
\`-=========-\`() 
`;

export class ChatGpt {
  public messages$ = sig<GPTMessage[]>([]);

  sendCompletions$ = ReactivePromise.create(() => {
    return sendCompletions(
      { model: "gpt-3.5-turbo", messages: this.getMessages() },
      this.abortController
    );
  });

  abortController = new AbortController();

  constructor(public systemMessage?: GPTMessage) {}

  abortSend() {
    this.abortController.abort();
  }

  send = (content: string) => {
    this.messages$.set([
      ...this.messages$.get(),
      { content, role: GPTRoles.user, inLocal: false },
    ]);

    this.sendCompletions$.run();

    sendCompletions(
      {
        model: "gpt-3.5-turbo",
        messages: this.getMessages(),
      },
      this.abortController
    )
      .then((data) => {
        this.messages$.set([
          ...this.messages$.get(),
          { ...data.choices[0].message, inLocal: false },
        ]);
      })
      .catch(() => {
        this.messages$.set([
          ...this.messages$.get(),
          { content: errorContent, role: GPTRoles.assistant, inLocal: true },
        ]);
      });
  };

  getMessages() {
    if (!this.systemMessage) {
      return this.filterInMemoryMessages(this.messages$.get()).map(
        this.toApiMessage
      );
    }

    return this.filterInMemoryMessages([
      this.systemMessage,
      ...this.messages$.get(),
    ]).map(this.toApiMessage);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toApiMessage = ({ inLocal, ...message }: GPTMessage) => message;

  filterInMemoryMessages(messages: GPTMessage[]) {
    return messages.filter((message) => !message.inLocal);
  }
}
