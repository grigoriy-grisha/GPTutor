import { sig } from "dignals";
import { getModels } from "$/api/models";
import { appService } from "$/services/AppService";

const freeModels = [
  {
    model: "gpt-3.5-turbo",
    description: "GPT-3.5. Основная модель. Обучена до 2021 года",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "wizardLM_2_7B",
    description:
      "Чуть-чуть слабее, чем GPT-3.5. Модель от microsoft. Хорошо подходит для обычного общения",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
];

const tgModels = [
  {
    model: "gpt-4o-mini",
    description:
      "GPT-4o-mini. Младшая модель GPT-4o. Мощная и очень дешевая и быстрая, обучена до 2023 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "gpt-4o-plus",
    description:
      "GPT-4o. Очень умная модель, очень умная, обучена до 2023 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "o1-preview",
    description:
      "O1-Preview. Самая умная модель на данный момент, умеет 'размышлять' перед генерацией ответа, пишет очень развернутые ответы, очень дорогая модель, обучена до 2024 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "o1-mini",
    description:
      "O1-Mini. Младшая модель o1, меет 'размышлять' перед генерацией ответа, пишет очень развернутые ответы, стоит, как gpt-4o. Обучена до 2024 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "claude-3",
    description:
      "Сlaude-3. Мощная модель, отлично пишет тексты, вживается в роли, которые ей предоставят и великолепно работает с художественным текстом. Обучена до 2023 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "claude-3.5",
    description:
      "Сlaude-3.5. Очень Мощная модель, гораздо умнее, чем Сlaude-3. Отлично пишет тексты, вживается в роли, которые ей предоставят и великолепно работает с художественным текстом. Обучена до 2023 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "gpt-3.5-turbo",
    description:
      "GPT-3.5. Самая базовая модель. Очень дешевая и быстрая. Обучена до 2021 года",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
  {
    model: "meta-llama/Meta-Llama-3.1-405B",
    description:
      "Самая крупная LLama модель. Очень Мощная модель, аналог GPT-4. Обучена до 2024 года.",
    lang: "Имеется частичная поддержка Русского языка",
    active: true,
  },
  {
    model: "meta-llama/Meta-Llama-3.1-8B",
    description:
      "Самая слабая Llama, но почти бесплатная модель, подойдет для самых простых вещей. Обучена до 2024 года.",
    lang: "Имеется поддержка Русского языка",
    active: true,
  },
];

class GptModels {
  currentModel$ = sig("gpt-3.5-turbo");

  freeModels = sig(freeModels);
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

  async loadModels() {
    if (appService.isTG()) {
      return;
    }

    const models = await getModels();
    this.models.set([
      ...this.models.get(),
      ...models
        .filter((item) => !item.free)
        .sort((a, b) => Number(b.active) - Number(a.active)),
    ]);
  }
}

export const gptModels = new GptModels();
