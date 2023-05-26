import { PrismaAppSync, BeforeHookParams, AfterHookParams } from '../../serverless-prisma/prisma/generated/prisma-appsync/client'

export const hooks = {
    'before:**': async (params: BeforeHookParams) => {
        return params
    }
}