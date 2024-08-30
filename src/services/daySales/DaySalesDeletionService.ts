import { DaySalesRepository } from "../../repositories/DaySalesRepository";

export class DaySalesDeletionService {
  constructor(private readonly daySalesRepository: DaySalesRepository) {}

  async delete(id: string) {
    const existDaySales = await this.daySalesRepository.findDaySales(id);
    if (!existDaySales) {
      throw new Error("DaySales not found");
    }
    return await this.daySalesRepository.delete(existDaySales.id);
  }
}
