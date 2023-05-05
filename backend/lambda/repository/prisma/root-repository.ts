import { PrismaClient } from "@prisma/client";

export interface InfPrismaRepository {
    exec_sql(sql: string): Promise<void>;
}

export class PrismaRootRepository implements InfPrismaRepository {
  constructor(private prismaClient: PrismaClient) {}
  async exec_sql(sql: string){
    await this.prismaClient.$executeRawUnsafe(sql);
  }
}
