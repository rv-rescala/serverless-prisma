import {
    Stage,
    StageProps,
} from 'aws-cdk-lib'
import { join } from 'path'
import { kebabCase } from 'scule'
import { PrismaAppSyncStack } from '../stacks/prisma-appsync-stack'
import type { Construct } from 'constructs'
import { AuthorizationType } from 'aws-cdk-lib/aws-appsync'

export class PrismaAppsyncStage extends Stage {

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        new PrismaAppSyncStack(this, kebabCase('backend'), {
            resourcesPrefix: 'backend',
            schema: join(process.cwd(), 'prisma/generated/prisma-appsync/schema.gql'),
            resolvers: join(process.cwd(), 'prisma/generated/prisma-appsync/resolvers.yaml'),
            function: {
                code: join(process.cwd(), 'cdk/lambda/prisma-appsync-handler.ts'),
                memorySize: 512,
                useWarmUp: 0, // useWarmUp > 0 will incur extra costs
                environment: {
                    NODE_ENV: 'production',
                    DATABASE_URL: process.env.DATABASE_URL,
                },
                bundling: {
                    minify: true,
                    sourceMap: true,
                    forceDockerBundling: false,
                    commandHooks: {
                        beforeBundling(inputDir: string, outputDir: string): string[] {
                            const schemaPath = join(process.cwd(), 'prisma/schema.prisma');
                            return [`cp ${schemaPath} ${outputDir}`];
                        },
                        beforeInstall() {
                            return []
                        },
                        afterBundling() {
                            return [
                                'npx prisma generate',
                                'rm -rf generated',

                                // npm + yarn 1.x
                                'rm -rf node_modules/@prisma/engines',
                                'rm -rf node_modules/@prisma/client/node_modules',
                                'rm -rf node_modules/.bin',
                                'rm -rf node_modules/prisma',
                                'rm -rf node_modules/prisma-appsync',
                            ]
                        },
                    },
                    nodeModules: ['prisma', '@prisma/client', 'prisma-appsync'],
                    environment: {
                        NODE_ENV: 'production',
                    },
                },
            },
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: AuthorizationType.API_KEY,
                },
            },
        })
    }
}
