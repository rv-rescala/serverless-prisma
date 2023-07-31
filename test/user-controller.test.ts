import { UserController } from "../user/lambda/controller/user-controller";
import {getPrismaClient } from "../serverless-prisma/cdk/lambda/repository/prisma/client"

const randomString = () => {
  return Math.random().toString(32).substring(2) 
}

describe("insert test", () => {
  test("insert", async () => {
    const prismaClient = await getPrismaClient();
    const user = new UserController(prismaClient);
    const r = await user.create(randomString(), randomString(), randomString(), ["ADMIN"]);
    console.log(JSON.stringify(r));
  });
});