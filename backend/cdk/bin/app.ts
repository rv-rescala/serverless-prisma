
import * as cdk from "aws-cdk-lib";
import { LambdaStack } from "../lib/lambda-stack";
import { PrismaAppSyncStack } from '../lib/prisma-appsync-stack'
import { RDSStack } from '../lib/rds-stack'
import { join } from 'path'
import { AuthorizationType } from '@aws-cdk/aws-appsync-alpha'
import { kebabCase } from 'scule'
import { DynamoDBStack } from '../lib/dynamodb-stack'
import { CongitoStack } from '../lib/cognito-stack'
import { DatasourceResolver } from '../lib/config/datasourceRsolver'

const app = new cdk.App();

const argContext = 'env';
const envName = app.node.tryGetContext(argContext);

if (envName == undefined)
    throw new Error(`Please specify environment with context option. ex) cdk deploy -c env={envName}`);

const appVals = app.node.tryGetContext("app");
if (appVals == undefined) throw new Error('Invalid environment.');

const fullEnvName = `${appVals['name']}${envName}`;

const datasourceResolver = new DatasourceResolver('./appsync/datasourceResolver.json');

const rdsStack = new RDSStack(app, `${fullEnvName}RDSStack`, { envName: `${fullEnvName}RDSStack`, schemaName: appVals['schema'] });

const dynamoDBStack = new DynamoDBStack(app, `${fullEnvName}DynamoDBStack`, { envName: envName, datasourceResolver: datasourceResolver});

const congitoStack = new CongitoStack(app, `${fullEnvName}CognitoStack`, { envName: envName })

const lambdaStack = new LambdaStack(app, `${fullEnvName}LambdaStack`, { envName: envName, vpcRds: rdsStack.vpcRds, datasourceResolver: datasourceResolver, nameDynamoDBMapper: dynamoDBStack.nameDynamoDBMapper, userPool: congitoStack.userPool });

new PrismaAppSyncStack(app, kebabCase(`${fullEnvName}PrismaAppSync`), {
    vpcRds: rdsStack.vpcRds,
    resourcesPrefix: `${fullEnvName}PrismaAppSync`,
    schema: join(process.cwd(), 'appsync/generated/schema.gql'),
    resolvers: join(process.cwd(), 'prisma/generated/prisma-appsync/resolvers.yaml'),
    function: {
        code: join(process.cwd(), 'lambda/handler/prisma-appsync-handler.ts'),
        memorySize: 512,
        useWarmUp: 0, // useWarmUp > 0 will incur extra costs
        environment: {
            NODE_ENV: 'production'
        },
        bundling: {
            minify: true,
            sourceMap: true,
            commandHooks: {
                beforeBundling(inputDir: string, outputDir: string): string[] {
                    return [`cp ${inputDir}/prisma/schema.prisma ${outputDir}`]
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
    datasourceResolver: datasourceResolver,
    nameDynamoMapper: dynamoDBStack.nameDynamoDBMapper,
    nameLambdaMapper: lambdaStack.nameLambdaMapper,
    userPool: congitoStack.userPool
});

app.synth();