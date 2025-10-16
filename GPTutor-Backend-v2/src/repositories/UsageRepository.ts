import { PrismaClient, Usage } from "@prisma/client";

export interface UsageData {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
  originalCostUsd?: number;
}

export interface CreateUsageData {
  userId: string;
  costRub: number;
  usage: UsageData;
  model: string;
  date?: Date;
}

export class UsageRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: CreateUsageData): Promise<Usage> {
    return this.prisma.usage.create({
      data: {
        userId: data.userId,
        costRub: data.costRub,
        usage: JSON.stringify(data.usage),
        model: data.model,
        date: data.date || new Date(),
      },
    });
  }
}


