import { FastifyReply } from "fastify";
import { RequestWithLogging } from "./loggingMiddleware";
import { logger } from "../services/LoggerService";

export function createAdminAuthMiddleware(adminSecretKey: string) {
  return async function adminAuthMiddleware(
    request: RequestWithLogging,
    reply: FastifyReply
  ) {
    const adminKey = request.headers['x-admin-secret-key'] as string;

    if (!adminKey || adminKey !== adminSecretKey) {
      logger.warn("Unauthorized admin access attempt", {
        requestId: request.requestId,
        providedKey: adminKey ? 'present' : 'missing',
        ip: request.ip
      });

      reply.code(401).send({
        error: "Invalid admin secret key"
      });
      return;
    }

    logger.info("Admin authenticated successfully", {
      requestId: request.requestId,
      ip: request.ip
    });
  };
}

