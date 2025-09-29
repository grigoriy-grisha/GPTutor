import { FastifyRequest, FastifyReply } from 'fastify';
import { BaseController } from './BaseController';
import { AuthService } from '../services/AuthService';
import { createVkAuthMiddleware } from '../middleware/authMiddleware';
import { RequestWithLogging } from '../middleware/loggingMiddleware';
import { createRateLimitMiddleware, getRateLimitConfig } from '../middleware/rateLimitMiddleware';

interface AuthenticatedRequest extends RequestWithLogging {
  vkUser: any;
  dbUser: any;
}

export class AuthController extends BaseController {
  constructor(
    fastify: any,
    private authService: AuthService
  ) {
    super(fastify);
  }

  registerRoutes(): void {
    const vkAuthMiddleware = createVkAuthMiddleware(this.authService);
    
    const vkTestRateLimit = createRateLimitMiddleware(getRateLimitConfig('/vk-test')!);
    
    const updateTokenRateLimit = createRateLimitMiddleware(getRateLimitConfig('/update-token')!);
    
    this.fastify.get(
      '/vk-test',
      { 
        preHandler: [vkTestRateLimit, vkAuthMiddleware] as any 
      },
      this.vkTest.bind(this)
    );

    this.fastify.post(
      '/update-token',
      { 
        preHandler: [updateTokenRateLimit, vkAuthMiddleware] as any
      },
      this.updateToken.bind(this)
    );
  }

  private async vkTest(request: any, reply: FastifyReply) {
    this.logInfo('VK test endpoint accessed', {
      vkId: request.dbUser.vkId,
      balance: request.dbUser.balance
    }, request);

    return this.sendSuccess(reply, {
      message: "VK authorization successful!",
      vkData: request.vkUser,
      dbUser: {
        id: request.dbUser.id,
        vkId: request.dbUser.vkId,
        balance: request.dbUser.balance,
        apiKey: request.dbUser.apiKey,
        isActive: request.dbUser.isActive,
        createdAt: request.dbUser.createdAt,
        updatedAt: request.dbUser.updatedAt,
      },
      timestamp: new Date().toISOString(),
    });
  }

  private async updateToken(request: any, reply: FastifyReply) {
    try {
      this.logInfo('Token update requested', {
        userId: request.dbUser.id,
        vkId: request.dbUser.vkId
      }, request);

      const updatedUser = await this.authService.updateUserToken(request.dbUser.id);

      this.logInfo('Token updated successfully', {
        userId: updatedUser.id,
        newApiKey: updatedUser.apiKey.substring(0, 10) + '...'
      }, request);

      return this.sendSuccess(reply, {
        message: "API token updated successfully!",
        newApiKey: updatedUser.apiKey,
        user: {
          id: updatedUser.id,
          vkId: updatedUser.vkId,
          balance: updatedUser.balance,
          isActive: updatedUser.isActive,
          updatedAt: updatedUser.updatedAt,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logError('Token update failed', error, request);
      return this.sendError(reply, 'Failed to update token', 500);
    }
  }
}
