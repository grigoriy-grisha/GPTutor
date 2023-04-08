import { sendCompletions } from "../../api/completions";
import { Subject } from "../../utils";

const errorContent = `
\`\`\`
Чат ГПТ приболел. Попробуйте позже
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
  constructor(systemMessage) {
    this.systemMessage = systemMessage;

    this.isTyping$ = new Subject(false);
    this.messages$ = new Subject([]);

    this.abortController = new AbortController();
  }

  abortSend() {
    this.abortController.abort();
  }

  send = (content) => {
    this.messages$.next([
      ...this.messages$.getValue(),
      {
        content,
        role: "user",
        inLocal: false,
      },
    ]);
    this.isTyping$.next(true);

    sendCompletions(
      {
        model: "gpt-3.5-turbo",
        messages: this.getMessages(),
      },
      this.abortController
    )
      .then((data) => {
        this.messages$.next([
          ...this.messages$.getValue(),
          { ...data.choices[0].message, inLocal: false },
        ]);
      })
      .catch(() => {
        this.messages$.next([
          ...this.messages$.getValue(),
          {
            content: errorContent,
            role: "assistant",
            inLocal: true,
          },
        ]);
      })
      .finally(() => this.isTyping$.next(false));
  };

  getMessages() {
    if (!this.systemMessage) {
      return this.filterInMemoryMessages(this.messages$.getValue()).map(
        this.toApiMessage
      );
    }

    return this.filterInMemoryMessages([
      this.systemMessage,
      ...this.messages$.getValue(),
    ]).map(this.toApiMessage);
  }

  toApiMessage = ({ inLocal, ...message }) => message;

  filterInMemoryMessages(messages) {
    return messages.filter((message) => !message.inLocal);
  }
}
