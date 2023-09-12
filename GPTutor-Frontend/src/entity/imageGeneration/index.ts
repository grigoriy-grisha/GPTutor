import { memo, sig } from "dignals";

import { defaultModel, styles } from "./styles";
import ReactivePromise from "$/services/ReactivePromise";
import { generateImage } from "$/api/images";
import { GeneratedImage } from "$/entity/imageGeneration/types";

class ImageGeneration {
  prompt$ = sig("");
  model$ = sig(defaultModel);
  result$ = sig<GeneratedImage | null>(null);
  error$ = sig<string>("");

  loading$ = sig(false);

  setModel(model: string) {
    this.model$.set(model);
  }

  setPrompt(prompt: string) {
    this.prompt$.set(prompt);
  }

  generateImage = async () => {
    if (this.prompt$.get().trim() === "") {
      this.error$.set("Ввод промпта обязателен!");
      return;
    }

    this.loading$.set(true);
    const as = await generateImage({
      model: this.model$.get(),
      prompt: this.prompt$.get(),
      createdAt: new Date(),
    });

    if (as.error) {
      this.result$.set(null);

      console.log(as);
      if (as.status === 400) {
        this.error$.set(as.error);
        return;
      }

      this.error$.set("Что-то пошло не так, попробуйте позже");
      return;
    }

    this.loading$.set(false);
    this.result$.set(as);
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
