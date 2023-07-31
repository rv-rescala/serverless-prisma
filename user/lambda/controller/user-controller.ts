import { PrismaClient } from "@prisma/client";

export class UserController {
  constructor(private prismaClient: PrismaClient) { }

  async create(id: string, email: string, username: string, roles: string[]) {
    const r = await this.prismaClient.user.create({
      data: {
        uuid: id,
        email: email,
        username: username,
        roles: roles
      },
    });
    return r;
  }
}