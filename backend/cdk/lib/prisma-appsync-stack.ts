/* eslint-disable no-new */
import { readFileSync } from 'fs'
import type { Construct } from 'constructs'
import { camelCase, kebabCase, pascalCase } from 'scule'
import { load } from 'js-yaml'
import type { StackProps } from 'aws-cdk-lib'
import {
    Duration,
    RemovalPolicy,
    Stack,
    aws_appsync as appsync,
    aws_iam as iam,
    aws_lambda as lambda,
    aws_lambda_nodejs as lambdaNodejs,
} from 'aws-cdk-lib'
import * as appsync_alpha from '@aws-cdk/aws-appsync-alpha'
import { aws_ec2 } from "aws-cdk-lib";
import { VpcRds } from './modules/vpc-rds'
import { getResolverFromAppsyncGenerated, resolverType } from './modules/appsync';
import { LambdaFunction } from './constructs/lambda-function';
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { DatasourceResolver } from '../lib/config/datasourceRsolver'
import { NameLamndaMapper } from './lambda-stack';
import { NameDynamoDBMapper } from './dynamodb-stack';
import * as cognito from 'aws-cdk-lib/aws-cognito';

export interface Resolver {
    typeName: string
    fieldName: string
    requestMappingTemplateString?: string
    responseMappingTemplateString?: string
}

export interface LambdaSource {
    name: string
    lambdaFunc: LambdaFunction
    resolvers: [Resolver]
}

export interface DynamoTableSource {
    name: string
    table: dynamodb.Table
    schema: string
}

export interface AppSyncStackProps {
    resourcesPrefix: string
    schema: string
    resolvers: string
    function: {
        code: string
        memorySize: number
        useWarmUp: number
        policies?: iam.PolicyStatementProps[]
        bundling?: lambdaNodejs.BundlingOptions
        environment?: {}
    }
    additionalApiKeys?: string[]
    authorizationConfig: appsync_alpha.AuthorizationConfig
    vpcRds: VpcRds
    datasourceResolver: DatasourceResolver
    nameLambdaMapper: NameLamndaMapper[]
    nameDynamoMapper: NameDynamoDBMapper[]
    userPool: cognito.UserPool
}

export class PrismaAppSyncStack extends Stack {
    private props: AppSyncStackProps
    private resourcesPrefix: string
    private resourcesPrefixCamel: string
    private graphqlApi: appsync_alpha.GraphqlApi
    private directResolverFn: lambda.Alias
    private apiRole: iam.Role
    private dataSources: {
        lambda?: appsync_alpha.LambdaDataSource
        none?: appsync_alpha.NoneDataSource
    }

    constructor(scope: Construct, id: string, tplProps: AppSyncStackProps, props?: StackProps) {
        super(scope, id, props)

        // stack naming convention
        this.props = tplProps;
        this.resourcesPrefix = kebabCase(this.props.resourcesPrefix);

        this.resourcesPrefixCamel = camelCase(this.resourcesPrefix);

        this.createGraphQLApi();
        this.createLambdaResolver();
        this.createDataSources();
        this.createPrismaAppSyncResolvers();
        this.createCustomDatasource();
    }

