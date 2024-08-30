// import { Goals, IGoals } from "../../entities/goals/Goal";
import { IUser, User } from "../../entities/user/User";
import { UserRepository } from "../../repositories/UserRepository";

export class UserCreationService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(ip: string): Promise<any> {
    const findUser = await this.userRepository.findIp(ip);

    if (!findUser || findUser.ip !== ip) {
      const newUser = await User.build(ip);
      await this.userRepository.save(newUser);
    }
    const user = await this.userRepository.findIp(ip);

    return user;
  }
}
