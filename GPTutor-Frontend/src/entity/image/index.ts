import { memo, sig } from "dignals";

import { defaultModel, defaultSampler, styles } from "./styles";
import ReactivePromise from "$/services/ReactivePromise";
import { generateImage, saveImage } from "$/api/images";
import {
  emptyImageGenerated,
  GeneratedImage,
  ImageAspectRatio,
  ImageExample,
} from "$/entity/image/types";
import { ChatGptImages } from "$/entity/GPT/ChatGptImages";
import { translationService } from "$/services/TranslationService";
import { datePlus30Days } from "$/utility/date";
import { ImageGenerationPrompt } from "$/entity/image/ImageGenerationPrompt";

import { ChipOption } from "@vkontakte/vkui/dist/components/Chip/Chip";
import { StopWatch } from "$/entity/stopWatch";
import { subscriptionsController } from "$/entity/subscriptions";

class ImageGeneration {
  requestParameters = false;
  advancedSettingOpen = false;

  abortController: AbortController | null = null;

  timer = new StopWatch();
  imageGenerationPrompt = new ImageGenerationPrompt();
  chatGpt = new ChatGptImages();

  prompt$ = sig("");
  model$ = sig(defaultModel);
  sampler$ = sig(defaultSampler);
  step$ = sig(25);
  CFGScale$ = sig(7);
  negativePrompts$ = sig<ChipOption[]>([]);
  seed$ = sig("");
  result$ = sig<GeneratedImage[]>([]);
  error$ = sig<string>("");
  aspectRatio$ = sig<ImageAspectRatio>(ImageAspectRatio.square);
  samples$ = sig(4);
  height$ = sig(512);
  width$ = sig(512);
  widthView$ = sig(512);
  heightView$ = sig(512);
  imageSize = sig<ImageAspectRatio>(ImageAspectRatio.square);
  upscale$ = sig<"no" | "yes">("no");
  loraModel$ = sig("");

  loading$ = sig(false);

  resultIsEmpty$ = memo(
    () => !!this.result$.get().find((item) => !item.modelId)
  );

  resultHasEmpty$ = memo(() => this.result$.get().some((item) => item.modelId));

  notEmptyResults$ = memo(() =>
    this.result$.get().filter((item) => item.modelId)
  );

  constructor() {
    this.setResults();
  }

  init() {
    if (subscriptionsController.isDisable()) {
      this.setSamples("1");
    }
  }

  toggleAdvancedSettingOpen = () => {
    this.advancedSettingOpen = !this.advancedSettingOpen;
  };

  toggleRequestParameters = () => {
    this.requestParameters = !this.requestParameters;
  };

  setSamples(value: string) {
    const numberValue = Number(value);
    this.samples$.set(numberValue > 4 ? 4 : numberValue);
    this.setResults();
  }

  setUpscale(upscale: "no" | "yes") {
    this.upscale$.set(upscale);
  }

  setResults() {
    const notEmptyResults = this.notEmptyResults$.get().length;
    const samples = this.samples$.get();

    if (notEmptyResults > samples) {
      this.result$.set(this.notEmptyResults$.get());
      return;
    }

    const results = new Array(
      this.samples$.get() - this.notEmptyResults$.get().length
    )
      .fill(null)
      .map((_, index) => ({
        ...emptyImageGenerated,
        id: String(index),
      })) as GeneratedImage[];

    this.result$.set([...this.notEmptyResults$.get(), ...results]);
  }

  setEmptyResults() {
    const emptyResults = new Array(this.samples$.get())
      .fill(null)
      .map((_, index) => ({
        ...emptyImageGenerated,
        id: String(index),
      })) as GeneratedImage[];

    this.result$.set(emptyResults);
  }

  setNegativePrompts(negativePrompts: ChipOption[]) {
    this.negativePrompts$.set(negativePrompts);
  }

  setCFGScale = (CFGScale: number) => {
    this.CFGScale$.set(CFGScale);
  };

  setModel(model: string) {
    this.model$.set(model);
    this.loraModel$.set("");
  }

  setLoraModel(value: string) {
    this.loraModel$.set(value);
  }

  setSeed(seed: string) {
    this.seed$.set(seed);
  }

  setStep = (step: number) => {
    this.step$.set(step);
  };

  setWidth = (width: number) => {
    this.width$.set(width);
    this.aspectRatio$.set(ImageAspectRatio.custom);

    if (!this.loading$.get() && !this.resultHasEmpty$.get()) {
      this.widthView$.set(width);
    }
  };
  setHeight = (height: number) => {
    this.height$.set(height);
    this.aspectRatio$.set(ImageAspectRatio.custom);

    if (!this.loading$.get() && !this.resultHasEmpty$.get()) {
      this.heightView$.set(height);
    }
  };

  setSampler(sampler: string) {
    this.sampler$.set(sampler);
  }

