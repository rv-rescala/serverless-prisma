import { UserController } from "../lambda/controller/user-controller";

const randomString = () => {
  return Math.random().toString(32).substring(2) 
}

describe("insert test", () => {
  test("insert", async () => {
    const controller = new UserController();
    const r = await controller.set(randomString());
    console.log(JSON.stringify(r));
  });
});

describe("select test", () => {
  test("select", async () => {
    const controller = new UserController();
    const r = await controller.get_by_id(1);
    console.log(JSON.stringify(r));
  });
});
