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

// src/repositories/GoalRepository.ts
var GoalRepository_exports = {};
__export(GoalRepository_exports, {
  GoalRepository: () => GoalRepository
});
module.exports = __toCommonJS(GoalRepository_exports);
var GoalRepository = class _GoalRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  static build(prisma) {
    return new _GoalRepository(prisma);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoalRepository
});
