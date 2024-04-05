import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { GptMessage } from "$/entity/GPT/GptMessage";
import { GPTRoles } from "$/entity/GPT/types";

export class ChatGptTrainer extends ChatGptTemplate {
  send = async (content: string) => {
    if (!this.subscriptionGPT.$isAllowSendMessage.get()) return;

    try {
      this.sendCompletions$.loading.set(true);
      const message = new GptMessage(content, GPTRoles.user);
      this.addMessage(message);

      await this.sendCompletions$.run();
      this.timer.run();

      if (message === this.getLastMessage()) return;
      this.subscriptionGPT.$handleSendMessage();
    } catch {
      this.timer.run();
    } finally {
      this.allowActions();
    }
  };
}
