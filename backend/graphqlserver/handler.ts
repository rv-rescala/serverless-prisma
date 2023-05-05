import type { AppSyncResolverEvent } from '../prisma/generated/prisma-appsync/client'
import { PrismaAppSync } from '../prisma/generated/prisma-appsync/client'

// Lambda handler (AppSync Direct Lambda Resolver)
export const main = async (event: AppSyncResolverEvent<any>) => {
    // Instantiate Prisma-AppSync Client
    const prismaAppSync = new PrismaAppSync({ });
    return await prismaAppSync.resolve({ event });
}
