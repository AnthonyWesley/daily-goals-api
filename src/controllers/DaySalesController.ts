import { Request, Response } from "express";
import { DaySalesServiceFactory } from "../services/daySales/DaySalesServiceFactory";

export class DaySalesController {
  constructor(readonly daySalesServiceFactory: DaySalesServiceFactory) {}

  public static build(daySalesServiceFactory: DaySalesServiceFactory) {
    return new DaySalesController(daySalesServiceFactory);
  }

  async list(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const DaySalesListing =
        await this.daySalesServiceFactory.DaySalesListingService();
      const DaySales = await DaySalesListing.list(id ?? "");
      return response.status(200).json(DaySales);
    } catch (error) {
      console.error("Error listing DaySales", error);
      return response.status(500).json({ error: "Failed to list daySales" });
    }
  }

  async write(request: Request, response: Response) {
    try {
      const clientIp = request.ip;
      const { day, sales, goalId } = request.body;
      const daySalesCreation =
        await this.daySalesServiceFactory.DaySalesCreationService();
      const daySales = await daySalesCreation.create(day, sales, goalId ?? "");
      return response.status(201).json(daySales);
    } catch (error) {
      console.error("Error creating daySales", error);
      return response.status(400).json({ error: "Failed to create daySales" });
    }
  }

  async changeDaySales(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { day, sales, goalId } = request.body;
      const daySalesUpdate =
        await this.daySalesServiceFactory.DaySalesUpdateService();
      const daySales = await daySalesUpdate.update(id, day, sales, goalId);
      return response.status(200).json(daySales);
    } catch (error) {
      console.error("Error updating daySales", error);
      return response.status(400).json({ error: "Failed to update daySales" });
    }
  }

  async deleteDaySales(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const daySalesDeletion =
        await this.daySalesServiceFactory.DaySalesDeletionService();
      await daySalesDeletion.delete(id);
      return response.status(204).json(`$${id} - DaySales deleted`);
    } catch (error) {
      console.error("Error deleting daySales", error);
      return response.status(404).json({ error: "DaySales not found" });
    }
  }
}
