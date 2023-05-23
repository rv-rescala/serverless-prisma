import { PrismaClient } from "@prisma/client";

export class UserController {
  constructor(private prismaClient: PrismaClient) { }

  async create(id: string, email: string, fullname: string, groups: string[]) {
    const r = await this.prismaClient.user.create({
      data: {
        id: id,
        email: email,
        fullname: fullname,
        groups: groups
      },
    });
    return r;
  }
}