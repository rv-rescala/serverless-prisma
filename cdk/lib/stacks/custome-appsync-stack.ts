import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cognito from 'aws-cdk-lib/aws-cognito';
import {
    aws_lambda_nodejs as lambdaNodejs,
    aws_appsync as appsync
} from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam';


interface CustomeAppsyncProps extends cdk.StackProps {
    envName: string,
    graphqlApi: appsync.CfnGraphQLApi
}

export class CustomeAppsyncStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: CustomeAppsyncProps) {
        super(scope, id, props);

        const awsIam: appsync.CfnGraphQLApi.AdditionalAuthenticationProviderProperty = {
            authenticationType: 'AWS_IAM',
        };

        const existingProviders = Array.isArray(props.graphqlApi.additionalAuthenticationProviders)
            ? props.graphqlApi.additionalAuthenticationProviders
            : [];

        props.graphqlApi.additionalAuthenticationProviders = [...existingProviders, awsIam]
    }
}