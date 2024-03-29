import type { Construct } from 'constructs'
import {
    Duration,
    RemovalPolicy,
    Stack,
    aws_iam as iam,
    aws_lambda as lambda,
    aws_lambda_nodejs as lambdaNodejs,
} from 'aws-cdk-lib'
import { VpcRds } from '../modules/vpc-rds'
import { aws_ec2 } from "aws-cdk-lib"
import { kebabCase, camelCase } from 'scule'
import { join } from 'path'
import * as cdk from "aws-cdk-lib";
import * as fs from 'fs';
import * as path from 'path';


export interface LambdaStackProps extends cdk.StackProps {
    resourcesPrefix: string;
    function: {
        handlerPath: string
        userHandlerPath: string
        memorySize: number
        useWarmUp: number
        policies?: iam.PolicyStatementProps[]
        bundling?: lambdaNodejs.BundlingOptions
        environment?: {}
    }
    vpcRds: VpcRds;
}

export class LambdaStack extends Stack {
    private props: LambdaStackProps
    public prismaLambda!: lambdaNodejs.NodejsFunction
    private resourcesPrefix!: string
    private resourcesPrefixCamel!: string
    public directResolverFn!: lambda.Alias
    public lambdaApiRole!: iam.Role
    public cognitoEventLambda!: lambdaNodejs.NodejsFunction

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);
        this.props = props
        this.resourcesPrefix = kebabCase(this.props.resourcesPrefix);
        this.resourcesPrefixCamel = camelCase(this.resourcesPrefix);
        this.createLambda();
    }

    createLambda() {
        const dynamoDbReadWritePolicyDocument = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Action: [
                        'dynamodb:BatchGetItem',
                        'dynamodb:BatchWriteItem',
                        'dynamodb:PutItem',
                        'dynamodb:GetItem',
                        'dynamodb:UpdateItem',
                        'dynamodb:DeleteItem',
                        'dynamodb:Query',
                        'dynamodb:Scan',
                    ],
                    Resource: ['arn:aws:dynamodb:*:*:table/*'],
                },
            ],
        };

        const dynamoDbReadWritePolicy = new iam.ManagedPolicy(this, `${this.props.resourcesPrefix}DynamoDBReadWriteAccess`, {
            document: iam.PolicyDocument.fromJson(dynamoDbReadWritePolicyDocument),
        });

        const lambdaExecutionRole = new iam.Role(this, `${this.props.resourcesPrefix}LambdaFnExecRole`, {
            roleName: `${this.props.resourcesPrefix}_lambda_fn-exec-role`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                iam.ManagedPolicy.fromAwsManagedPolicyName(`service-role/AWSLambdaVPCAccessExecutionRole`), // for rds
                dynamoDbReadWritePolicy, // for dynamodb
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
        });

        // create lambda function datasource
        this.prismaLambda = new lambdaNodejs.NodejsFunction(this, `${this.props.resourcesPrefix}PrismaFn`, {
            functionName: `${this.resourcesPrefix}_prisma_fn`,
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

        // create alias (from latest version)
        this.directResolverFn = new lambda.Alias(this, `${this.resourcesPrefixCamel}_FnAliasLive`, {
            aliasName: `live`,
            version: this.prismaLambda.currentVersion,
            ...(this.props.function.useWarmUp > 0 && {
                provisionedConcurrentExecutions: this.props.function.useWarmUp,
            }),
        })

        // create IAM role
        this.lambdaApiRole = new iam.Role(this, `${this.resourcesPrefixCamel}ApiRole`, {
            roleName: `${this.resourcesPrefix}_api-role`,
            assumedBy: new iam.ServicePrincipal('appsync.amazonaws.com'),
            inlinePolicies: {
                allowEc2DescribeNetworkInterfaces: new iam.PolicyDocument({
                    statements: [
                        new iam.PolicyStatement({
                            actions: ['lambda:InvokeAsync', 'lambda:InvokeFunction'],
                            resources: ['*'],
                        }),
                    ],
                }),
            },
        })

        new lambdaNodejs.NodejsFunction(this, `${this.props.resourcesPrefix}MigrationFn`, {
            functionName: `${this.props.resourcesPrefix}_migration_fn`,
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

        this.cognitoEventLambda = new lambdaNodejs.NodejsFunction(this, `${this.props.resourcesPrefix}CognitoEventLambdaFn`, {
            functionName: `${this.props.resourcesPrefix}_cognito_event_fn`,
            role: lambdaExecutionRole,
            environment: {
                ...this.props.function.environment,
                SECRET_ID: this.props.vpcRds.rdsSecretArn
            },
            runtime: lambda.Runtime.NODEJS_16_X,
            timeout: Duration.seconds(180),
            handler: 'main',
            entry: join(this.props.function.userHandlerPath, 'cognito-handler.ts'),
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


        // create user defined lambda functions
        /*
        const files = fs.readdirSync(this.props.function.userHandlerPath);
        files.forEach(file => {
            const targetFullPath = path.resolve(this.props.function.userHandlerPath, file);
            const functionName = file.split('.')[0];
            new lambdaNodejs.NodejsFunction(this, `${this.props.resourcesPrefix}${functionName}`, {
                functionName: `${this.props.resourcesPrefix}_${functionName}`,
                role: lambdaExecutionRole,
                environment: {
                    ...this.props.function.environment,
                    SECRET_ID: this.props.vpcRds.rdsSecretArn
                },
                runtime: lambda.Runtime.NODEJS_16_X,
                timeout: Duration.seconds(180),
                handler: 'main',
                entry: targetFullPath,
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
        });
        */
    }
}
