import { PrismaClient, Payment } from "@prisma/client";

export class PaymentRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: {
    userId: string;
    yookassaId: string;
    amount: number;
    currency?: string;
    description?: string;
    confirmationUrl?: string;
    status?: string;
  }): Promise<Payment> {
    return this.prisma.payment.create({
      data,
    });
  }

  async findByYookassaId(yookassaId: string): Promise<Payment | null> {
    return this.prisma.payment.findUnique({
      where: { yookassaId },
    });
  }

  async findById(id: string): Promise<Payment | null> {
    return this.prisma.payment.findUnique({
      where: { id },
    });
  }

  async updateStatus(yookassaId: string, status: string): Promise<Payment> {
    return this.prisma.payment.update({
      where: { yookassaId },
      data: { status },
    });
  }

  async findByUserId(userId: string): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}
