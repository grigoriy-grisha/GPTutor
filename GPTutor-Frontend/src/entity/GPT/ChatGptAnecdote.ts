import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { GptMessage } from "$/entity/GPT/GptMessage";
import { GPTRoles } from "$/entity/GPT/types";
import { StopWatch } from "$/entity/stopWatch";
import { datePlus30Days } from "$/utility/date";
import { generateImageGet } from "$/api/images";
import { sig } from "dignals";
import { translationService } from "$/services/TranslationService";

export class ChatGptAnecdote extends ChatGptTemplate {
  systemMessage = new GptMessage(
    "Отвечай, как обычно, только чуть-чуть прикалывайся, немного матерись, обращайся к пользователю на ты, прикидывайся придурком",
    GPTRoles.system
  );

  timerImage = new StopWatch();

  image$ = sig("");

  abortController = new AbortController();

  send = async () => {
    this.image$.set("");
    this.messages$.set([]);

    const content = "Сгенерируй смешной и безумный анекдот ебать блять";

    try {
      this.sendCompletions$.loading.set(true);
      const message = new GptMessage(content, GPTRoles.user);
      this.addMessage(message);

      await this.sendCompletions$.run();

      await this.generateImage();
    } finally {
      this.allowActions();
    }
  };

  async generateImage() {
    this.timerImage.run();

    this.abortController = new AbortController();

    const humorContent = await translationService.translate(
      `${this.getLastMessage().content$.get()}, Шутка, смешная карикатура, шарж`
    );

    console.log(humorContent);

    const result = await generateImageGet(
      {
        modelId: "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]",
        prompt: humorContent,
        createdAt: new Date(),
        guidanceScale: 7,
        seed: "-1",
        expireTimestamp: datePlus30Days(),
        samples: 1,
        originalPrompt: "",
        scheduler: "DPM++ 2M Karras",
        width: 512,
        height: 512,
        upscale: "no",
        numInferenceSteps: 30,
        loraModel: "",
        negativePrompt: "",
      },
      this.abortController!
    );

    if (result.error) {
      this.timerImage.stop();
      return;
    }

    this.image$.set(result[0]);
    this.timerImage.stop();
  }
}
