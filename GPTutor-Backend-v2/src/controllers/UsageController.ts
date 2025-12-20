import { FastifyReply } from "fastify";
import { BaseController } from "./BaseController";
import { UsageRepository, UsageFilters } from "../repositories/UsageRepository";
import { RequestWithLogging } from "../middleware/loggingMiddleware";
import { createVkAuthMiddleware } from "../middleware/authMiddleware";
import { AuthService } from "../services/AuthService";

interface UsageQueryParams {
  cursor?: string;
  limit?: string;
  model?: string;
  startDate?: string;
  endDate?: string;
}

interface AuthenticatedRequest extends RequestWithLogging {
  vkUser: any;
  dbUser: any;
}

export class UsageController extends BaseController {
  private usageRepository: UsageRepository;
  private authService: AuthService;

  constructor(fastify: any, usageRepository: UsageRepository, authService: AuthService) {
    super(fastify);
    this.usageRepository = usageRepository;
    this.authService = authService;
  }

  registerRoutes() {
    const vkAuthMiddleware = createVkAuthMiddleware(this.authService);

    // Получение usage с пагинацией и фильтрацией
    this.fastify.get(
      "/usage",
      { preHandler: [vkAuthMiddleware] as any },
      this.getUsages.bind(this)
    );

    // Получение статистики
    this.fastify.get(
      "/usage/stats",
      { preHandler: [vkAuthMiddleware] as any },
      this.getStats.bind(this)
    );

    // Получение списка моделей для фильтра
    this.fastify.get(
      "/usage/models",
      { preHandler: [vkAuthMiddleware] as any },
      this.getModels.bind(this)
    );
  }

  private async getUsages(request: any, reply: FastifyReply) {
    try {
      const user = request.dbUser;
      if (!user) {
        return this.sendUnauthorized(reply, "User not found", request);
      }

      const query = request.query as UsageQueryParams;
      const limit = Math.min(parseInt(query.limit || "20", 10), 50);
      const cursor = query.cursor;

      const filters: UsageFilters = {};
      if (query.model) {
        filters.model = query.model;
      }
      if (query.startDate) {
        filters.startDate = new Date(query.startDate);
      }
      if (query.endDate) {
        filters.endDate = new Date(query.endDate);
      }

      const result = await this.usageRepository.findByUserId(
        user.id,
        filters,
        cursor,
        limit
      );

      return this.sendSuccess(reply, {
        usages: result.usages,
        total: result.total,
        hasMore: result.hasMore,
        nextCursor: result.hasMore && result.usages.length > 0
          ? result.usages[result.usages.length - 1].id
          : null,
      });
    } catch (error) {
      this.logError("Failed to get usage", error, {}, request);
      return this.sendError(reply, "Failed to get usage", 500, request);
    }
  }

  private async getStats(request: any, reply: FastifyReply) {
    try {
      const user = request.dbUser;
      if (!user) {
        return this.sendUnauthorized(reply, "User not found", request);
      }

      const stats = await this.usageRepository.getStats(user.id);

      return this.sendSuccess(reply, { stats });
    } catch (error) {
      this.logError("Failed to get usage stats", error, {}, request);
      return this.sendError(reply, "Failed to get usage stats", 500, request);
    }
  }

  private async getModels(request: any, reply: FastifyReply) {
    try {
      const user = request.dbUser;
      if (!user) {
        return this.sendUnauthorized(reply, "User not found", request);
      }

      const models = await this.usageRepository.getModels(user.id);

      return this.sendSuccess(reply, { models });
    } catch (error) {
      this.logError("Failed to get models", error, {}, request);
      return this.sendError(reply, "Failed to get models", 500, request);
    }
  }
}
