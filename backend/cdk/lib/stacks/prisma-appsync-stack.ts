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
import { VpcRds } from '../modules/vpc-rds'
import { aws_ec2 } from "aws-cdk-lib";

export interface PrismaAppSyncStackProps {
    resourcesPrefix: string
    function: {
        code: string
        memorySize: number
        useWarmUp: number
        policies?: iam.PolicyStatementProps[]
        bundling?: lambdaNodejs.BundlingOptions
        environment?: {}
    }
    graphqlApi: appsync.CfnGraphQLApi
    vpcRds: VpcRds
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

        this.dataSources.lambda = new appsync.CfnDataSource(this, `${this.resourcesPrefixCamel}LambdaDatasource`, {
            apiId: this.props.graphqlApi.attrApiId,
            name: `${this.resourcesPrefixCamel}LambdaDatasource`,
            serviceRoleArn: this.apiRole.roleArn,
            type: 'AWS_LAMBDA',
            lambdaConfig: {
                lambdaFunctionArn: this.directResolverFn.functionArn
            }
        });

        this.dataSources.none = new appsync.CfnDataSource(this, `${this.resourcesPrefixCamel}NoneDatasource`, {
            apiId: this.props.graphqlApi.attrApiId,
            name: `${this.resourcesPrefixCamel}NoneDatasource`,
            type: 'NONE'
        });
    }
}
