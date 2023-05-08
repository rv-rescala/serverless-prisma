import { parseRowSql } from "../tool/parseRowSql";
import { PrismaClient } from "@prisma/client";

export class RootController {
    async execute_sql(prismaClient: PrismaClient, rowSql: string) {
        try {
            const sqls = parseRowSql(rowSql);
            for (const sql of sqls) {
                console.log(sql);
                await prismaClient.$executeRawUnsafe(sql);
            }
        } catch (e: any) {
            console.log(e);
        }
    }
}