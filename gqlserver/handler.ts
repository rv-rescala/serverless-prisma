import type { AppSyncResolverEvent } from '../prisma/generated/prisma-appsync/client'
import { PrismaAppSync, BeforeHookParams } from '../prisma/generated/prisma-appsync/client'

// Lambda handler (AppSync Direct Lambda Resolver)
export const main = async (event: AppSyncResolverEvent<any>) => {
    // Instantiate Prisma-AppSync Client
    const prismaAppSync = new PrismaAppSync({});
    return await prismaAppSync.resolve({
        event,
        hooks: {
            'before:**': async (params: BeforeHookParams) => {
                params.paths
                console.log('before:**:', params.identity);
                console.log('prismaArgs', params.prismaArgs);
                console.log('params.type', params.type);
                return params
            },
            'before:createUser': async (params: BeforeHookParams) => {
                console.log('before:createUser:', params.identity.sub);
                params.prismaArgs.data.id = params.identity.sub;
                return params
            }
        }
    });
}