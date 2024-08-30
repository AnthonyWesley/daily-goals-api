import { DaySales, IDaySales } from "../../entities/daySales/DaySales";
import { DaySalesRepository } from "../../repositories/DaySalesRepository";

export class DaySalesCreationService {
  constructor(private readonly daySalesRepository: DaySalesRepository) {}

  async create(day: Date, sales: number, goalId: string): Promise<IDaySales> {
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
}
