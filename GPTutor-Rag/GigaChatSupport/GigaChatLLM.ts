import { type BaseLLMParams, LLM } from "@langchain/core/language_models/llms";
import { GigaChat } from "./GigaChat";

export interface GigaChatInputs extends BaseLLMParams {
  temperature?: number;
  maxTokens?: number;
  model?: string;
  clientSecretKey?: string;
}

export class GigaChatLLM extends LLM implements GigaChatInputs {
  lc_serializable = true;

  static lc_name() {
    return "GigaChat";
  }

  get lc_secrets(): { [key: string]: string } | undefined {
    return { clientSecretKey: "CLIENT_SECRET_KEY" };
  }

  temperature = 0.6;
  maxTokens = 4000;
  model = "GigaChat:latest";
  clientSecretKey?: string;
  client?: GigaChat;

  tokenIsInit = false;

  constructor(fields?: GigaChatInputs) {
    super(fields ?? {});

    this.clientSecretKey = fields?.clientSecretKey;
    this.maxTokens = fields?.maxTokens ?? this.maxTokens;
    this.temperature = fields?.temperature ?? this.temperature;
    this.model = fields?.model ?? this.model;

    this.client = new GigaChat(this.clientSecretKey!, true, true, true);
  }

  _llmType() {
    return "GigaChat";
  }

  async _call(
    prompt: string,
    options: this["ParsedCallOptions"]
  ): Promise<string> {
    if (!this.tokenIsInit) {
      await this.client?.createToken();
      this.tokenIsInit = true;
    }

    return this.caller.callWithOptions({ signal: options.signal }, async () => {
      const response = await this.client?.completion({
        model: "GigaChat-Plus",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      return response!.choices[0].message.content;
    });
  }
}
