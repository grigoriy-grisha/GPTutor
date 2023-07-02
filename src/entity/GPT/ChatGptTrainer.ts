import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { GptMessage } from "$/entity/GPT/GptMessage";
import { GPTRoles } from "$/entity/GPT/types";

export class ChatGptTrainer extends ChatGptTemplate {
  send = async (content: string) => {
    try {
      this.sendCompletions$.loading.set(true);
      this.messages$.set([]);
      const message = new GptMessage(content, GPTRoles.user);
      this.addMessage(message);

      await this.sendCompletions$.run();
      this.timer.run();

      if (message === this.getLastMessage()) return;
    } catch {
      this.timer.run();
    } finally {
      this.allowActions();
    }
  };

  init(systemMessage: string) {
    this.systemMessage = new GptMessage(systemMessage, GPTRoles.system);
  }
}
