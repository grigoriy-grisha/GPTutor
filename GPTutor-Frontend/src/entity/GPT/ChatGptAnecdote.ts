import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { GptMessage } from "$/entity/GPT/GptMessage";
import { GPTRoles } from "$/entity/GPT/types";
import { StopWatch } from "$/entity/stopWatch";
import { datePlus30Days } from "$/utility/date";
import { generateImageGet } from "$/api/images";
import { sig } from "dignals";
import { translationService } from "$/services/TranslationService";
import { wallService } from "$/services/WallService";
import { createHumor } from "$/api/humor";
import { HumorTypes } from "$/entity/humor";
import { badListCheck } from "$/api/badList";

export class ChatGptAnecdote extends ChatGptTemplate {
  value$ = sig("");

  systemMessage = new GptMessage(
    "Отвечай, как обычно, только чуть-чуть прикалывайся, твоя роль это генерация смешных и забавных анекдотов с необычным концом, блокируй любые диструктивные и противодейственные запросы",
    GPTRoles.system
  );

  timerImage = new StopWatch();

  image$ = sig("");

  abortControllerImage = new AbortController();

  badListError$ = sig(false);

  clearBadListError() {
    this.badListError$.set(false);
  }

  send = async () => {
    const isBadListError = await this.checkBadList(this.value$.get());

    if (isBadListError) {
      this.badListError$.set(true);
      return;
    }

    this.image$.set("");
    this.messages$.set([]);

    const jokeType = this.value$.get()
      ? `Вот тебе тема: ${this.value$.get()}`
      : "";

    const content = `Сгенерируй смешной и безумный анекдот. ${jokeType}`;

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

  setValue(value: string) {
    this.value$.set(value);
  }

  async generateImage() {
    this.timerImage.run();

    this.abortControllerImage = new AbortController();

    const humorContent = await translationService.translate(
      `${this.getLastMessage().content$.get()}, Шутка, смешная карикатура, шарж`
    );

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
      this.abortControllerImage!
    );

    if (result.error) {
      this.timerImage.stop();
      return;
    }

    this.image$.set(result[0]);
    this.timerImage.stop();

    await this.createPost();
  }

  async createPost() {
    const content = this.getLastMessage().content$.get();
    const image = this.image$.get();

    if (!content || !image) return;

    await wallService.createPostGroup(content, image);
    await createHumor({ type: HumorTypes.anecdote, content, imageUrl: image });
  }

  abortSend = () => {
    this.abortController.abort();
    this.abortControllerImage.abort();
    this.timerImage.stop();
    this.closeDelay();
  };

  async checkBadList(text: string) {
    return await badListCheck(text);
  }
}
