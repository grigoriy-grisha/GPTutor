import { PrismaClient, Usage } from "@prisma/client";

export interface UsageFilters {
  model?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface PaginatedUsageResult {
  usages: Usage[];
  total: number;
  hasMore: boolean;
}

export class UsageRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(data: {
    userId: string;
    model: string;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    cost: number;
    generationId?: string;
    aborted?: boolean;
  }): Promise<Usage> {
    return this.prisma.usage.create({
      data: {
        userId: data.userId,
        model: data.model,
        promptTokens: data.promptTokens,
        completionTokens: data.completionTokens,
        totalTokens: data.totalTokens,
        cost: data.cost,
        generationId: data.generationId,
        aborted: data.aborted ?? false,
      },
    });
  }

  async findByUserId(
    userId: string,
    filters: UsageFilters = {},
    cursor?: string,
    limit: number = 20
  ): Promise<PaginatedUsageResult> {
    const where: any = { userId };

    if (filters.model) {
      where.model = { contains: filters.model };
    }

    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) {
        where.createdAt.gte = filters.startDate;
      }
      if (filters.endDate) {
        where.createdAt.lte = filters.endDate;
      }
    }

    const [usages, total] = await Promise.all([
      this.prisma.usage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit + 1,
        ...(cursor && {
          cursor: { id: cursor },
          skip: 1,
        }),
      }),
      this.prisma.usage.count({ where }),
    ]);

    const hasMore = usages.length > limit;
    if (hasMore) {
      usages.pop();
    }

    return { usages, total, hasMore };
  }

  async getStats(userId: string): Promise<{
    totalCost: number;
    totalTokens: number;
    totalRequests: number;
  }> {
    const result = await this.prisma.usage.aggregate({
      where: { userId },
      _sum: {
        cost: true,
        totalTokens: true,
      },
      _count: true,
    });

    return {
      totalCost: result._sum.cost ?? 0,
      totalTokens: result._sum.totalTokens ?? 0,
      totalRequests: result._count,
    };
  }

  async getModels(userId: string): Promise<string[]> {
    const result = await this.prisma.usage.findMany({
      where: { userId },
      distinct: ["model"],
      select: { model: true },
    });

    return result.map((r) => r.model);
  }
}
