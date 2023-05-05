import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import type { Construct } from 'constructs'

interface CognatoStackProps extends cdk.StackProps {
    envName: string;
}

export class CongitoStack extends cdk.Stack {
  public readonly userPool: cognito.UserPool;

  constructor(scope: Construct, id: string, props?: CognatoStackProps) {
    super(scope, id, props);

    // Cognito User Poolの作成
    this.userPool = new cognito.UserPool(this, `${props?.envName}UserPool`, {
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
    });

    // Cognito User Pool Clientの作成
    const userPoolClient = new cognito.UserPoolClient(this, `${props?.envName}UserPoolClient`, {
      userPool: this.userPool
    });

    // Cognito Identity Poolの作成
    const identityPool = new cognito.CfnIdentityPool(this, `${props?.envName}IdentityPool`, {
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: this.userPool.userPoolProviderName,
        },
      ],
    });


    new cognito.CfnUserPoolGroup(this, 'AdminGroup', {
      groupName: 'admins',
      userPoolId: this.userPool.userPoolId,
      description: 'Admin group for managing application access',
    });

    new cognito.CfnUserPoolGroup(this, 'UserGroup', {
      groupName: 'users',
      userPoolId: this.userPool.userPoolId,
      description: 'User group for regular users',
    });

    // リソース情報を出力
    new cdk.CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId,
    });
    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
    });
    new cdk.CfnOutput(this, 'IdentityPoolId', {
      value: identityPool.ref,
    });
  }
}
