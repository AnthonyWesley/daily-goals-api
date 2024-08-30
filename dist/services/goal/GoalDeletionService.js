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

// src/services/goal/GoalDeletionService.ts
var GoalDeletionService_exports = {};
__export(GoalDeletionService_exports, {
  GoalDeletionService: () => GoalDeletionService
});
module.exports = __toCommonJS(GoalDeletionService_exports);
var GoalDeletionService = class {
  constructor(goalRepository) {
    this.goalRepository = goalRepository;
  }
  async delete(id) {
    const existTask = await this.goalRepository.findGoal(id);
    if (!existTask) {
      throw new Error("Goal not found");
    }
    return await this.goalRepository.delete(existTask.id);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoalDeletionService
});
