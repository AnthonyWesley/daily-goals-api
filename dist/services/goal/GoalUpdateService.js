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

// src/services/goal/GoalUpdateService.ts
var GoalUpdateService_exports = {};
__export(GoalUpdateService_exports, {
  GoalUpdateService: () => GoalUpdateService
});
module.exports = __toCommonJS(GoalUpdateService_exports);
var GoalUpdateService = class {
  constructor(goalRepository) {
    this.goalRepository = goalRepository;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoalUpdateService
});