  setAspectRatio(aspectRatio: ImageAspectRatio) {
    if (aspectRatio === ImageAspectRatio.square) {
      this.setWidth(512);
      this.setHeight(512);
    }

    if (aspectRatio === ImageAspectRatio.portrait) {
      this.setWidth(512);
      this.setHeight(768);
    }

    if (aspectRatio === ImageAspectRatio.landscape) {
      this.setWidth(768);
      this.setHeight(512);
    }

    this.aspectRatio$.set(aspectRatio);
  }

  setPrompt(prompt: string) {
    this.prompt$.set(prompt);
  }

  applyExample(example: ImageExample) {
    this.prompt$.set(example.originalPrompt!);
    this.model$.set(example.modelId);
    this.seed$.set(example.seed ? String(example.seed) : "");
    this.step$.set(example.numInferenceSteps);
    this.CFGScale$.set(example.guidanceScale);
    this.sampler$.set(example.scheduler);
    this.aspectRatio$.set(ImageAspectRatio.square);

    const negativePrompts = example.negativePrompt.trim().split(",");

    if (negativePrompts.length === 0) this.negativePrompts$.set([]);

    this.negativePrompts$.set(
      negativePrompts.map((value) => ({ value, label: value }))
    );
  }

  getPromptWithStyles() {
    const styles = this.imageGenerationPrompt.selectedStyles$.get();

    if (styles.length === 0) return this.prompt$.get();

    return `${this.prompt$.get()},${styles.join(", ")}`;
  }

  getTextWithNegativePrompts(prompt: string) {
    const negativePrompts = this.negativePrompts$.get();

    if (negativePrompts.length === 0) return prompt;

    return `${prompt} || ${negativePrompts
      .map(({ label }) => label)
      .join(",")}`;
  }

  splitPrompt(text: string) {
    const [prompt, negativePrompts] = text.split("||");

    return [prompt, negativePrompts || ""];
  }

  getSeed() {
    const seed = this.seed$.get();

    if (seed === "-1" || !seed) return "-1";

    if (isNaN(Number(seed)))
      return String(
        seed
          .split("")
          .map((_, index) => seed.charCodeAt(index))
          .reduce((acc, item) => acc + item)
      );

    return seed;
  }

  generateImage = async () => {
    try {
      this.error$.set("");
      if (this.prompt$.get().trim() === "") {
        this.error$.set("Ввод промпта обязателен!");
        return;
      }

      this.loading$.set(true);

      this.timer.run();

      const translatedPrompt = await translationService.translate(
        this.getTextWithNegativePrompts(this.getPromptWithStyles())
      );

      const [prompt, negativePrompt] = this.splitPrompt(translatedPrompt);

      this.abortController = new AbortController();

      const result = await generateImage(
        {
          modelId: this.model$.get(),
          prompt: prompt.trim(),
          createdAt: new Date(),
          guidanceScale: this.CFGScale$.get(),
          seed: this.getSeed(),
          expireTimestamp: datePlus30Days(),
          samples: this.samples$.get(),
          originalPrompt: this.getPromptWithStyles(),
          scheduler: this.sampler$.get(),
          width: this.width$.get(),
          height: this.height$.get(),
          upscale: this.upscale$.get(),
          numInferenceSteps: this.step$.get(),
          loraModel: this.loraModel$.get(),
          negativePrompt: negativePrompt.trim(),
        },
        this.abortController!
      );

      if (result.error) {
        console.log(result);
        this.setResults();
        this.timer.stop();
        this.loading$.set(false);

        if (result.status === 400) {
          this.error$.set(result.error);
          return;
        }

        if (result.status === 429) {
          this.error$.set(result.error);
          return;
        }

        this.error$.set("Что-то пошло не так, попробуйте позже");
        return;
      }

      this.timer.stop();
      this.loading$.set(false);
      this.result$.set(result);
    } catch (e: any) {
      console.log(e);
      if (e.name === "AbortError") {
        this.setResults();
        this.timer.stop();
        this.loading$.set(false);
        return;
      }

      console.dir(e);

      this.loading$.set(false);
      this.error$.set("Что-то пошло не так, попробуйте позже");
    }
  };

  abortGenerate = () => {
    this.abortController?.abort();
  };

  generate = () => {
    this.setEmptyResults();
    this.generateImage$.run();
  };

  saveImage = async (imageId: string) => {
    const result = await saveImage(imageId);
    this.result$.set(
      this.result$
        .get()
        .map((image) => (image.id === result.id ? result : image))
    );
    return result;
  };

  save = (imageId: string) => this.saveImage$.run(imageId);

  generateImage$ = ReactivePromise.create(this.generateImage);
  saveImage$ = ReactivePromise.create(this.saveImage);
}

export const imageGeneration = new ImageGeneration();
