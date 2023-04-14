import { batch, memo, sig } from "dignals";

import { sendChatCompletions } from "../../api/completions";

import { GPTRoles } from "./types";
import { GptMessage } from "./GptMessage";
import ReactivePromise from "../../services/ReactivePromise";

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

//todo рефакторинг, разнести этот класс на несколько сущностей
export class ChatGpt {
  public messages$ = sig<GptMessage[]>([]);

  sendCompletions$ = ReactivePromise.create(() => this.sendCompletion());

  selectedMessages$ = memo(() =>
    this.messages$.get().filter((message) => message.isSelected$.get())
  );

  hasSelectedMessages$ = memo(() => this.selectedMessages$.get().length !== 0);

  abortController = new AbortController();

  constructor(public systemMessage?: GptMessage) {}

  abortSend() {
    this.abortController.abort();
  }

  send = (content: string) => {
    this.addMessage(new GptMessage(content, GPTRoles.user));
    this.sendCompletions$.run();
  };

  private async sendCompletion() {
    const message = new GptMessage("", GPTRoles.assistant);

    this.abortController = new AbortController();

    return await sendChatCompletions(
      { model: "gpt-3.5-turbo", messages: this.getMessages() },
      (value, isFirst) => {
        if (isFirst) {
          message.onSetMessageContent(value);
          this.addMessage(message);
          return;
        }
        message.onSetMessageContent(value);
      },
      () => {
        this.addMessage(new GptMessage(errorContent, GPTRoles.assistant, true));
        this.sendCompletions$.reset();
      },
      this.abortController
    );
  }

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

  clearSelectedMessages = () => {
    batch(() => {
      this.selectedMessages$
        .get()
        .forEach((message) => message.toggleSelected());
    });
  };

  addMessage(message: GptMessage) {
    this.messages$.set([...this.messages$.get(), message]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toApiMessage = (message: GptMessage) => ({
    content: message.content$.get(),
    role: message.role,
  });

  filterInMemoryMessages(messages: GptMessage[]) {
    return messages.filter((message) => !message.inLocal);
  }
}
