import { PrismaClient } from "@prisma/client";
import { IUser } from "../entities/user/User";

export class UserRepository {
  constructor(readonly prisma: PrismaClient) {}

  static build(prisma: PrismaClient) {
    return new UserRepository(prisma);
  }

  async findIp(ip: string) {
    return await this.prisma.user.findFirst({ where: { ip } });
  }

  async save(user: IUser) {
    const data = {
      ip: user.ip,
    };

    await this.prisma.user.create({ data });
  }

  async getList(ip: string) {
    return await this.prisma.user.findMany();
  }
}
