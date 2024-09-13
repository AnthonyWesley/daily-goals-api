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

// src/controllers/GoalController.ts
var GoalController_exports = {};
__export(GoalController_exports, {
  GoalController: () => GoalController
});
module.exports = __toCommonJS(GoalController_exports);
var GoalController = class _GoalController {
  constructor(goalServiceFactory) {
    this.goalServiceFactory = goalServiceFactory;
  }
  static build(goalServiceFactory) {
    return new _GoalController(goalServiceFactory);
  }
  async list(request, response) {
    try {
      const ip = request.headers.authorization || request.ip;
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
      const ip = request.headers.authorization || request.ip;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoalController
});
