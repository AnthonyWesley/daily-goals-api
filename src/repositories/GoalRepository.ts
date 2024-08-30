import { PrismaClient } from "@prisma/client";
import { IGoal } from "../entities/goals/Goal";

export class GoalRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new GoalRepository(prisma);
  }

  async findGoal(id: string) {
    return await this.prisma.goal.findFirst({ where: { id } });
  }

  async save(goal: IGoal) {
    const data = {
      id: goal.id,
      name: goal.name,
      monthlyGoal: goal.monthlyGoal,
      workingDays: goal.workingDays,
      userIp: goal.userIp,
    };

    await this.prisma.goal.create({ data });
  }

  async getList(ip: string) {
    return await this.prisma.goal.findMany({
      where: { userIp: ip },
    });
  }

  async changeGoal(
    id: string,
    name: string,
    monthlyGoal: number,
    workingDays: number
  ) {
    const changeGoal = this.prisma.goal.update({
      where: { id: id },
      data: { name, monthlyGoal, workingDays },
    });
    return changeGoal;
  }

  async delete(id: string) {
    const deletedGoal = this.prisma.goal.delete({
      where: { id: id },
    });
    return deletedGoal;
  }
}
