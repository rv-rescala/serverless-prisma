import type { AppSyncResolverEvent } from '../prisma/generated/prisma-appsync/client'
import { PrismaAppSync, BeforeHookParams } from '../prisma/generated/prisma-appsync/client'
import { hooks } from '../user/lambda/hooks';

// Lambda handler (AppSync Direct Lambda Resolver)
export const main = async (event: AppSyncResolverEvent<any>) => {
    // Instantiate Prisma-AppSync Client
    const prismaAppSync = new PrismaAppSync({ maxDepth: 10 });
    return await prismaAppSync.resolve({
        event,
        hooks: hooks
    });
}