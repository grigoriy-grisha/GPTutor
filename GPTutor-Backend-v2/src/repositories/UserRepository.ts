import { PrismaClient, User } from "@prisma/client";
import { randomBytes } from "crypto";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private generateApiKey(): string {
    // Generate a random string similar to OpenAI API keys
    // Format: sk- + 48 characters (mix of letters and numbers)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'sk-';
    
    // Generate 48 random characters
    for (let i = 0; i < 48; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
  }

  async findByVkId(vkId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { vkId },
    });
  }

  async create(data: {
    vkId: string;
    balance?: number;
    isActive?: boolean;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        vkId: data.vkId,
        balance: data.balance ?? 0.0,
        isActive: data.isActive ?? true,
        apiKey: this.generateApiKey(),
      },
    });
  }

  async findByApiKey(apiKey: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { apiKey },
    });
  }

  async updateBalance(userId: string, newBalance: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { balance: newBalance },
    });
  }

  async decreaseBalance(userId: string, amount: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const newBalance = user.balance - amount * 2;
    if (newBalance < 0) {
      throw new Error("Insufficient balance");
    }

    return this.updateBalance(userId, newBalance);
  }

  async updateApiKey(userId: string): Promise<User> {
    const newApiKey = this.generateApiKey();
    return this.prisma.user.update({
      where: { id: userId },
      data: { apiKey: newApiKey },
    });
  }
}
