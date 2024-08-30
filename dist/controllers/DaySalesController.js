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

// src/controllers/DaySalesController.ts
var DaySalesController_exports = {};
__export(DaySalesController_exports, {
  DaySalesController: () => DaySalesController
});
module.exports = __toCommonJS(DaySalesController_exports);
var DaySalesController = class _DaySalesController {
  constructor(daySalesServiceFactory) {
    this.daySalesServiceFactory = daySalesServiceFactory;
  }
  static build(daySalesServiceFactory) {
    return new _DaySalesController(daySalesServiceFactory);
  }
  async list(request, response) {
    try {
      const { id } = request.params;
      const DaySalesListing = await this.daySalesServiceFactory.DaySalesListingService();
      const DaySales = await DaySalesListing.list(id ?? "");
      return response.status(200).json(DaySales);
    } catch (error) {
      console.error("Error listing DaySales", error);
      return response.status(500).json({ error: "Failed to list daySales" });
    }
  }
  async write(request, response) {
    try {
      const clientIp = request.ip;
      const { day, sales, goalId } = request.body;
      const daySalesCreation = await this.daySalesServiceFactory.DaySalesCreationService();
      const daySales = await daySalesCreation.create(day, sales, goalId ?? "");
      return response.status(201).json(daySales);
    } catch (error) {
      console.error("Error creating daySales", error);
      return response.status(400).json({ error: "Failed to create daySales" });
    }
  }
  async changeDaySales(request, response) {
    try {
      const { id } = request.params;
      const { day, sales, goalId } = request.body;
      const daySalesUpdate = await this.daySalesServiceFactory.DaySalesUpdateService();
      const daySales = await daySalesUpdate.update(id, day, sales, goalId);
      return response.status(200).json(daySales);
    } catch (error) {
      console.error("Error updating daySales", error);
      return response.status(400).json({ error: "Failed to update daySales" });
    }
  }
  async deleteDaySales(request, response) {
    try {
      const { id } = request.params;
      const daySalesDeletion = await this.daySalesServiceFactory.DaySalesDeletionService();
      await daySalesDeletion.delete(id);
      return response.status(204).json(`$${id} - DaySales deleted`);
    } catch (error) {
      console.error("Error deleting daySales", error);
      return response.status(404).json({ error: "DaySales not found" });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DaySalesController
});
