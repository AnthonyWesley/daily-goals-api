import { IDaySales } from "../../entities/daySales/DaySales";
import { IGoal } from "../../entities/goals/Goal";
import { DaySalesRepository } from "../../repositories/DaySalesRepository";

export class DaySalesListingService {
  constructor(private readonly daySalesRepository: DaySalesRepository) {}

  async list(ip: string): Promise<IDaySales[]> {
    const allDaySales = await this.daySalesRepository.getList(ip);
    return allDaySales;
  }
}
