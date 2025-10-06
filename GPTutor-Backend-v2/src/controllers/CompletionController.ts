import { FastifyRequest, FastifyReply } from "fastify";
import { BaseController } from "./BaseController";
import { UserRepository } from "../repositories/UserRepository";
import { UsageRepository } from "../repositories/UsageRepository";
import { LLMCostEvaluate } from "../services/LLMCostEvaluate";
import { OpenRouterService } from "../services/OpenRouterService";
import { RequestWithLogging } from "../middleware/loggingMiddleware";
import { logger } from "../services/LoggerService";
import { createUniversalAuthMiddleware, AuthenticatedRequest, getUserId } from "../middleware/universalAuthMiddleware";
import {
  createRateLimitMiddleware,
  getRateLimitConfig,
} from "../middleware/rateLimitMiddleware";

interface CompletionRequest extends RequestWithLogging {
  body: {
    model?: string;
    messages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }>;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    stop?: string[];
    stream?: boolean;
  };
}

export class CompletionController extends BaseController {
  constructor(
    fastify: any,
    private userRepository: UserRepository,
    private usageRepository: UsageRepository,
    private llmCostService: LLMCostEvaluate,
    private openRouterService: OpenRouterService,
    private vkSecretKey: string = process.env.VK_SECRET_KEY || ""
  ) {
    super(fastify);
  }

  registerRoutes(): void {
    const completionsRateLimit = createRateLimitMiddleware(
      getRateLimitConfig("/v1/chat/completions")!
    );

    const authMiddleware = createUniversalAuthMiddleware(
      this.userRepository,
      this.vkSecretKey
    );

    this.fastify.post(
      "/v1/chat/completions",
      { 
        preHandler: [authMiddleware, completionsRateLimit] 
      },
      this.chatCompletions.bind(this)
    );
  }

  private async chatCompletions(request: AuthenticatedRequest, reply: FastifyReply) {
    try {
      const userId = getUserId(request);
      const user = request.user!;

      const requestBody = request.body as any;
      if (!requestBody.messages || !Array.isArray(requestBody.messages)) {
        return this.sendValidationError(
          reply,
          "messages array is required",
          request as any as any
        );
      }

      const model = requestBody.model || "google/gemini-2.5-flash-lite";

      this.logInfo(
        `LLM request initiated`,
        {
          model,
          messagesCount: requestBody.messages.length,
          stream: requestBody.stream || false,
        },
        request as any
      );

      const openRouterParams = {
        model,
        messages: requestBody.messages,
        max_tokens: requestBody.max_tokens,
        temperature: requestBody.temperature,
        top_p: requestBody.top_p,
        frequency_penalty: requestBody.frequency_penalty,
        presence_penalty: requestBody.presence_penalty,
        stop: requestBody.stop,
      };

      if (requestBody.stream) {
        return this.handleStreamingResponse(
          reply,
          user,
          model,
          openRouterParams,
          request as any as any
        );
      }

      return this.handleNonStreamingResponse(
        reply,
        user,
        openRouterParams,
        request as any
      );
    } catch (error) {
      this.logError("Completion API error", error, {}, request as any);

      if (error instanceof Error) {
        if (error.message === "User not found") {
          return this.sendUnauthorized(reply, "Invalid API key", request as any);
        }
        if (error.message === "Insufficient balance") {
          return this.sendInsufficientBalance(reply, request as any);
        }
        if (error.message === "User not authenticated") {
          return this.sendUnauthorized(reply, "Authentication required", request as any);
        }
      }

      return this.sendError(reply, "Internal server error", 500, request as any);
    }
  }

