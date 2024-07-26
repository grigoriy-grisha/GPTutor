import { ChatGptTemplate } from "$/entity/GPT/ChatGptTemplate";
import { GptMessage } from "$/entity/GPT/GptMessage";
import { GPTRoles } from "$/entity/GPT/types";
import { StopWatch } from "$/entity/stopWatch";
import { datePlus30Days } from "$/utility/date";
import { generateImageGet } from "$/api/images";
import { sig } from "dignals";
import { badListCheck } from "$/api/badList";
import { Timer } from "$/entity/GPT/Timer";
import { gptModels } from "./GptModels";

export class ChatGptAnecdote extends ChatGptTemplate {
  value$ = sig("");

  systemMessage = new GptMessage(
    "Ты профессиональный разказчик анекдотов, на каждый запрос ты должен генерировать какой-нибудь очень смешной и безумный и иногда аморальный анекдот. Ты должен писать только анекдот, и ни прикаких обстоятельстах не пиши ничего, кроме анекдота, только его. Ты должен прикалываться и рассказывать очень смешные и анекдоты просто с неожиданным концом",
    GPTRoles.system
  );

  timerImage = new StopWatch();
  timer = new Timer(30, 0, "decrement");

  image$ = sig("");

  abortControllerImage = new AbortController();

  badListError$ = sig(false);

  clearBadListError() {
    this.badListError$.set(false);
  }

  send = async () => {
    this.timerImage.listenOnChange((value) => {
      console.log(value);
      if (value >= 70000) {
        this.abortSend();
      }
    });

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

    const content =
      "Сгенерируй смешной и безумный анекдот. Не пиши никакх вводных слов или пояснений. Пиши только придуманный тобой анекдот";

    try {
      this.sendCompletions$.loading.set(true);
      const message = new GptMessage(content, GPTRoles.user);
      this.addMessage(message);
      gptModels.selectModel("meta-llama/Meta-Llama-3.1-405B");

      await this.sendCompletions$.run();

      await this.generateImage();
    } finally {
      this.timer.run();
      this.allowActions();
    }
  };

  setValue(value: string) {
    this.value$.set(value);
  }

  async generateImage() {
    this.timerImage.run();

    this.abortControllerImage = new AbortController();

    if (this.getLastMessage().role === GPTRoles.user) {
      this.abortSend();
      return;
    }

    const result = await generateImageGet(
      {
        modelId: "dalle3",
        prompt: `Сгенерируй картинку основываясь на этом анекдоте ${this.getLastMessage().content$.get()} в стиле шарж и юмор`,
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

    // await wallService.createPostGroup(content, image);
    // await createHumor({ type: HumorTypes.anecdote, content, imageUrl: image });
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
