import { GoalRepository } from "../../repositories/GoalRepository";
import { GoalCreationService } from "./GoalCreationService";
import { GoalDeletionService } from "./GoalDeletionService";
import { GoalListingService } from "./GoalListingService";
import { GoalUpdateService } from "./GoalUpdateService";

export class GoalServiceFactory {
  private constructor(private readonly goalRepository: GoalRepository) {}

  public static build(goalRepository: GoalRepository): GoalServiceFactory {
    return new GoalServiceFactory(goalRepository);
  }

  GoalListingService(): GoalListingService {
    return new GoalListingService(this.goalRepository);
  }

  GoalCreationService(): GoalCreationService {
    return new GoalCreationService(this.goalRepository);
  }

  GoalUpdateService(): GoalUpdateService {
    return new GoalUpdateService(this.goalRepository);
  }

  GoalDeleteService(): GoalDeletionService {
    return new GoalDeletionService(this.goalRepository);
  }
}
