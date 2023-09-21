import { memo, sig } from "dignals";

import { defaultModel, defaultSampler, styles } from "./styles";
import ReactivePromise from "$/services/ReactivePromise";
import { generateImage, getImages, saveImage } from "$/api/images";
import {
  GeneratedImage,
  ImageAspectRatio,
  ImageExample,
} from "$/entity/image/types";
import { ChatGptImages } from "$/entity/GPT/ChatGptImages";
import { getRandomPromptImage } from "$/entity/image/imageCreations";
import { translationService } from "$/services/TranslationService";
import { datePlus30Days } from "$/utility/date";
import { Timer } from "$/entity/GPT/Timer";

class ImageGeneration {
  timer = new Timer(30, 0, "decrement");

  chatGpt = new ChatGptImages();

  prompt$ = sig("");
  model$ = sig(defaultModel);
  sampler$ = sig(defaultSampler);
  step$ = sig(25);
  CFGScale$ = sig(8);
  negativePrompts$ = sig("");
  seed$ = sig(-1);
  result$ = sig<GeneratedImage | null>(null);
  error$ = sig<string>("");
  aspectRatio$ = sig<ImageAspectRatio>(ImageAspectRatio.square);

  imageSize = sig<ImageAspectRatio>(ImageAspectRatio.square);

  loading$ = sig(false);

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

  setSampler(sampler: string) {
    this.sampler$.set(sampler);
  }

  setAspectRatio(aspectRatio: ImageAspectRatio) {
    this.aspectRatio$.set(aspectRatio);
  }

  setPrompt(prompt: string) {
    this.prompt$.set(prompt);
  }

  applyExample(example: ImageExample) {
    this.prompt$.set(example.prompt);
    this.model$.set(example.model);
    this.negativePrompts$.set(example.negativePrompt);
    this.seed$.set(example.seed);
    this.step$.set(example.steps);
    this.CFGScale$.set(example.cfgScale);
    this.sampler$.set(example.sampler);
    this.aspectRatio$.set(ImageAspectRatio.square);
  }

  generateImage = async () => {
    this.error$.set("");
    if (this.prompt$.get().trim() === "") {
      this.error$.set("Ввод промпта обязателен!");
      return;
    }

    const translatedPrompt = await translationService.translate(
      this.prompt$.get()
    );

    const seed = this.seed$.get();

    this.loading$.set(true);
    const result = await generateImage({
      model: this.model$.get(),
      prompt: translatedPrompt,
      createdAt: new Date(),
      steps: this.step$.get(),
      sampler: this.sampler$.get(),
      negativePrompt: this.negativePrompts$.get(),
      cfgScale: this.CFGScale$.get(),
      seed: isNaN(parseInt(String(seed))) ? -1 : seed,
      aspectRatio: this.aspectRatio$.get(),
      expireTimestamp: datePlus30Days(),
    });

    this.timer.run();

    if (result.error) {
      this.result$.set(null);

      if (result.status === 400) {
        this.error$.set(result.error);
        return;
      }

      this.error$.set("Что-то пошло не так, попробуйте позже");
      return;
    }

    this.loading$.set(false);
    this.result$.set(result);
  };

  selectedModel$ = memo(() =>
    styles.find((model) => this.model$.get() === model.value)
  );

  generate = () => {
    if (!this.timer.isStopped$.get()) return;

    this.result$.set(null);
    this.generateImage$.run();
  };

  saveImage = async (imageId: string) => {
    const result = await saveImage(imageId);
    this.result$.set(result);
    return result;
  };

  save = (imageId: string) => this.saveImage$.run(imageId);

  generateImage$ = ReactivePromise.create(this.generateImage);
  saveImage$ = ReactivePromise.create(this.saveImage);
}

export const imageGeneration = new ImageGeneration();
