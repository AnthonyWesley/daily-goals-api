import { GoalRepository } from "../../repositories/GoalRepository";

export class GoalUpdateService {
  constructor(private readonly goalRepository: GoalRepository) {}
  async updateGoal(
    id: string,
    name: string,
    monthlyGoal: number,
    workingDays: number
  ) {
    if (name.length < 3) {
      throw new Error("Name must be at least 3 characters long");
    }
    const existGoal = await this.goalRepository.findGoal(id);
    if (!existGoal) {
      throw new Error("Goal not found");
    }
    const updatedGoal = await this.goalRepository.changeGoal(
      existGoal.id,
      name,
      monthlyGoal,
      workingDays
    );
    return updatedGoal;
  }
}
