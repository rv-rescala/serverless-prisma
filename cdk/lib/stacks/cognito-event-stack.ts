import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cognito from 'aws-cdk-lib/aws-cognito';
import {
    aws_lambda_nodejs as lambdaNodejs,
} from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam';


interface CognitoEventStackProps extends cdk.StackProps {
    envName: string,
    cognitoUserPool: cognito.CfnUserPool
    cognitoEventLambda: lambdaNodejs.NodejsFunction
}

export class CognitoEventStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: CognitoEventStackProps) {
        super(scope, id, props);

        // for cognito post confirmation
        const cfnUserPoolGroup = new cognito.CfnUserPoolGroup(this, `envNameCfnUserPoolGroup`, {
            userPoolId: props.cognitoUserPool.ref,
            description: 'for general user',
            groupName: 'user'
        });
        props.cognitoUserPool.lambdaConfig = {
            "postConfirmation": props.cognitoEventLambda.functionArn
        }
        const addUserToGroupPolicy = new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ['cognito-idp:AdminAddUserToGroup'],
            resources: ["arn:aws:cognito-idp:*:*:userpool/*"],
        });
        props.cognitoEventLambda.addToRolePolicy(addUserToGroupPolicy);

        const cognitoServicePrincipal = new iam.ServicePrincipal('cognito-idp.amazonaws.com');
        props.cognitoEventLambda.grantInvoke(cognitoServicePrincipal);
    }
}