    createGraphQLApi() {
        // create appsync instance
  

        this.graphqlApi = new appsync_alpha.GraphqlApi(this, `${this.resourcesPrefixCamel}Api`, {
            name: this.resourcesPrefix,
            schema: appsync_alpha.Schema.fromAsset(this.props.schema),
            authorizationConfig: {
                additionalAuthorizationModes: [
                    {
                        authorizationType: appsync.AuthorizationType.USER_POOL,
                        userPoolConfig: {
                            userPool: this.props.userPool,
                        },
                    },
                ],
                ...this.props.authorizationConfig
            },
            logConfig: {
                fieldLogLevel: appsync_alpha.FieldLogLevel.ERROR,
            },
            xrayEnabled: true,
        })

        // create default API key
        new appsync.CfnApiKey(this, `${this.resourcesPrefixCamel}ApiKey`, {
            apiId: this.graphqlApi.apiId,
            description: `${this.resourcesPrefix}_api-key`,
            expires: Math.floor(new Date().setDate(new Date().getDate() + 365) / 1000.0),
        })

        // create additional API keys
        if (this.props.additionalApiKeys) {
            this.props.additionalApiKeys.forEach((apiKey: string) => {
                new appsync.CfnApiKey(this, `${this.resourcesPrefixCamel}ApiKey${pascalCase(apiKey)}`, {
                    apiId: this.graphqlApi.apiId,
                    description: `${this.resourcesPrefix}_api-key_${kebabCase(apiKey)}`,
                    expires: Math.floor(new Date().setDate(new Date().getDate() + 365) / 1000.0),
                })
            })
        }

        /*
        // Output the API Key and URL
        new cdk.CfnOutput(this, "APIKey", {
            value: api.apiKey || "",
        });
        new cdk.CfnOutput(this, "GraphQLURL", {
            value: api.graphqlUrl,
        });
        */
    }

    createLambdaResolver() {
        const lambdaExecutionRole = new iam.Role(this, `${this.resourcesPrefixCamel}FnExecRole`, {
            roleName: `${this.resourcesPrefix}_fn-exec-role`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                iam.ManagedPolicy.fromAwsManagedPolicyName(`service-role/AWSLambdaVPCAccessExecutionRole`), // for rds
                this.props.vpcRds.iamGetSecretPolicy, // for rds
            ],
            ...(this.props.function?.policies
                && this.props.function.policies.length > 0 && {
                inlinePolicies: {
                    customApiFunctionPolicy: new iam.PolicyDocument({
                        statements: this.props.function.policies.map((statement) => {
                            return new iam.PolicyStatement(statement)
                        }),
                    }),
                },
            }),
        })

        // create lambda function datasource
        const lambdaFunction = new lambdaNodejs.NodejsFunction(this, `${this.resourcesPrefixCamel}Fn`, {
            functionName: `${this.resourcesPrefix}_fn`,
            role: lambdaExecutionRole,
            environment: {
                ...this.props.function.environment,
                PG_HOST: this.props.vpcRds.dbHostName,
                SECRET_ID: this.props.vpcRds.rdsSecretArn
            },
            runtime: lambda.Runtime.NODEJS_16_X,
            timeout: Duration.seconds(30),
            handler: 'main',
            entry: this.props.function.code,
            memorySize: this.props.function.memorySize,
            tracing: lambda.Tracing.ACTIVE,
            currentVersionOptions: {
                removalPolicy: RemovalPolicy.RETAIN,
                retryAttempts: 2,
            },
            ...(this.props.function.bundling && {
                bundling: this.props.function.bundling,
            }),
            securityGroups: [this.props.vpcRds.dbClientSg],
            vpc: this.props.vpcRds.vpc,
            vpcSubnets: this.props.vpcRds.vpc.selectSubnets({
                subnetType: aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
            }),
        })

        // create alias (from latest version)
        this.directResolverFn = new lambda.Alias(this, `${this.resourcesPrefixCamel}_FnAliasLive`, {
            aliasName: 'live',
            version: lambdaFunction.currentVersion,
            ...(this.props.function.useWarmUp > 0 && {
                provisionedConcurrentExecutions: this.props.function.useWarmUp,
            }),
        })

