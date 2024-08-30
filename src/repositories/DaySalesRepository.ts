import { PrismaClient } from "@prisma/client";
import { IDaySales } from "../entities/daySales/DaySales";

export class DaySalesRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new DaySalesRepository(prisma);
  }

  async findDaySales(id: string) {
    return await this.prisma.daySale.findFirst({ where: { id } });
  }

  async save(daySales: IDaySales) {
    const data = {
      id: daySales.id,
      day: daySales.day,
      sales: daySales.sales,
      goalId: daySales.goalId,
    };

    await this.prisma.daySale.create({ data });
  }

  async getList(ip: string) {
    return await this.prisma.daySale.findMany({
      where: { goalId: ip },
    });
  }

  async changeDaySales(id: string, day: Date, sales: number, goalId: string) {
    const changeDaySales = this.prisma.daySale.update({
      where: { id: id },
      data: { day, sales, goalId },
    });
    return changeDaySales;
  }

  async delete(id: string) {
    const deletedDaySales = this.prisma.daySale.delete({
      where: { id: id },
    });
    return deletedDaySales;
  }
}
