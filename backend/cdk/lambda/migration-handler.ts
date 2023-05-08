import { RootController } from "./controller/root-controller";
import { getPrismaClient } from "./repository/prisma/client";
import * as fs from 'fs';
import * as path from 'path';

export async function main() {

  console.log("event: ", JSON.stringify(process.env));
  const prismaClient = await getPrismaClient(true);
  let fileContent = '';
  try {
    const filePath = path.join(__dirname, 'migration.sql');
    console.log("filePath: ", filePath);
    fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log("fileContent: ", fileContent);
  } catch (error) {
    console.error('Error reading file:', error);
  }

  const controller = new RootController();
  await controller.execute_sql(prismaClient, fileContent);
}