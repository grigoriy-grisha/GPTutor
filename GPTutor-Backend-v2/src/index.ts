import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./repositories/UserRepository";
import { FileRepository } from "./repositories/FileRepository";
import { AuthService } from "./services/AuthService";
import { FilesService } from "./services/FilesService";
import { LLMCostEvaluate } from "./services/LLMCostEvaluate";
import { OpenRouterService } from "./services/OpenRouterService";
import { logger } from "./services/LoggerService";
import { registerControllers } from "./controllers";
import {
  createLoggingMiddleware,
  createErrorLoggingMiddleware,
} from "./middleware/loggingMiddleware";
import { createRateLimitMiddleware, getRateLimitConfig, cleanupRateLimitStore } from "./middleware/rateLimitMiddleware";

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const fileRepository = new FileRepository(prisma);

// VK App credentials
const VK_APP_ID = "51602327";
const VK_SECRET_KEY = "7JnZrfRn0LOp9mN1CHIF";

// OpenRouter credentials
const OPENROUTER_API_KEY =
  "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";

const authService = new AuthService(userRepository, VK_APP_ID, VK_SECRET_KEY);
const filesService = new FilesService();
const llmCostService = new LLMCostEvaluate(90); // 90 рублей за доллар
const openRouterService = new OpenRouterService(OPENROUTER_API_KEY);

const fastify = Fastify({
  logger: true,
  disableRequestLogging: true,
});

fastify.register(require("@fastify/cors"), {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Cache-Control",
    "Pragma",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
});

fastify.register(require("@fastify/helmet"));

// Register rate limiting
fastify.register(require("@fastify/rate-limit"), {
  max: 100, // дефолтный лимит
  timeWindow: 60 * 1000, // 1 минута
  keyGenerator: (request: any) => {
    const ip = request.ip;
    const userId = request.userId || 'anonymous';
    return `rate_limit:${ip}:${userId}`;
  },
  errorResponseBuilder: (request: any, context: any) => {
    return {
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Maximum ${context.max} requests per ${context.timeWindow / 1000} seconds.`,
      retryAfter: Math.ceil(context.after / 1000)
    };
  }
});

// Register multipart support for file uploads
fastify.register(require("@fastify/multipart"), {
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

// Register simple logging
fastify.addHook("preHandler", async (request: any, reply) => {
  request.requestId = require("uuid").v4();
  request.startTime = Date.now();
  logger.apiRequest(request.method, request.url, request.userId, {
    requestId: request.requestId,
    userAgent: request.headers["user-agent"],
    ip: request.ip,
  });
});

fastify.addHook("onResponse", async (request: any, reply) => {
  const duration = Date.now() - (request.startTime || 0);
  logger.apiResponse(
    request.method,
    request.url,
    reply.statusCode,
    duration,
    request.userId,
    {
      requestId: request.requestId,
    }
  );
});

fastify.setErrorHandler(async (error, request: any, reply) => {
  const duration = Date.now() - (request.startTime || 0);
  logger.error(`Request failed: ${request.method} ${request.url}`, error, {
    requestId: request.requestId,
    userId: request.userId,
    duration,
    statusCode: reply.statusCode,
  });
  throw error;
});

// Register all controllers
registerControllers(fastify, {
  authService,
  userRepository,
  fileRepository,
  filesService,
  llmCostService,
  openRouterService,
});

// Rate limiting уже настроен в middleware с автоматической очисткой

const start = async () => {
  try {
    logger.info("Starting GPTutor Backend v2...");

    await llmCostService.initialize();
    logger.info("LLM Cost Service initialized", {
      totalModels: llmCostService.getStats().totalModels,
    });

    await fastify.listen({
      port: Number(process.env.PORT) || 3001,
      host: "0.0.0.0",
    });

    logger.info("🚀 Server is running", {
      port: Number(process.env.PORT) || 3001,
      host: "0.0.0.0",
      environment: process.env.NODE_ENV || "development",
    });
  } catch (err) {
    logger.error("Failed to start server", err);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  logger.info("Received SIGINT, shutting down gracefully...");
  try {
    await fastify.close();
    await prisma.$disconnect();
    logger.info("Server shut down successfully");
    process.exit(0);
  } catch (error) {
    logger.error("Error during shutdown", error);
    process.exit(1);
  }
});

process.on("SIGTERM", async () => {
  logger.info("Received SIGTERM, shutting down gracefully...");
  try {
    await fastify.close();
    await prisma.$disconnect();
    logger.info("Server shut down successfully");
    process.exit(0);
  } catch (error) {
    logger.error("Error during shutdown", error);
    process.exit(1);
  }
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection", reason, { promise });
  process.exit(1);
});

start();
