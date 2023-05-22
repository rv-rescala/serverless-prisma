#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib'
import { ResolverStack } from '../lib/stacks/resolver-stack';
import { join } from 'path'
import { AmplifyExportedBackend } from '@aws-amplify/cdk-exported-backend';
import * as path from 'path'
import { RDSStack } from '../lib/stacks/rds-stack';
import { LambdaStack } from '../lib/stacks/lambda-stack';

const app = new App();

// $appname $env $schema $version
const appName = app.node.tryGetContext('appname');
const env = app.node.tryGetContext('env');
const schemaName = app.node.tryGetContext('schema');
const fullEnvName = `${appName}${env}`;

const rdsStack = new RDSStack(app, `${fullEnvName}RDSStack`, { 
    envName: `${fullEnvName}RDSStack`, 
    schemaName: schemaName,
    cidrRange: "10.100.0.0/16"
});

const useWarmUp = 0; // useWarmUp > 0 will incur extra costs
const lambdaStack = new LambdaStack(app, `${fullEnvName}LambdaStack`,
    {
        resourcesPrefix:  `${fullEnvName}LambdaStack`,
        function: {
            handlerPath: join(process.cwd(), 'cdk/lambda/handler/'),
            userHandlerPath: join(process.cwd(), 'user/lambda/handler/'),
            memorySize: 512,
            useWarmUp: useWarmUp,
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
                        const migrationSQLPath =  join(process.cwd(), 'prisma/migration.sql');
                        return [
                            `cp ${schemaPath} ${outputDir}`,
                            `cp ${migrationSQLPath} ${outputDir}`
                        ];
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
        vpcRds: rdsStack.vpcRds
    }
)

const amplifyCDKName = `amplify-export-${appName}`
const amplifyStack = new AmplifyExportedBackend(app, `${fullEnvName}AmplifyExportedBackend`, {
    path: path.resolve(__dirname, '..', `./lib/${amplifyCDKName}`),
    amplifyEnvironment: env
});

const graphqlApi = amplifyStack.graphqlNestedStacks().graphQLAPI();

new ResolverStack(app, `${fullEnvName}ResolverStack`, {
    resourcesPrefix: `${fullEnvName}PrismaAppSync`,
    schemaPath: join(process.cwd(), `cdk/lib/amplify-export-${appName}/api/${appName}/amplify-appsync-files/schema.graphql`),
    resolverPath: join(process.cwd(), 'prisma/generated/prisma-appsync/resolvers.yaml'),
    graphqlApi: graphqlApi,
    vpcRds: rdsStack.vpcRds,
    prismaLambda: lambdaStack.prismaLambda,
    directResolverFn: lambdaStack.directResolverFn,
    lambdaApiRole: lambdaStack.lambdaApiRole
});

app.synth();