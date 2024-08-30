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

// src/repositories/DaySalesRepository.ts
var DaySalesRepository_exports = {};
__export(DaySalesRepository_exports, {
  DaySalesRepository: () => DaySalesRepository
});
module.exports = __toCommonJS(DaySalesRepository_exports);
var DaySalesRepository = class _DaySalesRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  static build(prisma) {
    return new _DaySalesRepository(prisma);
  }
  async findDaySales(id) {
    return await this.prisma.daySale.findFirst({ where: { id } });
  }
  async save(daySales) {
    const data = {
      id: daySales.id,
      day: daySales.day,
      sales: daySales.sales,
      goalId: daySales.goalId
    };
    await this.prisma.daySale.create({ data });
  }
  async getList(ip) {
    return await this.prisma.daySale.findMany({
      where: { goalId: ip }
    });
  }
  async changeDaySales(id, day, sales, goalId) {
    const changeDaySales = this.prisma.daySale.update({
      where: { id },
      data: { day, sales, goalId }
    });
    return changeDaySales;
  }
  async delete(id) {
    const deletedDaySales = this.prisma.daySale.delete({
      where: { id }
    });
    return deletedDaySales;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DaySalesRepository
});
