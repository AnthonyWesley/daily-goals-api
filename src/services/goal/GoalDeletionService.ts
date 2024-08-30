import { GoalRepository } from "../../repositories/GoalRepository";

export class GoalDeletionService {
  constructor(private readonly goalRepository: GoalRepository) {}

  async delete(id: string) {
    const existTask = await this.goalRepository.findGoal(id);
    if (!existTask) {
      throw new Error("Goal not found");
    }
    return await this.goalRepository.delete(existTask.id);
  }
}
