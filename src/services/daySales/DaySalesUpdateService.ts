import { DaySalesRepository } from "../../repositories/DaySalesRepository";

export class DaySalesUpdateService {
  constructor(private readonly daySalesRepository: DaySalesRepository) {}
  async update(id: string, day: Date, sales: number, goalId: string) {
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
}
