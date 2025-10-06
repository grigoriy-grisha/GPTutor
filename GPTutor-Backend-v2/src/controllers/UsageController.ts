import { FastifyRequest, FastifyReply } from "fastify";
import { BaseController } from "./BaseController";
import { UsageRepository, UsageRecordFilters, PaginationOptions } from "../repositories/UsageRepository";
import { UserRepository } from "../repositories/UserRepository";
import { RequestWithLogging } from "../middleware/loggingMiddleware";
import { createUniversalAuthMiddleware, AuthenticatedRequest, getUserId } from "../middleware/universalAuthMiddleware";


export class UsageController extends BaseController {
  constructor(
    fastify: any,
    private usageRepository: UsageRepository,
    private userRepository: UserRepository,
    private vkSecretKey: string = process.env.VK_SECRET_KEY || ""
  ) {
    super(fastify);
  }

  registerRoutes(): void {
    const authMiddleware = createUniversalAuthMiddleware(
      this.userRepository,
      this.vkSecretKey
    );

    this.fastify.get(
      "/v1/usage",
      { preHandler: authMiddleware },
      this.getUsageList.bind(this)
    );

    this.fastify.get(
      "/v1/usage/stats",
      { preHandler: authMiddleware },
      this.getUsageStats.bind(this)
    );
  }

  private async getUsageList(request: AuthenticatedRequest, reply: FastifyReply) {
    try {
      const userId = getUserId(request);

      // Парсинг параметров
      const query = request.query as any;
      const page = parseInt(query.page || "1");
      const limit = Math.min(parseInt(query.limit || "20"), 100); // максимум 100 записей
      const sortBy = query.sortBy || 'createdAt';
      const sortOrder = query.sortOrder || 'desc';

      // Фильтры - пользователь может видеть только свои записи
      const filters: UsageRecordFilters = {
        userId: userId,
      };

      if (query.model) {
        filters.model = query.model;
      }

      if (query.stream !== undefined) {
        filters.stream = query.stream === 'true';
      }

      if (query.startDate) {
        filters.startDate = new Date(query.startDate);
      }

      if (query.endDate) {
        filters.endDate = new Date(query.endDate);
      }

      const pagination: PaginationOptions = {
        page,
        limit,
        sortBy,
        sortOrder,
      };

      const result = await this.usageRepository.findPaginated(filters, pagination);

      this.logInfo(
        `Usage list requested`,
        {
          userId,
          page,
          limit,
          totalRecords: result.total,
          filters,
        },
        request as any
      );

      return this.sendSuccess(reply, {
        records: result.records.map((record: any) => ({
          id: record.id,
          model: record.model,
          promptTokens: record.promptTokens,
          completionTokens: record.completionTokens,
          totalTokens: record.totalTokens,
          costRub: record.costRub,
          costUsd: record.costUsd,
          duration: record.duration,
          stream: record.stream,
          requestId: record.requestId,
          messagesCount: record.messagesCount,
          temperature: record.temperature,
          maxTokens: record.maxTokens,
          topP: record.topP,
          frequencyPenalty: record.frequencyPenalty,
          presencePenalty: record.presencePenalty,
          createdAt: record.createdAt,
          user: record.user,
        })),
        pagination: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: result.totalPages,
        },
      });

    } catch (error) {
      this.logError("Usage list error", error, {}, request as any);

      if (error instanceof Error) {
        if (error.message === "User not authenticated") {
          return this.sendUnauthorized(reply, "Authentication required", request as any);
        }
      }

      return this.sendError(reply, "Internal server error", 500, request as any);
    }
  }

  private async getUsageStats(request: AuthenticatedRequest, reply: FastifyReply) {
    try {
      const userId = getUserId(request);
      const query = request.query as any;

      // Пользователь может видеть только свою статистику
      const targetUserId = userId;

      const startDate = query.startDate ? new Date(query.startDate) : undefined;
      const endDate = query.endDate ? new Date(query.endDate) : undefined;

      const stats = await this.usageRepository.getUsageStats(targetUserId, startDate, endDate);

      this.logInfo(
        `Usage stats requested`,
        {
          userId,
          targetUserId,
          startDate,
          endDate,
          totalRequests: stats.totalRequests,
        },
        request as any
      );

      return this.sendSuccess(reply, stats);

    } catch (error) {
      this.logError("Usage stats error", error, {}, request as any);

      if (error instanceof Error) {
        if (error.message === "User not authenticated") {
          return this.sendUnauthorized(reply, "Authentication required", request as any);
        }
      }

      return this.sendError(reply, "Internal server error", 500, request as any);
    }
  }
}
