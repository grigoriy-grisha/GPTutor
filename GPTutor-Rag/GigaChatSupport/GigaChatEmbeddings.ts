import { Embeddings, EmbeddingsParams } from "@langchain/core/embeddings";
import { GigaChat } from "./GigaChat";

export interface GigaChatEmbeddingsParams extends EmbeddingsParams {
  clientSecretKey?: string;
}

export class GigaChatEmbeddings
  extends Embeddings
  implements GigaChatEmbeddingsParams
{
  clientSecretKey?: string;
  client?: GigaChat;
  tokenIsInit = false;

  constructor(fields?: GigaChatEmbeddingsParams) {
    super(fields ?? {});

    this.clientSecretKey = fields?.clientSecretKey;
    this.client = new GigaChat(this.clientSecretKey!, true, true, true);
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    return this.embeddingWithRetry(texts);
  }

  async embedQuery(text: string): Promise<number[]> {
    const data = await this.embedDocuments([text]);
    return data[0];
  }

  private async embeddingWithRetry(texts: string[]): Promise<number[][]> {
    if (!this.tokenIsInit) {
      await this.client?.createToken();

      this.tokenIsInit = true;
    }

    return this.caller.call(async () => {
      const embeddings = await this.client?.embedding(texts);
      const result: number[][] = [];

      for (const embedding of embeddings!.data) {
        result.push(embedding.embedding);
      }

      return result;
    });
  }
}
