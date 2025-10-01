import {
  OpenRouterModel,
  OpenRouterApiResponse,
  CostCalculation,
  UsageParams,
} from "../types/openrouter";

export class LLMCostEvaluate {
  private models: OpenRouterModel[] = [];
  private usdToRubRate: number;
  private readonly OPENROUTER_API_URL = "https://openrouter.ai/api/v1/models";

  constructor(usdToRubRate: number = 100) {
    this.usdToRubRate = usdToRubRate;
  }

  async initialize(): Promise<void> {
    try {
      console.log("🔄 Loading OpenRouter models...");

      const response = await fetch(this.OPENROUTER_API_URL);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch models: ${response.status} ${response.statusText}`
        );
      }

      const data = (await response.json()) as OpenRouterApiResponse;
      this.models = data.data;

      console.log(`✅ Loaded ${this.models.length} OpenRouter models`);
    } catch (error) {
      console.error("❌ Failed to load OpenRouter models:", error);
      throw error;
    }
  }

  getAllModels(): OpenRouterModel[] {
    return this.models;
  }

  calculateCost(cost: number): number {
    return cost * this.usdToRubRate * 2;
  }

  getModelsWithRubPricing(searchTerm?: string, provider?: string): any[] {
    let filteredModels = this.models;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredModels = filteredModels.filter(
        (model) =>
          model.name.toLowerCase().includes(term) ||
          model.id.toLowerCase().includes(term) ||
          model.description.toLowerCase().includes(term)
      );
    }

    if (provider) {
      filteredModels = filteredModels.filter((model) =>
        model.id.toLowerCase().includes(provider.toLowerCase())
      );
    }

    return filteredModels.map((model) => ({
      ...model,
      pricing: {
        prompt: this.calculateCost(parseFloat(model.pricing.prompt)),
        completion: this.calculateCost(parseFloat(model.pricing.completion)),
        request: this.calculateCost(parseFloat(model.pricing.request)),
        image: this.calculateCost(parseFloat(model.pricing.image)),
        web_search: this.calculateCost(parseFloat(model.pricing.web_search)),
        internal_reasoning: this.calculateCost(
          parseFloat(model.pricing.internal_reasoning)
        ),
        input_cache_read: model.pricing.input_cache_read
          ? this.calculateCost(parseFloat(model.pricing.input_cache_read))
          : undefined,
        input_cache_write: model.pricing.input_cache_write
          ? this.calculateCost(parseFloat(model.pricing.input_cache_write))
          : undefined,
      },
    }));
  }

  getModelsByProviders(providers: string[]): any[] {
    return this.getModelsWithRubPricing().filter((model) =>
      providers.some((provider) =>
        model.id.toLowerCase().startsWith(`${provider.toLowerCase()}/`)
      )
    );
  }

  getPopularProviderModels(): any[] {
    const popularProviders = [
      "x-ai",
      "deepseek",
      "google",
      "qwen",
      "perplexity",
      "mistralai",
      "openai",
    ];

    return this.getModelsByProviders(popularProviders).filter(
      (model) => !model.id.toLowerCase().includes(":free")
    );
  }
}
