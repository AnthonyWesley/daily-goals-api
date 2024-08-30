import { IGoal } from "../../entities/goals/Goal";
import { GoalRepository } from "../../repositories/GoalRepository";

export class GoalListingService {
  constructor(private readonly goalRepository: GoalRepository) {}

  async list(ip: string): Promise<IGoal[]> {
    const goals = await this.goalRepository.getList(ip);
    return goals;
  }
}
