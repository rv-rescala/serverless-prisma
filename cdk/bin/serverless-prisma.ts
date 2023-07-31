#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib'
import { ResolverStack } from '../lib/stacks/resolver-stack';
import { join } from 'path'
import { AmplifyExportedBackend } from '@aws-amplify/cdk-exported-backend';
import * as path from 'path'
import { RDSStack } from '../lib/stacks/rds-stack';
import { LambdaStack } from '../lib/stacks/lambda-stack';
import { CognitoEventStack } from '../lib/stacks/cognito-event-stack';
import * as cdk from 'aws-cdk-lib';

export function serverlessPrismaStack(app: cdk.Stage, userLambdaHandlerPath: string) {
    // $appname $env $schema $version
    const appName = app.node.tryGetContext('appname');
    const env = app.node.tryGetContext('env');
    const schemaName = app.node.tryGetContext('schema');
    const cidr = app.node.tryGetContext('cidr');
    const vpcid = app.node.tryGetContext('vpcid');
    const fullEnvName = `${appName}${env}`;

    console.log('serverlessPrismaStack');
    console.log('appName', appName);
    console.log('env', env);
    console.log('schemaName', schemaName);
    console.log('cidr', cidr);
    console.log('vpcid', vpcid);
    console.log('fullEnvName', fullEnvName);
    console.log('CDK_DEFAULT_ACCOUNT', process.env.CDK_DEFAULT_ACCOUNT);
    console.log('CDK_DEFAULT_REGION', process.env.CDK_DEFAULT_REGION);

    const rdsStack = new RDSStack(app, `${fullEnvName}RDSStack`, {
        envName: `${fullEnvName}RDSStack`,
        appName: appName,
        schemaName: schemaName,
        cidrRange: cidr,
        vpcid: vpcid
    });

    const useWarmUp = 0; // useWarmUp > 0 will incur extra costs
    const lambdaStack = new LambdaStack(app, `${fullEnvName}LambdaStack`,
        {
            resourcesPrefix: `${fullEnvName}LambdaStack`,
            function: {
                handlerPath: path.resolve(__dirname, '..', `./lambda/handler/`),
                userHandlerPath: join(process.cwd(), userLambdaHandlerPath),
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
                            const migrationSQLPath = join(process.cwd(), 'prisma/migration.sql');
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
    const amplifyStack = new AmplifyExportedBackend(app, `${fullEnvName}Amplify`, {
        path: path.resolve(__dirname, '..', `./lib/${amplifyCDKName}`),
        amplifyEnvironment: env
    });

    const graphqlApi = amplifyStack.graphqlNestedStacks().graphQLAPI();

    new ResolverStack(app, `${fullEnvName}ResolverStack`, {
        resourcesPrefix: `${fullEnvName}PrismaAppSync`,
        schemaPath: path.resolve(__dirname, '..', `./lib/amplify-export-${appName}/api/${appName}/amplify-appsync-files/schema.graphql`),
        resolverPath: join(process.cwd(), 'prisma/generated/prisma-appsync/resolvers.yaml'),
        graphqlApi: graphqlApi,
        vpcRds: rdsStack.vpcRds,
        prismaLambda: lambdaStack.prismaLambda,
        directResolverFn: lambdaStack.directResolverFn,
        lambdaApiRole: lambdaStack.lambdaApiRole
    });

    const cognitoUserPool = amplifyStack.authNestedStack().userPool();
    new CognitoEventStack(
        app, `${fullEnvName}CognitoEventStack`, {
        envName: `${fullEnvName}CognitoEventStack`,
        cognitoUserPool: cognitoUserPool,
        cognitoEventLambda: lambdaStack.cognitoEventLambda,
    }
    )
}