import 'source-map-support/register';
import { App } from 'aws-cdk-lib'
import * as cdk from 'aws-cdk-lib';
import type { Construct } from 'constructs'
import { AmplifyExportedBackend } from '@aws-amplify/cdk-exported-backend';
import 'source-map-support/register';
import { ResolverStack } from '../lib/stacks/resolver-stack';
import { join } from 'path'
import * as path from 'path'
import { RDSStack } from '../lib/stacks/rds-stack';
import { LambdaStack } from '../lib/stacks/lambda-stack';
import { CognitoEventStack } from '../lib/stacks/cognito-event-stack';
import { CustomeAppsyncStack } from './stacks/custome-appsync-stack';
import { AppsyncProxyStack } from './stacks/appsync-proxy-stack';

interface ServerlessPrismaStageProps extends cdk.StageProps {
    userLambdaHandlerPath: string
}

export class ServerlessPrismaStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props: ServerlessPrismaStageProps) {
        super(scope, id, props);

        // $appname $env $schema $version
        const appName = this.node.tryGetContext('appname');
        const stage = this.node.tryGetContext('stage');
        const schemaName = this.node.tryGetContext('schema');
        const cidr = this.node.tryGetContext('cidr');
        const vpcid = this.node.tryGetContext('vpcid');
        const instanceEndpointAddress = this.node.tryGetContext('instanceEndpointAddress');
        const instanceIdentifier = this.node.tryGetContext('instanceIdentifier');
        const fullEnvName = `${stage}-${appName}`;
        const fullEnvNameCamel = `${stage}${appName}`;
        const fullScheamaName = `${stage}-${schemaName}`;
        const password = this.node.tryGetContext('password');
        const sgGroupId = this.node.tryGetContext('sgGroupId');
        const cliengSgGroupId = this.node.tryGetContext('cliengSgGroupId');

        console.log('serverlessPrismaStack');
        console.log('appName', appName);
        console.log('stage', stage);
        console.log('schemaName', schemaName);
        console.log('cidr', cidr);
        console.log('vpcid', vpcid);
        console.log('fullEnvName', fullEnvName);
        console.log('fullScheamaName', fullScheamaName);
        console.log('CDK_DEFAULT_ACCOUNT', process.env.CDK_DEFAULT_ACCOUNT);
        console.log('CDK_DEFAULT_REGION', process.env.CDK_DEFAULT_REGION);
        console.log('instanceEndpointAddress', instanceEndpointAddress);
        console.log('instanceIdentifier', instanceIdentifier);
        console.log('password', password);
        console.log('sgGroupId', sgGroupId);
        console.log('cliengSgGroupId', cliengSgGroupId);

        const amplifyCDKName = `amplify-export-${appName}`
        const amplifyStack = new AmplifyExportedBackend(this, `${appName}Amplify`, {
            path: path.resolve(__dirname, '..', `./lib/${amplifyCDKName}`),
            amplifyEnvironment: stage
        });

        new CustomeAppsyncStack(this, `${appName}CustomeAppsyncStack`, {
            envName: `${fullEnvNameCamel}CustomeAppsyncStack`,
            graphqlApi: amplifyStack.graphqlNestedStacks().graphQLAPI()
        });

        const rdsStack = new RDSStack(this, `${appName}RDSStack`, {
            envName: `${fullEnvName}RDSStack`,
            appName: appName,
            schemaName: fullScheamaName,
            cidrRange: cidr,
            vpcid: vpcid,
            instanceEndpointAddress: instanceEndpointAddress,
            instanceIdentifier: instanceIdentifier,
            passowrd: password,
            sgGroupId: sgGroupId,
            cliengSgGroupId: cliengSgGroupId
        });

        const useWarmUp = 0; // useWarmUp > 0 will incur extra costs
        const lambdaStack = new LambdaStack(this, `${appName}LambdaStack`,
            {
                resourcesPrefix: `${fullEnvName}LambdaStack`,
                function: {
                    handlerPath: path.resolve(__dirname, '..', `./lambda/handler/`),
                    userHandlerPath: join(process.cwd(), props.userLambdaHandlerPath),
                    memorySize: 512,
                    useWarmUp: useWarmUp,
                    environment: {
                        NODE_ENV: stage,
                        DATABASE_URL: process.env.DATABASE_URL
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

        const graphqlApi = amplifyStack.graphqlNestedStacks().graphQLAPI();

        new ResolverStack(this, `${appName}ResolverStack`, {
            resourcesPrefix: `${fullEnvNameCamel}PrismaAppSync`,
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
            this, `${appName}CognitoEventStack`, {
            envName: `${fullEnvNameCamel}CognitoEventStack`,
            cognitoUserPool: cognitoUserPool,
            cognitoEventLambda: lambdaStack.cognitoEventLambda,
        }
        );

        new AppsyncProxyStack(this, `${appName}AppsyncProxyStack`, {
            envName: `${fullEnvNameCamel}AppsyncProxyStack`,
            apiName: `${fullEnvName}`,
            function: {
                userHandlerPath: join(process.cwd(), props.userLambdaHandlerPath),
                memorySize: 512,
                environment: {
                    APPSYNC_URL: graphqlApi.attrGraphQlUrl
                },
                bundling: {
                    minify: true,
                    sourceMap: true,
                    forceDockerBundling: false,  
                },
            }
        });
    }
}
