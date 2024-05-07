import { sig } from "dignals";
import { getModels } from "$/api/models";

const freeModels = [
  {
    model: "gpt-3.5-turbo-0125",
    description: "GPT-3.5. Основная модель. Обучена до 2021 года",
    lang: "Имеется поддержка Русского языка",
  },
];

class GptModels {
  currentModel$ = sig("gpt_35_turbo");

  freeModels = sig(freeModels);
  models = sig([
    {
      model: "gpt-4-bing",
      description:
        "GPT-4 от Бинг. Самая умная модель из всех существующих на данный момент. Имеет доступ в интернет, в ней всегда актуальные данные",
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
    this.models.set(
      models
        .filter((item) => !item.free)
        .sort((a, b) => Number(b.active) - Number(a.active))
    );
    this.freeModels.set(models.filter((item) => item.free));
  }
}

export const gptModels = new GptModels();
