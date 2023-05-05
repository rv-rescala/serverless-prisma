
import { RootController } from "../lambda/controller/root-controller";

describe("schema test", () => {
  test("schema", async () => {
    const controller = new RootController();
    await controller.create_schema("prisma_cdk");
  });
});