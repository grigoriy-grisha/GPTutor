import { sig } from "dignals";

class GptModels {
  currentModel$ = sig("gpt-3.5-turbo-0125");

  models = [
    {
      model: "gpt-3.5-turbo-0125",
      description: "Основная модель. Обучена до 2021 года",
      lang: "Имеется поддержка Русского языка",
    },
    {
      model: "mixtral_8x22b",
      description:
        "Аналог GPT-3.5, Во многих аспектах превосходит GPT-3.5. Обучена до 2024 года",
      lang: "Имеется поддержка Русского языка",
    },
    {
      model: "dbrx_instruct",
      description:
        "Аналог GPT-3.5, Модель адаптированная под программирование. Обучена до 2024 года",
      lang: "Имеется поддержка Русского языка",
    },
    {
      model: "command_r_plus",
      description:
        "Аналог GPT-3.5, Модель адаптированная под программирование. Обучена до 2023 года",
      lang: "Слабая поддержка Русского языка",
    },
  ];

  selectedCurrentModel(modelId: string) {
    return this.currentModel$.get() === modelId;
  }

  selectModel(modelId: string) {
    this.currentModel$.set(modelId);
  }

  getModel() {
    return this.currentModel$.get();
  }
}

export const gptModels = new GptModels();
