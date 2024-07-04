import { sig } from "dignals";
import { getModels } from "$/api/models";

const freeModels = [
  {
    model: "gpt-auto",
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

class GptModels {
  currentModel$ = sig("gpt-auto");

  freeModels = sig(freeModels);
  models = sig([
    {
      model: "gpt-4o-plus",
      description:
        "GPT-4o. Самая умная модель из всех существующих на данный момент. Имеет доступ в интернет, в ней всегда актуальные данные. Умеет генерировать изображения",
      lang: "Имеется поддержка Русского языка",
      active: true,
    },
  ]);

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
