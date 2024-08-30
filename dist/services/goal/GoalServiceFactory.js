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

// src/services/goal/GoalServiceFactory.ts
var GoalServiceFactory_exports = {};
__export(GoalServiceFactory_exports, {
  GoalServiceFactory: () => GoalServiceFactory
});
module.exports = __toCommonJS(GoalServiceFactory_exports);

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

// src/services/goal/GoalDeletionService.ts
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

// src/services/goal/GoalListingService.ts
var GoalListingService = class {
  constructor(goalRepository) {
    this.goalRepository = goalRepository;
  }
  async list(ip) {
    const goals = await this.goalRepository.getList(ip);
    return goals;
  }
};

// src/services/goal/GoalUpdateService.ts
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

// src/services/goal/GoalServiceFactory.ts
var GoalServiceFactory = class _GoalServiceFactory {
  constructor(goalRepository) {
    this.goalRepository = goalRepository;
  }
  static build(goalRepository) {
    return new _GoalServiceFactory(goalRepository);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoalServiceFactory
});
