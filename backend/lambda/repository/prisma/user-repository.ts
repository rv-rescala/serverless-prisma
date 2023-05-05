import { PrismaClient, User } from "@prisma/client";

export class PrismaUserRepository {
  constructor(private prismaClient: PrismaClient) {}
  async create(cognitoid: string, username: string, group: string): Promise<User> {
    const r = await this.prismaClient.user.create({
      data: {
        cognitoid: cognitoid,
        username: username,
        group: group
      },
    });
    return r;
  }
  async select_one_by_id(id: number): Promise<User | null> {
    const r = await this.prismaClient.user.findUnique({
      where: {
        id: id,
      },
    });
    return r;
  }
}
