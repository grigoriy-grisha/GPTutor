import { sendCompletions } from "../../api/completions";
import { Subject } from "../../utils";
import { GPTMessage, GPTRoles } from "./types";

const errorContent = `
\`\`\`
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
  public isTyping$: Subject<boolean>;
  public messages$: Subject<GPTMessage[]>;
  abortController = new AbortController();

  constructor(public systemMessage?: GPTMessage) {
    this.isTyping$ = new Subject(false);
    this.messages$ = new Subject([]);
  }

  abortSend() {
    this.abortController.abort();
  }

  send = (content: string) => {
    this.messages$.next([
      ...this.messages$.getValue(),
      { content, role: GPTRoles.user, inLocal: false },
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
          { content: errorContent, role: GPTRoles.assistant, inLocal: true },
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toApiMessage = ({ inLocal, ...message }: GPTMessage) => message;

  filterInMemoryMessages(messages: GPTMessage[]) {
    return messages.filter((message) => !message.inLocal);
  }
}
