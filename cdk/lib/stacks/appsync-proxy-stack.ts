import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
    aws_lambda as lambda,
    aws_apigateway as apigw,
    aws_lambda_nodejs as lambdaNodejs,
    aws_iam as iam,
    Duration,
    RemovalPolicy
} from 'aws-cdk-lib'
import { join } from 'path'

interface AppsyncProxyStackProps extends cdk.StackProps {
    envName: string,
    apiName: string
    function: {
        userHandlerPath: string
        memorySize: number
        bundling?: lambdaNodejs.BundlingOptions
        environment?: {}
    }
}

export class AppsyncProxyStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: AppsyncProxyStackProps) {
        super(scope, id, props);

        const appsyncFullAccessPolicyDocument = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Action: [
                        'appsync:*',
                    ],
                    Resource: ['*'],
                },
            ],
        };

        const appsyncFullAccessPolicy = new iam.ManagedPolicy(this, `${props.envName}AppSyncFullAccessPolicy`, {
            document: iam.PolicyDocument.fromJson(appsyncFullAccessPolicyDocument),
        });

        const lambdaExecutionRole = new iam.Role(this, `${props.envName}AppsyncProxyRole`, {
            roleName: `${props.apiName}-appsync-proxy-role`,
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                iam.ManagedPolicy.fromAwsManagedPolicyName(`service-role/AWSLambdaVPCAccessExecutionRole`), // for rds
                appsyncFullAccessPolicy
            ]
        });

        const appsyncProxyLambda = new lambdaNodejs.NodejsFunction(this, `${props.envName}AppsyncProxyFn`, {
            functionName: `${props.apiName}-appsync-proxy-fn`,
            role: lambdaExecutionRole,
            environment: {
                ...props.function.environment
            },
            runtime: lambda.Runtime.NODEJS_16_X,
            timeout: Duration.seconds(180),
            handler: 'main',
            entry: join(props.function.userHandlerPath, 'appsync-proxy.ts'),
            memorySize: props.function.memorySize,
            tracing: lambda.Tracing.ACTIVE,
            currentVersionOptions: {
                removalPolicy: RemovalPolicy.RETAIN,
                retryAttempts: 2,
            },
            ...(props.function.bundling && {
                bundling: props.function.bundling,
            }),
        });

        const api = new apigw.RestApi(this, `${props.envName}-api`, {
            restApiName: props.apiName,
        });

        const integration = new apigw.LambdaIntegration(appsyncProxyLambda);

        const proxyResource = api.root.addResource("{proxy+}");
        proxyResource.addMethod("ANY", integration); // 'ANY' to capture all HTTP methods
    }
}
