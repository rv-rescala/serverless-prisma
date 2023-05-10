#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib'
import { ResolverStack } from '../lib/stacks/resolver-stack';
import { join } from 'path'
import { AmplifyExportedBackend } from '@aws-amplify/cdk-exported-backend';
import * as path from 'path'
import { mergeSchema } from '../lib/tools/mergeGraphqlSchema';
import { RDSStack } from '../lib/stacks/rds-stack';
import { LambdaStack } from '../lib/stacks/lambda-stack';
import * as cdk from "aws-cdk-lib";

const app = new App();

// lLoad Config
const argContext = 'env';
const envName = app.node.tryGetContext(argContext);
if (envName == undefined)
    throw new Error(`Please specify environment with context option. ex) cdk deploy -c env={envName}`);

const appVals = app.node.tryGetContext("app");
if (appVals == undefined) throw new Error('Invalid environment.');
const fullEnvName = `${appVals['name']}${envName}`;


const rdsStack = new RDSStack(app, `${fullEnvName}RDSStack`, { 
    envName: `${fullEnvName}RDSStack`, 
    schemaName: appVals['schema'],
    cidrRange: "10.100.0.0/16"
});


const useWarmUp = 0; // useWarmUp > 0 will incur extra costs
const lambdaStack = new LambdaStack(app, `${fullEnvName}LambdaStack`,
    {
        resourcesPrefix:  `${fullEnvName}LambdaStack`,
        function: {
            handlerPath: join(process.cwd(), 'cdk/lambda/'),
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

mergeSchema();
const amplifyStack = new AmplifyExportedBackend(app, `${fullEnvName}AmplifyExportedBackend`, {
    path: path.resolve(__dirname, '..', './lib/amplify-export-backend'),
    amplifyEnvironment: "dev"
});
const graphqlApi = amplifyStack.graphqlNestedStacks().graphQLAPI();
const apibackendStack = amplifyStack.graphqlNestedStacks().stack
const resolverStack = new ResolverStack(app, `${fullEnvName}ResolverStack`, {
    resourcesPrefix: `${fullEnvName}PrismaAppSync`,
    schemaPath: join(process.cwd(), 'prisma/generated/merged-schema.graphql'),
    resolverPath: join(process.cwd(), 'prisma/generated/prisma-appsync/resolvers.yaml'),
    function: {
        handlerPath: join(process.cwd(), 'cdk/lambda/'),
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
    graphqlApi: graphqlApi,
    vpcRds: rdsStack.vpcRds,
    prismaLambda: lambdaStack.prismaLambda,
    directResolverFn: lambdaStack.directResolverFn,
    lambdaApiRole: lambdaStack.lambdaApiRole
});

/*
new cdk.CfnOutput(apibackendStack, 'AmplifyStack Output', {
    value: 'Forced redeployment at ' + Date.now(),
}).overrideLogicalId('AmplifyStackOutput');

new cdk.CfnOutput(resolverStack, 'PrismaAppSyncStack Output', {
    value: 'Forced redeployment at ' + Date.now(),
}).overrideLogicalId('PrismaAppSyncStackOutput');
*/

app.synth()