import { DaySalesRepository } from "../../repositories/DaySalesRepository";
import { DaySalesCreationService } from "./DaySalesCreationService";
import { DaySalesDeletionService } from "./DaySalesDeletionService";
import { DaySalesListingService } from "./DaySalesListingService";
import { DaySalesUpdateService } from "./DaySalesUpdateService";

export class DaySalesServiceFactory {
  private constructor(
    private readonly daySalesRepository: DaySalesRepository
  ) {}

  public static build(
    daySalesRepository: DaySalesRepository
  ): DaySalesServiceFactory {
    return new DaySalesServiceFactory(daySalesRepository);
  }

  DaySalesListingService(): DaySalesListingService {
    return new DaySalesListingService(this.daySalesRepository);
  }

  DaySalesCreationService(): DaySalesCreationService {
    return new DaySalesCreationService(this.daySalesRepository);
  }

  DaySalesUpdateService(): DaySalesUpdateService {
    return new DaySalesUpdateService(this.daySalesRepository);
  }

  DaySalesDeletionService(): DaySalesDeletionService {
    return new DaySalesDeletionService(this.daySalesRepository);
  }
}
