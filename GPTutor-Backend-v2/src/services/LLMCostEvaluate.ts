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

  getModelById(modelId: string): OpenRouterModel | null {
    return this.models.find((model) => model.id === modelId) || null;
  }

  searchModelsByName(searchTerm: string): OpenRouterModel[] {
    const term = searchTerm.toLowerCase();
    return this.models.filter(
      (model) =>
        model.name.toLowerCase().includes(term) ||
        model.id.toLowerCase().includes(term)
    );
  }

  calculateCost(cost: number): number {
    return Math.round(cost * this.usdToRubRate * 10000) / 10000;
  }

  getOpenAIModels(): OpenRouterModel[] {
    return this.models.filter((model) => model.id.startsWith("openai/"));
  }

  getAnthropicModels(): OpenRouterModel[] {
    return this.models.filter((model) => model.id.startsWith("anthropic/"));
  }

  getGoogleModels(): OpenRouterModel[] {
    return this.models.filter((model) => model.id.startsWith("google/"));
  }

  setUsdToRubRate(rate: number): void {
    this.usdToRubRate = rate;
    console.log(`💱 USD to RUB rate updated: ${rate}`);
  }

  getUsdToRubRate(): number {
    return this.usdToRubRate;
  }

  getStats(): any {
    const totalModels = this.models.length;
    const openaiCount = this.getOpenAIModels().length;
    const anthropicCount = this.getAnthropicModels().length;
    const googleCount = this.getGoogleModels().length;
    const otherCount = totalModels - openaiCount - anthropicCount - googleCount;

    return {
      totalModels,
      providers: {
        openai: openaiCount,
        anthropic: anthropicCount,
        google: googleCount,
        other: otherCount,
      },
      lastUpdated: new Date().toISOString(),
      usdToRubRate: this.usdToRubRate,
    };
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

    // Фильтрация по провайдеру
    if (provider) {
      filteredModels = filteredModels.filter((model) =>
        model.id.toLowerCase().startsWith(`${provider.toLowerCase()}/`)
      );
    }

    // Преобразование цен в рубли
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

  getCheapestModels(
    limit: number = 10,
    tokenType: "prompt" | "completion" = "prompt"
  ): any[] {
    const modelsWithRubPricing = this.getModelsWithRubPricing();

    return modelsWithRubPricing
      .sort((a, b) => a.pricing_rub[tokenType] - b.pricing_rub[tokenType])
      .slice(0, limit);
  }

  getModelsInPriceRange(
    minPrice: number,
    maxPrice: number,
    tokenType: "prompt" | "completion" = "prompt"
  ): any[] {
    return this.getModelsWithRubPricing().filter(
      (model) =>
        model.pricing_rub[tokenType] >= minPrice &&
        model.pricing_rub[tokenType] <= maxPrice
    );
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

    return this.getModelsByProviders(popularProviders).filter(model => 
      !model.name.toLowerCase().includes(':free')
    );
  }
}
