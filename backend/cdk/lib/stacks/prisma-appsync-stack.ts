/* eslint-disable no-new */
import { readFileSync } from 'fs'
import type { Construct } from 'constructs'
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
import { VpcRds } from '../modules/vpc-rds'
import { aws_ec2 } from "aws-cdk-lib"
import { kebabCase, camelCase } from 'scule'
import { join } from 'path'

export interface PrismaAppSyncStackProps {
    resourcesPrefix: string
    function: {
        handlerPath: string
        memorySize: number
        useWarmUp: number
        policies?: iam.PolicyStatementProps[]
        bundling?: lambdaNodejs.BundlingOptions
        environment?: {}
    }
    graphqlApi: appsync.CfnGraphQLApi
    vpcRds: VpcRds
    schema: string
    resolvers: string
}

export class PrismaAppSyncStack extends Stack {
    private props: PrismaAppSyncStackProps
    private resourcesPrefix: string
    private resourcesPrefixCamel: string
    private directResolverFn: lambda.Alias
    private apiRole: iam.Role
    public dataSources: {
        lambda?: appsync.CfnDataSource
        none?: appsync.CfnDataSource
    }

    constructor(scope: Construct, id: string, tplProps: PrismaAppSyncStackProps, props?: StackProps) {
        super(scope, id, props)

        // stack naming convention
        this.props = tplProps
        this.resourcesPrefix = kebabCase(this.props.resourcesPrefix)
        this.resourcesPrefixCamel = camelCase(this.resourcesPrefix)

        this.createLambdaResolver()
        this.createDataSources()
        this.createResolvers()
    }


    createLambdaResolver() {

        // create function execution role
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
                SECRET_ID: this.props.vpcRds.rdsSecretArn
            },
            runtime: lambda.Runtime.NODEJS_16_X,
            timeout: Duration.seconds(30),
            handler: 'main',
            entry: join(this.props.function.handlerPath, 'prisma-appsync-handler.ts'),
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
        });

        new lambdaNodejs.NodejsFunction(this, `${this.resourcesPrefixCamel}MigrationFn`, {
            functionName: `${this.resourcesPrefix}_migration_fn`,
            role: lambdaExecutionRole,
            environment: {
                ...this.props.function.environment,
                SECRET_ID: this.props.vpcRds.rdsSecretArn
            },
            runtime: lambda.Runtime.NODEJS_16_X,
            timeout: Duration.seconds(180),
            handler: 'main',
            entry: join(this.props.function.handlerPath, 'migration-handler.ts'),
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
        });


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

    createDataSources() {
        this.dataSources = {}

        this.dataSources.lambda = new appsync.CfnDataSource(this, `${this.resourcesPrefixCamel}CfnLambdaDatasource`, {
            apiId: this.props.graphqlApi.attrApiId,
            name: `${this.resourcesPrefixCamel}CfnLambdaDatasource`,
            serviceRoleArn: this.apiRole.roleArn,
            type: 'AWS_LAMBDA',
            lambdaConfig: {
                lambdaFunctionArn: this.directResolverFn.functionArn
            }
        });

        this.dataSources.none = new appsync.CfnDataSource(this, `${this.resourcesPrefixCamel}CfnNoneDatasource`, {
            apiId: this.props.graphqlApi.attrApiId,
            name: `${this.resourcesPrefixCamel}CfnNoneDatasource`,
            type: 'NONE'
        });
    }

    createResolvers() {
        const schema = new appsync.CfnGraphQLSchema(this, `${this.props}CfnSchema`, {
            apiId: this.props.graphqlApi.attrApiId,
            definition: readFileSync(this.props.schema).toString()
        });

        // read resolvers from yaml
        const resolvers = load(readFileSync(this.props.resolvers, 'utf8'));

        // create resolvers
        if (Array.isArray(resolvers)) {
            resolvers.forEach((resolver: any) => {
                const resolvername = `${resolver.fieldName}${resolver.typeName}-resolver`

                if (['lambda', 'prisma-appsync'].includes(resolver.dataSource) && this.dataSources.lambda) {
                    const cfnResolver = new appsync.CfnResolver(this, resolvername, {
                        apiId: this.props.graphqlApi.attrApiId,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSourceName: this.dataSources.lambda.attrName
                    });
                    cfnResolver.addDependsOn(schema);
                }
                else if (resolver.dataSource === 'none' && this.dataSources.none) {
                    const cfnResolver = new appsync.CfnResolver(this, resolvername, {
                        apiId: this.props.graphqlApi.attrApiId,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSourceName: this.dataSources.none.attrName,
                        requestMappingTemplate: resolver.requestMappingTemplate,
                        responseMappingTemplate: resolver.responseMappingTemplate
                    });
                    cfnResolver.addDependsOn(schema);
                }
            });
        }
    }
}
