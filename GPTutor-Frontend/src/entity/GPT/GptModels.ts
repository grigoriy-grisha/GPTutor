import { sig } from "dignals";
import { getModels } from "$/api/models";
import { appService } from "$/services/AppService";

const tgModels = [
  {
    model: "gpt-4o-mini",
    description:
      "GPT-4o-mini. Младшая модель GPT-4o. Мощная и очень дешевая и быстрая, обучена до 2023 года.",
    lang: "Имеется поддержка Русского языка",
    amount: 70,
    active: true,
  },
  {
    model: "gpt-4o-plus",
    amount: 1000,
    description:
      "GPT-4o. Очень умная модель, очень умная, обучена до 2023 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "o1-preview",
    amount: 5000,
    description:
      "O1-Preview. Самая умная модель на данный момент, умеет 'размышлять' перед генерацией ответа, пишет очень развернутые ответы, очень дорогая модель, обучена до 2024 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "o1-mini",
    amount: 800,
    description:
      "O1-Mini. Младшая модель o1, умеет 'размышлять' перед генерацией ответа, пишет очень развернутые ответы, стоит, как gpt-4o. Обучена до 2024 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "claude-3-opus",
    amount: 6000,
    description:
      "claude-3-opus. Мощная модель, отлично пишет тексты, вживается в роли, которые ей предоставят и великолепно работает с художественным текстом. Обучена до 2023 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "claude-3-5-sonnet",
    amount: 1000,
    description:
      "Сlaude-3.5-sonnet .Самая мощная модель мощная модель Сlaude, отлично пишет тексты, вживается в роли, которые ей предоставят и великолепно работает с художественным текстом. Обучена до 2023 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "claude-3-haiku",
    amount: 100,
    description:
      "Сlaude-3-haiku. Легковесная быстрая модель Сlaude, отлично пишет тексты, вживается в роли, которые ей предоставят и великолепно работает с художественным текстом. Обучена до 2023 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "gpt-3.5-turbo",
    amount: 50,
    description:
      "GPT-3.5. Самая базовая модель. Очень дешевая и быстрая. Обучена до 2021 года",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "meta-llama/Meta-Llama-3.1-405B",
    amount: 500,
    description:
      "Самая крупная LLama модель. Очень Мощная модель, аналог GPT-4. Обучена до 2024 года.",
    lang: "Имеется частичная поддержка Русского языка",
    active: true,
  },
  {
    model: "microsoft/WizardLM-2-7B",
    amount: 20,
    description:
      "WizardLM простая и быстрая модель, почти бесплатная модель. Обучена до 2023 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "microsoft/WizardLM-2-8x22B",
    amount: 200,
    description:
      "WizardLM простая и быстрая модель, анлог GPT-3.5, почти бесплатная модель, подойдет для самых простых вещей. Обучена до 2023 года.",
    lang: "Имеется частичная поддержка Русского языка",
    active: true,
  },
  {
    model: "meta-llama/Meta-Llama-3.1-8B",
    amount: 20,
    description:
      "Самая слабая Llama, но почти бесплатная модель, подойдет для самых простых вещей. Обучена до 2024 года.",
    lang: "Имеется частичная поддержка Русского языка",
    active: true,
  },
].sort((a, b) => b.amount - a.amount);

class GptModels {
  currentModel$ = sig("gpt-4o-mini");

  models = sig([
    {
      model: "gpt-4o-mini",
      description:
        "GPT-4o-mini. Младшая модель самой умной модели из всех существующих на данный момент. Имеет доступ в интернет, в ней всегда актуальные данные. Умеет генерировать изображения",
      lang: "Имеется поддержка Русского языка",
      active: true,
    },
  ]);
  tgModels = tgModels;

  constructor() {
    if (appService.isTG()) {
      this.currentModel$.set("gpt-4o-mini");
    }
  }

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
