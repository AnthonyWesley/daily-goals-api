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

// src/routes/DaySalesRoute.ts
var DaySalesRoute_exports = {};
__export(DaySalesRoute_exports, {
  daySalesRoute: () => daySalesRoute
});
module.exports = __toCommonJS(DaySalesRoute_exports);
var import_express = require("express");

// src/controllers/DaySalesController.ts
var DaySalesController = class _DaySalesController {
  constructor(daySalesServiceFactory2) {
    this.daySalesServiceFactory = daySalesServiceFactory2;
  }
  static build(daySalesServiceFactory2) {
    return new _DaySalesController(daySalesServiceFactory2);
  }
  async list(request, response) {
    try {
      const { id } = request.params;
      const DaySalesListing = await this.daySalesServiceFactory.DaySalesListingService();
      const DaySales2 = await DaySalesListing.list(id ?? "");
      return response.status(200).json(DaySales2);
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

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/repositories/DaySalesRepository.ts
var DaySalesRepository = class _DaySalesRepository {
  constructor(prisma2) {
    this.prisma = prisma2;
  }
  static build(prisma2) {
    return new _DaySalesRepository(prisma2);
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

// src/entities/daySales/DaySales.ts
var import_ulid = require("ulid");
var DaySales = class _DaySales {
  constructor(props) {
    this.props = props;
  }
  static build(day, sales, goalId) {
    return new _DaySales({
      id: (0, import_ulid.ulid)(),
      day,
      sales,
      goalId
    });
  }
  get id() {
    return this.props.id;
  }
  get day() {
    return this.props.day;
  }
  get sales() {
    return this.props.sales;
  }
  get goalId() {
    return this.props.goalId;
  }
};

// src/services/daySales/DaySalesCreationService.ts
var DaySalesCreationService = class {
  constructor(daySalesRepository2) {
    this.daySalesRepository = daySalesRepository2;
  }
  async create(day, sales, goalId) {
    if (sales <= 0) {
      throw new Error("Sales amount must be greater than zero");
    }
    if (!day) {
      throw new Error("Day must be a valid date");
    }
    const daySales = DaySales.build(day, sales, goalId);
    await this.daySalesRepository.save(daySales);
    return daySales;
  }
};

// src/services/daySales/DaySalesDeletionService.ts
var DaySalesDeletionService = class {
  constructor(daySalesRepository2) {
    this.daySalesRepository = daySalesRepository2;
  }
  async delete(id) {
    const existDaySales = await this.daySalesRepository.findDaySales(id);
    if (!existDaySales) {
      throw new Error("DaySales not found");
    }
    return await this.daySalesRepository.delete(existDaySales.id);
  }
};

// src/services/daySales/DaySalesListingService.ts
var DaySalesListingService = class {
  constructor(daySalesRepository2) {
    this.daySalesRepository = daySalesRepository2;
  }
  async list(ip) {
    const allDaySales = await this.daySalesRepository.getList(ip);
    return allDaySales;
  }
};

// src/services/daySales/DaySalesUpdateService.ts
var DaySalesUpdateService = class {
  constructor(daySalesRepository2) {
    this.daySalesRepository = daySalesRepository2;
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

// src/services/daySales/DaySalesServiceFactory.ts
var DaySalesServiceFactory = class _DaySalesServiceFactory {
  constructor(daySalesRepository2) {
    this.daySalesRepository = daySalesRepository2;
  }
  static build(daySalesRepository2) {
    return new _DaySalesServiceFactory(daySalesRepository2);
  }
  DaySalesListingService() {
    return new DaySalesListingService(this.daySalesRepository);
  }
  DaySalesCreationService() {
    return new DaySalesCreationService(this.daySalesRepository);
  }
  DaySalesUpdateService() {
    return new DaySalesUpdateService(this.daySalesRepository);
  }
  DaySalesDeletionService() {
    return new DaySalesDeletionService(this.daySalesRepository);
  }
};

// src/routes/DaySalesRoute.ts
var daySalesRoute = (0, import_express.Router)();
var daySalesRepository = DaySalesRepository.build(prisma);
var daySalesServiceFactory = DaySalesServiceFactory.build(daySalesRepository);
var daySalesRouteController = DaySalesController.build(
  daySalesServiceFactory
);
daySalesRoute.get(
  "/daySales/:id",
  (request, response) => daySalesRouteController.list(request, response)
);
daySalesRoute.post(
  "/daySales/write",
  (request, response) => daySalesRouteController.write(request, response)
);
daySalesRoute.put(
  "/daySales/:id/change",
  (request, response) => daySalesRouteController.changeDaySales(request, response)
);
daySalesRoute.delete(
  "/daySales/:id/delete",
  (request, response) => daySalesRouteController.deleteDaySales(request, response)
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  daySalesRoute
});
