import { IUser, User } from "../../entities/user/User";
import { UserRepository } from "../../repositories/UserRepository";

export class UserListingService {
  constructor(private readonly userRepository: UserRepository) {}

  async list(ip: string): Promise<IUser[]> {
    const findUser = await this.userRepository.findIp(ip);

    if (!findUser || findUser.ip !== ip) {
      const newUser = await User.build(ip);
      await this.userRepository.save(newUser);
    }
    const users = await this.userRepository.getList(ip);

    return users;
  }
}
