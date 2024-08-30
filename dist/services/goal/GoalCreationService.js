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

// src/services/goal/GoalCreationService.ts
var GoalCreationService_exports = {};
__export(GoalCreationService_exports, {
  GoalCreationService: () => GoalCreationService
});
module.exports = __toCommonJS(GoalCreationService_exports);

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
  constructor(goalRepository) {
    this.goalRepository = goalRepository;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoalCreationService
});
