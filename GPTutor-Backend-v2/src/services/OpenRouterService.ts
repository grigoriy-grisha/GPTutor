import OpenAI from "openai";
import type {
  ChatCompletion,
  ChatCompletionCreateParams,
} from "openai/resources/chat/completions";
import { ProxyAgent, fetch as undiciFetch } from "undici";

export class OpenRouterService {
  private client: OpenAI;
  private proxyUrl?: string;

  constructor(apiKey: string, proxyUrl?: string) {
    this.proxyUrl = proxyUrl;

    const options: ConstructorParameters<typeof OpenAI>[0] = {
      apiKey: apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": "https://giga-router.ru",
        "X-Title": "GigaRouter",
      },
    };

    if (proxyUrl) {
      const proxyAgent = new ProxyAgent(proxyUrl);
      (options as any).fetch = (url: string, init: any) => {
        return undiciFetch(url, { ...init, dispatcher: proxyAgent });
      };
    }

    this.client = new OpenAI(options);
  }

  async createCompletion(
    params: ChatCompletionCreateParams
  ): Promise<ChatCompletion> {
    try {
      const completion = await this.client.chat.completions.create({
        ...params,
        stream: false,
        usage: { include: true },
      } as any);
      return completion as ChatCompletion;
    } catch (error) {
      console.error("OpenRouter API request failed:", error);
      throw error;
    }
  }

  async createCompletionStream(
    params: ChatCompletionCreateParams,
    signal?: AbortSignal
  ) {
    try {
      //@ts-ignore
      return this.client.chat.completions.create(
        {
          ...params,
          stream: true,
          usage: {
            include: true,
          },
        },
        {
          signal,
        }
      );
    } catch (error) {
      console.error("OpenRouter API stream request failed:", error);
      throw error;
    }
  }

  async getModels() {
    try {
      const models = await this.client.models.list();
      return models;
    } catch (error) {
      console.error("Failed to get Models from OpenRouter:", error);
      throw error;
    }
  }

  /**
   * Получить информацию о генерации по ID
   * Полезно для получения стоимости при аборте запроса
   * @param maxRetries - максимальное количество попыток (данные могут появиться не сразу)
   * @param retryDelayMs - задержка между попытками в мс
   */
  async getGenerationInfo(
    generationId: string,
    maxRetries: number = 5,
    retryDelayMs: number = 200
  ): Promise<{
    id: string;
    total_cost: number;
    tokens_prompt: number;
    tokens_completion: number;
    cancelled: boolean;
    model: string;
  } | null> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const fetchOptions: any = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.client.apiKey}`,
          },
        };

        // Добавляем прокси для fetch если указан
        if (this.proxyUrl) {
          fetchOptions.dispatcher = new ProxyAgent(this.proxyUrl);
        }

        const response = await undiciFetch(
          `https://openrouter.ai/api/v1/generation?id=${encodeURIComponent(
            generationId
          )}`,
          fetchOptions
        );

        if (!response.ok) {
          console.error(
            `Failed to get generation info (attempt ${attempt + 1}):`,
            response.status
          );
          // Если 404 - данные еще не готовы, пробуем снова
          if (response.status === 404 && attempt < maxRetries - 1) {
            await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
            continue;
          }
          return null;
        }

        const data = (await response.json()) as {
          data?: {
            id: string;
            total_cost: number;
            tokens_prompt: number;
            tokens_completion: number;
            cancelled: boolean;
            model: string;
          };
        };

        // Проверяем, что данные о стоимости уже доступны
        if (data.data && data.data.total_cost !== undefined) {
          return data.data;
        }

        // Если данные еще не готовы, пробуем снова
        if (attempt < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        }
      } catch (error) {
        console.error(
          `Error getting generation info (attempt ${attempt + 1}):`,
          error
        );
        if (attempt < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        }
      }
    }

    return null;
  }
}
