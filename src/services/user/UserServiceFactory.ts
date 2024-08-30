import { UserRepository } from "../../repositories/UserRepository";

import { UserCreationService } from "./UserCreationService";
import { UserListingService } from "./UserListingService";

export class UserServiceFactory {
  private constructor(private readonly userRepository: UserRepository) {}

  public static build(userRepository: UserRepository): UserServiceFactory {
    return new UserServiceFactory(userRepository);
  }

  UserListingService(): UserListingService {
    return new UserListingService(this.userRepository);
  }

  UserCreationService(): UserCreationService {
    return new UserCreationService(this.userRepository);
  }
}
