import { PrismaAppSync, BeforeHookParams, AfterHookParams } from '../../prisma/generated/prisma-appsync/client'

export const hooks = {
    'before:**': async (params: BeforeHookParams) => {
        return params
    }
}