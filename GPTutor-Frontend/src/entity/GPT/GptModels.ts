import { sig } from "dignals";

const freeModels = [
  {
    model: "gpt-3.5-turbo-0125",
    description: "GPT-3.5. Основная модель. Обучена до 2021 года",
    lang: "Имеется поддержка Русского языка",
  },

];
class GptModels {
  currentModel$ = sig("gpt-3.5-turbo-0125");

  freeModels = freeModels;
  models = [
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
      model: "llama3_8b",
      description:
          "Llama-3 8b. Аналог GPT-3.5. Новая и быстрая модель. Отключена поддержа потоковой генерации",
      lang: "Имеется поддержка Русского языка",
    },
    {
      model: "llama3_70b",
      description:
          "Llama-3 70b. Аналог GPT-4. Новая, одна из самых мощных моделей. Отключена поддержа потоковой генерации",
      lang: "Имеется поддержка Русского языка",
    },
    {
      model: "command_r_plus",
      description: "Аналог GPT-4, Обучена до 2023 года",
      lang: "Имеется поддержка Русского языка",
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
