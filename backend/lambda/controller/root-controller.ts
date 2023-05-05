import { PrismaRootRepository } from "../repository/prisma/root-repository";
import { getPrismaClient } from "../repository/prisma/client";
import { parseRowSql } from "../tool/parseRowSQL";

export class RootController {
  async execute(rowSql: string) {
    try {
      const repository = new PrismaRootRepository(await getPrismaClient(true));
      const sqls = parseRowSql(rowSql);

      // TBD: read from AWS Systems Manager パラメータストア
      /*
      const sqls = [
        `CREATE SCHEMA ${schema_name};`,
        `SET search_path TO ${schema_name};`,
          `CREATE TABLE "User" (
            "id" SERIAL NOT NULL,
            "username" TEXT NOT NULL,
            "password" TEXT,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL,
        
            CONSTRAINT "User_pkey" PRIMARY KEY ("id")
        );`,
        `-- CreateTable
        CREATE TABLE "UserInfo" (
            "id" SERIAL NOT NULL,
            "status" TEXT,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL,
        
            CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
        );`,
      `CREATE UNIQUE INDEX "User_username_key" ON "User"("username");`,
      `ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;`   
      ];
      */

      for (const sql of sqls) {
        console.log(sql);
        await repository.exec_sql(sql);
      }
    } catch (e: any) {
      console.log(e);
    }
  }
}