  private async handleStreamingResponse(
    reply: FastifyReply,
    user: any,
    model: string,
    openRouterParams: any,
    request: CompletionRequest
  ) {
    reply.raw.setHeader("Cache-Control", "no-cache");
    reply.raw.setHeader("Connection", "keep-alive");
    reply.raw.setHeader("X-Accel-Buffering", "no");
    reply.raw.setHeader("Access-Control-Allow-Origin", "*");
    reply.raw.setHeader("Content-type", "text/event-stream");

    let totalCost = 0;

    try {
      logger.llmRequest(model, user.id.toString(), undefined, undefined, {
        requestId: request.requestId,
        stream: true,
      });

      const streamStartTime = Date.now();

      const stream = await this.openRouterService.createCompletionStream({
        ...openRouterParams,
        stream: true,
      });

      let chunkCount = 0;

      for await (const chunk of stream) {
        chunkCount++;

        if (chunk.usage) {
          const responseUsage = chunk.usage as any;
          console.log({ usage: chunk.usage as any });
          const cost = this.llmCostService.calculateCost(responseUsage?.cost);

          chunk.usage = {
            prompt_tokens: responseUsage?.prompt_tokens,
            completion_tokens: responseUsage?.completion_tokens,
            total_tokens: responseUsage?.total_tokens,
            cost,
          } as any;
        }

        const chunkData = `data: ${JSON.stringify(chunk)}\n\n`;
        reply.raw.write(chunkData);

        if (chunkCount % 50 === 0) {
          this.logDebug(
            `Streaming progress: ${chunkCount} chunks sent`,
            {},
            request as any as any
          );
        }
      }

      reply.raw.write("data: [DONE]\n\n");

      reply.raw.end();

      const streamDuration = Date.now() - streamStartTime;

      logger.llmResponse(
        model,
        user.id.toString(),
        0,
        totalCost,
        streamDuration,
        {
          requestId: request.requestId,
          chunks: chunkCount,
          stream: true,
        }
      );

      await this.userRepository.decreaseBalance(user.id, totalCost);

      // Сохраняем статистику использования
      await this.saveUsageRecord({
        userId: user.id,
        model,
        promptTokens: 0, // Для стриминга токены могут быть неизвестны
        completionTokens: 0,
        totalTokens: 0,
        costRub: totalCost,
        costUsd: undefined,
        duration: streamDuration,
        stream: true,
        requestId: request.requestId,
        messagesCount: openRouterParams.messages.length,
        temperature: openRouterParams.temperature,
        maxTokens: openRouterParams.max_tokens,
        topP: openRouterParams.top_p,
        frequencyPenalty: openRouterParams.frequency_penalty,
        presencePenalty: openRouterParams.presence_penalty,
      });

      return;
    } catch (streamError) {
      this.logError("Stream error", streamError, { model }, request);

      try {
        reply.raw.write(
          `data: ${JSON.stringify({
            error: "Stream error",
            message:
              streamError instanceof Error
                ? streamError.message
                : "Unknown error",
          })}\n\n`
        );
        reply.raw.write("data: [DONE]\n\n");
        reply.raw.end();
      } catch (writeError) {
        this.logError(
          "Error writing error response to stream",
          writeError,
          {},
          request as any as any
        );
      }

      return;
    }
  }

  private async handleNonStreamingResponse(
    reply: FastifyReply,
    user: any,
    openRouterParams: any,
    request: CompletionRequest
  ) {
    const requestStartTime = Date.now();

    logger.llmRequest(
      openRouterParams.model,
      user.id.toString(),
      undefined,
      undefined,
      {
        requestId: request.requestId,
        stream: false,
      }
    );

    const completion = await this.openRouterService.createCompletion({
      ...openRouterParams,
      stream: false,
    });

    console.log(completion);
    const responseUsage = completion.usage;
    console.log({ usage: responseUsage });
    const originalCostUsd = (completion.usage as any)?.cost;
    const cost = this.llmCostService.calculateCost(originalCostUsd);
    const requestDuration = Date.now() - requestStartTime;
    const totalTokens = (completion.usage as any)?.total_tokens || 0;

    await this.userRepository.decreaseBalance(user.id, cost);

    // Get updated user by ID instead of API key (since VK auth doesn't have API key)
    const updatedUser =
      (await this.userRepository.findByVkId(user.vkId || "")) ||
      (await this.userRepository.findByApiKey(
        request.headers.authorization?.substring(7) || ""
      ));

    logger.llmResponse(
      openRouterParams.model,
      user.id.toString(),
      totalTokens,
      cost,
      requestDuration,
      {
        requestId: request.requestId,
        originalCostUsd,
        remainingBalance: updatedUser?.balance,
      }
    );

    logger.balance(
      "decrease",
      user.id.toString(),
      cost,
      updatedUser?.balance || 0,
      {
        requestId: request.requestId,
        reason: "llm_completion",
      }
    );

    // Сохраняем статистику использования
    await this.saveUsageRecord({
      userId: user.id,
      model: openRouterParams.model,
      promptTokens: responseUsage?.prompt_tokens || 0,
      completionTokens: responseUsage?.completion_tokens || 0,
      totalTokens: responseUsage?.total_tokens || 0,
      costRub: cost,
      costUsd: originalCostUsd,
      duration: requestDuration,
      stream: false,
      requestId: request.requestId,
      messagesCount: openRouterParams.messages.length,
      temperature: openRouterParams.temperature,
      maxTokens: openRouterParams.max_tokens,
      topP: openRouterParams.top_p,
      frequencyPenalty: openRouterParams.frequency_penalty,
      presencePenalty: openRouterParams.presence_penalty,
    });

    const responseWithCost = {
      ...completion,
      usage: {
        prompt_tokens: responseUsage?.prompt_tokens,
        completion_tokens: responseUsage?.completion_tokens,
        total_tokens: responseUsage?.total_tokens,
        cost,
      },
    };

    return this.sendSuccess(reply, responseWithCost);
  }

  private async saveUsageRecord(data: {
    userId: string;
    model: string;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    costRub: number;
    costUsd?: number;
    duration: number;
    stream: boolean;
    requestId?: string;
    messagesCount?: number;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
  }) {
    try {
      await this.usageRepository.create(data);
      this.logDebug(
        `Usage record saved`,
        {
          userId: data.userId,
          model: data.model,
          totalTokens: data.totalTokens,
          costRub: data.costRub,
          duration: data.duration,
        },
        {} as any
      );
    } catch (error) {
      this.logError(
        "Failed to save usage record",
        error,
        {
          userId: data.userId,
          model: data.model,
          requestId: data.requestId,
        },
        {} as any
      );
    }
  }
}
