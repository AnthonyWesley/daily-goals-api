"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/GoalRoute.ts
var GoalRoute_exports = {};
__export(GoalRoute_exports, {
  goalRouter: () => goalRouter
});
module.exports = __toCommonJS(GoalRoute_exports);
var import_express = require("express");

// src/entities/goals/Goal.ts
var import_ulid = require("ulid");
var Goal = class _Goal {
  constructor(props) {
    this.props = props;
  }
  static build(name, monthlyGoal, workingDays, userIp) {
    return new _Goal({
      id: (0, import_ulid.ulid)(),
      name,
      monthlyGoal,
      workingDays,
      userIp
    });
  }
  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get monthlyGoal() {
    return this.props.monthlyGoal;
  }
  get workingDays() {
    return this.props.workingDays;
  }
  get userIp() {
    return this.props.userIp;
  }
};

// src/services/goal/GoalCreationService.ts
var GoalCreationService = class {
  constructor(goalRepository2) {
    this.goalRepository = goalRepository2;
  }
  async create(name, monthlyGoal, workingDays, userIp) {
    if (name.length < 3) {
      throw new Error("Name must be at least 3 characters long");
    }
    const task = Goal.build(name, monthlyGoal, workingDays, userIp);
    await this.goalRepository.save(task);
    return task;
  }
};

// src/services/goal/GoalDeletionService.ts
var GoalDeletionService = class {
  constructor(goalRepository2) {
    this.goalRepository = goalRepository2;
  }
  async delete(id) {
    const existTask = await this.goalRepository.findGoal(id);
    if (!existTask) {
      throw new Error("Goal not found");
    }
    return await this.goalRepository.delete(existTask.id);
  }
};

// src/services/goal/GoalListingService.ts
var GoalListingService = class {
  constructor(goalRepository2) {
    this.goalRepository = goalRepository2;
  }
  async list(ip) {
    const goals = await this.goalRepository.getList(ip);
    return goals;
  }
};

// src/services/goal/GoalUpdateService.ts
var GoalUpdateService = class {
  constructor(goalRepository2) {
    this.goalRepository = goalRepository2;
  }
  async updateGoal(id, name, monthlyGoal, workingDays) {
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
};

// src/services/goal/GoalServiceFactory.ts
var GoalServiceFactory = class _GoalServiceFactory {
  constructor(goalRepository2) {
    this.goalRepository = goalRepository2;
  }
  static build(goalRepository2) {
    return new _GoalServiceFactory(goalRepository2);
  }
  GoalListingService() {
    return new GoalListingService(this.goalRepository);
  }
  GoalCreationService() {
    return new GoalCreationService(this.goalRepository);
  }
  GoalUpdateService() {
    return new GoalUpdateService(this.goalRepository);
  }
  GoalDeleteService() {
    return new GoalDeletionService(this.goalRepository);
  }
};

// src/controllers/GoalController.ts
var GoalController = class _GoalController {
  constructor(goalServiceFactory2) {
    this.goalServiceFactory = goalServiceFactory2;
  }
  static build(goalServiceFactory2) {
    return new _GoalController(goalServiceFactory2);
  }
  async list(request, response) {
    try {
      const ip = request.headers["x-forwarded-for"] || request.ip;
      const taskListing = await this.goalServiceFactory.GoalListingService();
      const tasks = await taskListing.list(ip ?? "");
      return response.status(200).json(tasks);
    } catch (error) {
      console.error("Error listing goals", error);
      return response.status(500).json({ error: "Failed to list goals" });
    }
  }
  async write(request, response) {
    try {
      const ip = request.headers["x-forwarded-for"] || request.ip;
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
  async changeGoal(request, response) {
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
  async deleteGoal(request, response) {
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
};

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/repositories/GoalRepository.ts
var GoalRepository = class _GoalRepository {
  constructor(prisma2) {
    this.prisma = prisma2;
  }
  static build(prisma2) {
    return new _GoalRepository(prisma2);
  }
  async findGoal(id) {
    return await this.prisma.goal.findFirst({ where: { id } });
  }
  async save(goal) {
    const data = {
      id: goal.id,
      name: goal.name,
      monthlyGoal: goal.monthlyGoal,
      workingDays: goal.workingDays,
      userIp: goal.userIp
    };
    await this.prisma.goal.create({ data });
  }
  async getList(ip) {
    return await this.prisma.goal.findMany({
      where: { userIp: ip }
    });
  }
  async changeGoal(id, name, monthlyGoal, workingDays) {
    const changeGoal = this.prisma.goal.update({
      where: { id },
      data: { name, monthlyGoal, workingDays }
    });
    return changeGoal;
  }
  async delete(id) {
    const deletedGoal = this.prisma.goal.delete({
      where: { id }
    });
    return deletedGoal;
  }
};

// src/routes/GoalRoute.ts
var goalRouter = (0, import_express.Router)();
var goalRepository = GoalRepository.build(prisma);
var goalServiceFactory = GoalServiceFactory.build(goalRepository);
var goalController = GoalController.build(goalServiceFactory);
goalRouter.get(
  "/goal/",
  (request, response) => goalController.list(request, response)
);
goalRouter.post(
  "/goal/write",
  (request, response) => goalController.write(request, response)
);
goalRouter.put(
  "/goal/:id/change",
  (request, response) => goalController.changeGoal(request, response)
);
goalRouter.delete(
  "/goal/:id/delete",
  (request, response) => goalController.deleteGoal(request, response)
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  goalRouter
});
