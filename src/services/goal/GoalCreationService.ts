// import { Goals, IGoals } from "../../entities/goals/Goal";
import { IGoal, Goal } from "../../entities/goals/Goal";
import { GoalRepository } from "../../repositories/GoalRepository";

export class GoalCreationService {
  constructor(private readonly goalRepository: GoalRepository) {}

  async create(
    name: string,
    monthlyGoal: number,
    workingDays: number,
    userIp: string
  ): Promise<IGoal> {
    if (name.length < 3) {
      throw new Error("Name must be at least 3 characters long");
    }

    const task = Goal.build(name, monthlyGoal, workingDays, userIp);

    await this.goalRepository.save(task);
    return task;
  }
}
