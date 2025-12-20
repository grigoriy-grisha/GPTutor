import { FastifyInstance } from 'fastify';
import { HealthController } from './HealthController';
import { AuthController } from './AuthController';
import { CompletionController } from './CompletionController';
import { ModelsController } from './ModelsController';
import { FilesController } from './FilesController';
import { PaymentController } from './PaymentController';
import { AdminController } from './AdminController';
import { UsageController } from './UsageController';
import { AuthService } from '../services/AuthService';
import { UserRepository } from '../repositories/UserRepository';
import { FileRepository } from '../repositories/FileRepository';
import { UsageRepository } from '../repositories/UsageRepository';
import { LLMCostEvaluate } from '../services/LLMCostEvaluate';
import { OpenRouterService } from '../services/OpenRouterService';
import { FilesService } from '../services/FilesService';
import { YooKassaService } from '../services/YooKassaService';

export function registerControllers(
  fastify: FastifyInstance,
  dependencies: {
    authService: AuthService;
    userRepository: UserRepository;
    fileRepository: FileRepository;
    usageRepository: UsageRepository;
    filesService: FilesService;
    llmCostService: LLMCostEvaluate;
    openRouterService: OpenRouterService;
    yooKassaService: YooKassaService;
    adminSecretKey: string;
  }
) {
  const controllers = [
    new HealthController(fastify),
    new AuthController(fastify, dependencies.authService),
    new CompletionController(
      fastify,
      dependencies.userRepository,
      dependencies.usageRepository,
      dependencies.llmCostService,
      dependencies.openRouterService
    ),
    new ModelsController(
      fastify,
      dependencies.llmCostService
    ),
    new FilesController(
      fastify,
      dependencies.filesService,
      dependencies.fileRepository,
      dependencies.authService
    ),
    new PaymentController(
      fastify,
      dependencies.yooKassaService,
      dependencies.authService
    ),
    new AdminController(
      fastify,
      dependencies.userRepository,
      dependencies.adminSecretKey
    ),
    new UsageController(
      fastify,
      dependencies.usageRepository,
      dependencies.authService
    ),
  ];

  controllers.forEach(controller => controller.registerRoutes());
}

export * from './BaseController';
export * from './HealthController';
export * from './AuthController';
export * from './CompletionController';
export * from './ModelsController';
export * from './FilesController';
export * from './PaymentController';
export * from './AdminController';
export * from './UsageController';
