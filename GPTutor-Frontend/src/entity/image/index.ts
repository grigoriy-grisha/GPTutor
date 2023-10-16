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
import { getRandomPromptImage } from "$/entity/image/imageCreations";
import { translationService } from "$/services/TranslationService";
import { datePlus30Days } from "$/utility/date";
import { ImageGenerationPrompt } from "$/entity/image/ImageGenerationPrompt";
import { Timer } from "$/entity/GPT/Timer";

class ImageGeneration {
  timer = new Timer(0, 1000000, "increment", 10, 5);
  imageGenerationPrompt = new ImageGenerationPrompt();
  chatGpt = new ChatGptImages();

  prompt$ = sig("");
  model$ = sig(defaultModel);
  sampler$ = sig(defaultSampler);
  step$ = sig(25);
  CFGScale$ = sig(8);
  negativePrompts$ = sig("");
  seed$ = sig(-1);
  result$ = sig<GeneratedImage[]>([]);
  error$ = sig<string>("");
  aspectRatio$ = sig<ImageAspectRatio>(ImageAspectRatio.square);
  samples$ = sig(1);
  height$ = sig(512);
  width$ = sig(512);
  widthView$ = sig(512);
  heightView$ = sig(512);
  imageSize = sig<ImageAspectRatio>(ImageAspectRatio.square);
  upscale$ = sig<"no" | "yes">("no");

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

  setSamples(value: string) {
    this.samples$.set(Number(value));
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

  runChatGpt() {
    this.prompt$.set(getRandomPromptImage());
  }

  setNegativePrompts(negativePrompts: string) {
    this.negativePrompts$.set(negativePrompts);
  }

  setCFGScale = (CFGScale: number) => {
    this.CFGScale$.set(CFGScale);
  };

  setModel(model: string) {
    this.model$.set(model);
  }

  setSeed(seed: number) {
    this.seed$.set(seed);
  }

  setStep = (step: number) => {
    this.step$.set(step);
  };

  setWidth = (width: number) => {
    this.width$.set(width);
    this.aspectRatio$.set(ImageAspectRatio.custom);

    if (!this.loading$.get() && !this.resultHasEmpty$.get()) {
      imageGeneration.widthView$.set(width);
    }
  };
  setHeight = (height: number) => {
    this.height$.set(height);
    this.aspectRatio$.set(ImageAspectRatio.custom);

    if (!this.loading$.get() && !this.resultHasEmpty$.get()) {
      imageGeneration.heightView$.set(height);
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
    this.prompt$.set(example.prompt);
    this.model$.set(example.modelId);
    this.negativePrompts$.set(example.negativePrompt);
    this.seed$.set(example.seed ? example.seed : -1);
    this.step$.set(example.numInferenceSteps);
    this.CFGScale$.set(example.guidanceScale);
    this.sampler$.set(example.scheduler);
    this.aspectRatio$.set(ImageAspectRatio.square);
  }

  generateImage = async () => {
    this.error$.set("");
    if (this.prompt$.get().trim() === "") {
      this.error$.set("Ввод промпта обязателен!");
      return;
    }

    this.timer.run();

    const translatedPrompt = await translationService.translate(
      this.prompt$.get()
    );

    const seed = this.seed$.get();

    this.loading$.set(true);
    const result = await generateImage({
      modelId: this.model$.get(),
      prompt: translatedPrompt,
      createdAt: new Date(),
      negativePrompt: this.negativePrompts$.get(),
      guidanceScale: this.CFGScale$.get(),
      seed: isNaN(parseInt(String(seed))) ? "-1" : String(seed),
      expireTimestamp: datePlus30Days(),
      samples: this.samples$.get(),
      scheduler: this.sampler$.get(),
      width: this.width$.get(),
      height: this.height$.get(),
      upscale: this.upscale$.get(),
      numInferenceSteps: this.step$.get(),
    });

    if (result.error) {
      this.setResults();
      this.timer.stop();

      if (result.status === 400) {
        this.error$.set(result.error);
        return;
      }

      this.error$.set("Что-то пошло не так, попробуйте позже");
      return;
    }

    this.timer.stop();
    this.loading$.set(false);
    this.result$.set(result);
  };

  selectedModel$ = memo(() =>
    styles.find((model) => this.model$.get() === model.value)
  );

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
