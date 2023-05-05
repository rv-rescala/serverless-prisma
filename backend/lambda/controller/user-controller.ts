import { PrismaUserRepository } from "../repository/prisma/user-repository";
import { getPrismaClient } from "../repository/prisma/client";

export class UserController {
  async get_by_id(id: number) {
    try {
      const repository = new PrismaUserRepository(await getPrismaClient());
      const result = await repository.select_one_by_id(id);
      return result;
    } catch (e: any) {
      console.log(e);
    }
  }
  
  async create(cognitoid: string, username: string, group: string) {
    try {
      const repository = new PrismaUserRepository(await getPrismaClient());
      const r = await repository.create(cognitoid, username, group);
      return r;
    } catch (e: any) {
      console.log(e);
    }
  }
}
