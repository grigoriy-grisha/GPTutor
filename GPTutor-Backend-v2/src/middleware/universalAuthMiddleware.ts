import { FastifyRequest, FastifyReply } from "fastify";
import { UserRepository } from "../repositories/UserRepository";
import { authenticateUser } from "../utils/vkAuth";
import { logger } from "../services/LoggerService";

export interface AuthenticatedUser {
  id: string;
  username?: string | null;
  email?: string | null;
  vkId?: string | null;
  balance: number;
  apiKey: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedRequest extends FastifyRequest {
  user?: AuthenticatedUser;
  userId?: string;
  requestId?: string;
  startTime?: number;
}

export function createUniversalAuthMiddleware(
  userRepository: UserRepository,
  vkSecretKey: string
) {
  return async function universalAuthMiddleware(
    request: AuthenticatedRequest,
    reply: FastifyReply
  ) {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        return reply.code(401).send({
          error: "Unauthorized",
          message: "Missing authorization header",
        });
      }

      const authResult = await authenticateUser(
        authHeader,
        vkSecretKey,
        userRepository
      );

      if (!authResult) {
        return reply.code(401).send({
          error: "Unauthorized",
          message: "Invalid authentication. Use Bearer token (sk-...) or VK authorization.",
        });
      }

      let user: AuthenticatedUser;
      let userId: string;

      if (authResult.authType === "api_key") {
        user = authResult.user;
        userId = user.id.toString();
      } else if (authResult.authType === "vk") {
        const vkData = authResult.user;
        let dbUser = await userRepository.findByVkId(vkData.vk_user_id);

        if (!dbUser) {
          dbUser = await userRepository.create({
            vkId: vkData.vk_user_id,
            isActive: true,
          });
        }

        user = dbUser;
        userId = user.id.toString();
      } else {
        return reply.code(401).send({
          error: "Unauthorized",
          message: "Unknown authentication type",
        });
      }

      if (!user.isActive) {
        return reply.code(401).send({
          error: "Unauthorized",
          message: "User account is inactive",
        });
      }

      // Добавляем пользователя в request
      request.user = user;
      request.userId = userId;

      // Логируем успешную аутентификацию
      logger.auth(
        authResult.authType,
        userId,
        true,
        {
          requestId: request.requestId,
          authType: authResult.authType,
          userAgent: request.headers["user-agent"],
          ip: request.ip,
        }
      );

      return; // Продолжаем выполнение
    } catch (error) {
      // Логируем ошибку аутентификации
      logger.auth(
        "unknown",
        "anonymous",
        false,
        {
          requestId: request.requestId,
          error: error instanceof Error ? error.message : "Unknown error",
          userAgent: request.headers["user-agent"],
          ip: request.ip,
        }
      );

      return reply.code(401).send({
        error: "Unauthorized",
        message: "Authentication failed",
      });
    }
  };
}

// Вспомогательная функция для проверки, что пользователь аутентифицирован
export function requireAuth(request: AuthenticatedRequest): AuthenticatedUser {
  if (!request.user) {
    throw new Error("User not authenticated");
  }
  return request.user;
}

// Вспомогательная функция для получения ID пользователя
export function getUserId(request: AuthenticatedRequest): string {
  if (!request.userId) {
    throw new Error("User not authenticated");
  }
  return request.userId;
}