        // create IAM role
        this.apiRole = new iam.Role(this, `${this.resourcesPrefixCamel}ApiRole`, {
            roleName: `${this.resourcesPrefix}_api-role`,
            assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),
            inlinePolicies: {
                allowEc2DescribeNetworkInterfaces: new iam.PolicyDocument({
                    statements: [
                        new iam.PolicyStatement({
                            actions: ['lambda:InvokeAsync', 'lambda:InvokeFunction'],
                            resources: [this.directResolverFn.functionArn],
                        }),
                    ],
                }),
            },
        })
    }

    createPrismaAppSyncResolvers() {
        // read resolvers from yaml
        const resolvers = load(readFileSync(this.props.resolvers, 'utf8'))

        // create resolvers
        if (Array.isArray(resolvers)) {
            resolvers.forEach((resolver: any) => {
                const resolvername = `${resolver.fieldName}${resolver.typeName}_resolver`

                if (['lambda', 'prisma-appsync'].includes(resolver.dataSource) && this.dataSources.lambda) {
                    new appsync_alpha.Resolver(this, resolvername, {
                        api: this.graphqlApi,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSource: this.dataSources.lambda,
                    })
                }
                else if (resolver.dataSource === 'none' && this.dataSources.none) {
                    new appsync_alpha.Resolver(this, resolvername, {
                        api: this.graphqlApi,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSource: this.dataSources.none,
                        requestMappingTemplate: appsync_alpha.MappingTemplate.fromString(
                            resolver.requestMappingTemplate,
                        ),
                        responseMappingTemplate: appsync_alpha.MappingTemplate.fromString(
                            resolver.responseMappingTemplate,
                        ),
                    })
                }
            })
        }
    }

    createDataSources() {
        this.dataSources = {}

        // create datasource of type "lambda"
        this.dataSources.lambda = new appsync_alpha.LambdaDataSource(
            this,
            `${this.resourcesPrefixCamel}LambdaDatasource`,
            {
                api: this.graphqlApi,
                name: `${this.resourcesPrefixCamel}LambdaDataSource`,
                lambdaFunction: this.directResolverFn,
                serviceRole: this.apiRole,
            },
        )

        // create datasource of type "none"
        this.dataSources.none = new appsync_alpha.NoneDataSource(this, `${this.resourcesPrefixCamel}NoneDatasource`, {
            api: this.graphqlApi,
            name: `${this.resourcesPrefixCamel}NoneDataSource`,
        })
    }

    createCustomDatasource() {

        this.props.datasourceResolver.datasourceResolver.forEach((dr) => {

            if (dr.lambdaSource) {
                const lambdaDataSource = new appsync_alpha.LambdaDataSource(
                    this,
                    `${dr.name}LambdaDatasource`,
                    {
                        api: this.graphqlApi,
                        name: `${dr.name}LambdaDataSource`,
                        lambdaFunction: this.props.nameLambdaMapper.filter((lambda) => lambda.name === dr.name)[0].lambda.lambdaFunction,
                        serviceRole: this.apiRole,
                    },
                );

                dr.lambdaSource?.resolvers?.forEach((resolver) => {
                    new appsync_alpha.Resolver(this, `${dr.name}${resolver.typeName}${resolver.fieldName}LambdaResolver`, {
                        api: this.graphqlApi,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSource: lambdaDataSource
                    });
                });
            }

            if (dr.dynamodbSource) {
                const dynamoDBDataSource = new appsync_alpha.DynamoDbDataSource(
                    this,
                    `${dr.name}DynamoDatasource`,
                    {
                        api: this.graphqlApi,
                        name: `${dr.name}DynamoDatasource`,
                        table: this.props.nameDynamoMapper.filter((dynamo) => dynamo.name === dr.name)[0].table.dynamoTable,
                        serviceRole: this.apiRole,
                    },
                );

                const generatedDynamoDBResolvers = getResolverFromAppsyncGenerated(dr.dynamodbSource?.schemaName);
  
                generatedDynamoDBResolvers.forEach((resolver: resolverType) => {
                    new appsync_alpha.Resolver(this, `${dr.name}${resolver.typeName}${resolver.fieldName}DynamoResolver`, {
                        api: this.graphqlApi,
                        dataSource: dynamoDBDataSource,
                        ...resolver
                    });
                });
            }
        });
    }
}
