import { Router } from "express";
import { GoalServiceFactory } from "../services/goal/GoalServiceFactory";
import { GoalController } from "../controllers/GoalController";
import { prisma } from "../prisma";
import { GoalRepository } from "../repositories/GoalRepository";

export const goalRouter = Router();

const goalRepository = GoalRepository.build(prisma);
const goalServiceFactory = GoalServiceFactory.build(goalRepository);
const goalController = GoalController.build(goalServiceFactory);

goalRouter.get("/goal/", (request, response) =>
  goalController.list(request, response)
);

goalRouter.post("/goal/write", (request, response) =>
  goalController.write(request, response)
);

goalRouter.put("/goal/:id/change", (request, response) =>
  goalController.changeGoal(request, response)
);
goalRouter.delete("/goal/:id/delete", (request, response) =>
  goalController.deleteGoal(request, response)
);
