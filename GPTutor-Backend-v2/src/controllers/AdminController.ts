import { FastifyReply } from 'fastify';
import { BaseController } from './BaseController';
import { UserRepository } from '../repositories/UserRepository';
import { createAdminAuthMiddleware } from '../middleware/adminMiddleware';

export class AdminController extends BaseController {
  private adminAuthMiddleware: any;

  constructor(
    fastify: any,
    private userRepository: UserRepository,
    adminSecretKey: string
  ) {
    super(fastify);
    this.adminAuthMiddleware = createAdminAuthMiddleware(adminSecretKey);
  }

  registerRoutes(): void {
    this.fastify.post(
      '/admin/update-balance',
      { preHandler: this.adminAuthMiddleware },
      this.updateBalance.bind(this)
    );
  }

  private async updateBalance(request: any, reply: FastifyReply) {
    try {
      const { userId, newBalance } = request.body;

      if (!userId) {
        return this.sendValidationError(reply, 'userId is required', request);
      }

      if (typeof newBalance !== 'number' || newBalance < 0) {
        return this.sendValidationError(reply, 'newBalance must be a non-negative number', request);
      }

      let user = await this.userRepository.findById(userId);

      if (!user) {
        user = await this.userRepository.findByVkId(String(userId));
      }

      if (!user) {
        return this.sendNotFound(reply, 'User not found', request);
      }

      const oldBalance = user.balance;
      const updatedUser = await this.userRepository.updateBalance(user.id, newBalance);

      this.logInfo('Admin balance update', {
        userId: user.id,
        vkId: user.vkId,
        oldBalance,
        newBalance,
        ip: request.ip
      }, request);

      return this.sendSuccess(reply, {
        message: 'Balance updated successfully',
        user: {
          id: updatedUser.id,
          balance: updatedUser.balance,
          updatedAt: updatedUser.updatedAt
        }
      });
    } catch (error) {
      this.logError('Failed to update balance', error, {}, request);
      return this.sendError(
        reply,
        error instanceof Error ? error.message : 'Failed to update balance',
        500,
        request
      );
    }
  }
}

