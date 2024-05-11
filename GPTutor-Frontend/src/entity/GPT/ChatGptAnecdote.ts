import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { GptMessage } from "$/entity/GPT/GptMessage";
import { GPTRoles } from "$/entity/GPT/types";
import { createHumor } from "$/api/humor";
import { HumorTypes } from "$/entity/humor";

export class ChatGptAnecdote extends ChatGptTemplate {
  systemMessage = new GptMessage(
    "Отвечай, как обычно, только чуть-чуть прикалывайся, немного матерись, обращайся к пользователю на ты, прикидывайся придурком",
    GPTRoles.system
  );

  send = async () => {
    this.messages$.set([]);

    const content = "Сгенерируй смешной и безумный анекдот ебать блять";

    try {
      this.sendCompletions$.loading.set(true);
      const message = new GptMessage(content, GPTRoles.user);
      this.addMessage(message);

      await this.sendCompletions$.run();

      const humorContent = this.getLastMessage().content$.get();
      await createHumor({ content: humorContent, type: HumorTypes.anecdote });
    } finally {
      this.allowActions();
    }
  };
}
