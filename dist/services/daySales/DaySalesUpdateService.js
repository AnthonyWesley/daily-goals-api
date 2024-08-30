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

// src/services/daySales/DaySalesUpdateService.ts
var DaySalesUpdateService_exports = {};
__export(DaySalesUpdateService_exports, {
  DaySalesUpdateService: () => DaySalesUpdateService
});
module.exports = __toCommonJS(DaySalesUpdateService_exports);
var DaySalesUpdateService = class {
  constructor(daySalesRepository) {
    this.daySalesRepository = daySalesRepository;
  }
  async update(id, day, sales, goalId) {
    if (sales <= 0) {
      throw new Error("Sales amount must be greater than zero");
    }
    const existDaySales = await this.daySalesRepository.findDaySales(id);
    if (!existDaySales) {
      throw new Error("DaySales not found");
    }
    const updatedDaySales = await this.daySalesRepository.changeDaySales(
      existDaySales.id,
      day,
      sales,
      goalId
    );
    return updatedDaySales;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DaySalesUpdateService
});
