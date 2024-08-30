import { Request, Response } from "express";
import { GoalServiceFactory } from "../services/goal/GoalServiceFactory";

export class GoalController {
  constructor(readonly goalServiceFactory: GoalServiceFactory) {}

  public static build(goalServiceFactory: GoalServiceFactory) {
    return new GoalController(goalServiceFactory);
  }

  async list(request: Request, response: Response) {
    try {
      const ip = (request.headers["x-forwarded-for"] as string) || request.ip;
      const taskListing = await this.goalServiceFactory.GoalListingService();
      const tasks = await taskListing.list(ip ?? "");
      return response.status(200).json(tasks);
    } catch (error) {
      console.error("Error listing goals", error);
      return response.status(500).json({ error: "Failed to list goals" });
    }
  }

  async write(request: Request, response: Response) {
    try {
      const ip = (request.headers["x-forwarded-for"] as string) || request.ip;
      const { name, monthlyGoal, workingDays } = request.body;

      const taskCreation = await this.goalServiceFactory.GoalCreationService();
      const task = await taskCreation.create(
        name,
        monthlyGoal,
        workingDays,
        ip ?? ""
      );
      return response.status(201).json(task);
    } catch (error) {
      console.error("Error creating goal", error);
      return response.status(400).json({ error: "Failed to create goal" });
    }
  }

  async changeGoal(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const { name, monthlyGoal, workingDays, totalSales } = request.body;
      const goalUpdate = await this.goalServiceFactory.GoalUpdateService();
      const goal = await goalUpdate.updateGoal(
        id,
        name,
        monthlyGoal,
        workingDays
      );
      return response.status(200).json(goal);
    } catch (error) {
      console.error("Error updating goal", error);
      return response.status(400).json({ error: "Failed to update goal" });
    }
  }

  async deleteGoal(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const goalDeletion = await this.goalServiceFactory.GoalDeleteService();
      await goalDeletion.delete(id);
      return response.status(204).json(`$${id} - Goal deleted`);
    } catch (error) {
      console.error("Error deleting goal", error);
      return response.status(404).json({ error: "Goal not found" });
    }
  }
}
