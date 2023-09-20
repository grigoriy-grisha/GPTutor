import { memo, sig } from "dignals";

import { defaultModel, defaultSampler, styles } from "./styles";
import ReactivePromise from "$/services/ReactivePromise";
import { generateImage } from "$/api/images";
import {
  GeneratedImage,
  ImageAspectRatio,
  ImageExample,
} from "$/entity/imageGeneration/types";
import { ChatGptImages } from "$/entity/GPT/ChatGptImages";
import { getRandomPromptImage } from "$/entity/imageGeneration/imageCreations";
import { translationService } from "$/services/TranslationService";

class ImageGeneration {
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
    if (this.prompt$.get().trim() === "") {
      this.error$.set("Ввод промпта обязателен!");
      return;
    }

    console.log(await translationService.translate(this.prompt$.get()));

    const seed = this.seed$.get();

    this.loading$.set(true);
    const result = await generateImage({
      model: this.model$.get(),
      prompt: this.prompt$.get(),
      createdAt: new Date(),
      steps: this.step$.get(),
      sampler: this.sampler$.get(),
      negativePrompt: this.negativePrompts$.get(),
      cfgScale: this.CFGScale$.get(),
      seed: isNaN(parseInt(String(seed))) ? -1 : seed,
      aspectRatio: this.aspectRatio$.get(),
    });

    if (result.error) {
      this.result$.set(null);

      console.log(result);
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
    this.generateImage$.run();
  };

  generateImage$ = ReactivePromise.create(this.generateImage);
}

export const imageGeneration = new ImageGeneration();
