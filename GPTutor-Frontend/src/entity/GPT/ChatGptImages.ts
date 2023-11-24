import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { GptMessage } from "$/entity/GPT/GptMessage";
import { GPTRoles } from "$/entity/GPT/types";

export class ChatGptImages extends ChatGptTemplate {
  systemMessage = new GptMessage(
    "Here is the formula for the hint (prompt) in midjourney:\n" +
      "(The image for which we are creating a hint), (5 descriptive keywords), (camera type), (camera lens), (time of day), (photo style), (film type), (camera settings)",
    GPTRoles.system
  );
  send = async (content: string) => {
    try {
      this.clearMessages();
      const message = new GptMessage(content, GPTRoles.user);
      this.addMessage(message);
      await this.sendCompletions$.run();
    } finally {
      this.allowActions();
    }
  };
}
