import { Router } from "express";
import { DaySalesController } from "../controllers/DaySalesController";
import { prisma } from "../prisma";
import { DaySalesRepository } from "../repositories/DaySalesRepository";
import { DaySalesServiceFactory } from "../services/daySales/DaySalesServiceFactory";

export const daySalesRoute = Router();

const daySalesRepository = DaySalesRepository.build(prisma);
const daySalesServiceFactory = DaySalesServiceFactory.build(daySalesRepository);
const daySalesRouteController = DaySalesController.build(
  daySalesServiceFactory
);

daySalesRoute.get("/daySales/:id", (request, response) =>
  daySalesRouteController.list(request, response)
);

daySalesRoute.post("/daySales/write", (request, response) =>
  daySalesRouteController.write(request, response)
);

daySalesRoute.put("/daySales/:id/change", (request, response) =>
  daySalesRouteController.changeDaySales(request, response)
);
daySalesRoute.delete("/daySales/:id/delete", (request, response) =>
  daySalesRouteController.deleteDaySales(request, response)
);
