import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Lambda } from "./modules/lambda";
import { VpcRds } from "./modules/vpc-rds";
import { DatasourceResolver } from '../lib/config/datasourceRsolver'
import { NameDynamoDBMapper } from "./dynamodb-stack";
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as iam from 'aws-cdk-lib/aws-iam';

interface LambdaStackProps extends cdk.StackProps {
  envName: string
  vpcRds: VpcRds
  datasourceResolver: DatasourceResolver
  nameDynamoDBMapper: NameDynamoDBMapper[]
  userPool: cognito.UserPool
}

export type NameLamndaMapper = {
  name: string
  lambda: Lambda
}

export class LambdaStack extends cdk.Stack {
  public readonly nameLambdaMapper: NameLamndaMapper[];

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const commonLambdaProps = {
      envName: props.envName,
      vpc: props.vpcRds.vpc,
      pgHost: props.vpcRds.dbHostName,
      secretArn: props.vpcRds.rdsSecretArn,
      dbClientSg: props.vpcRds.dbClientSg,
      iamGetSecretPolicy: props.vpcRds.iamGetSecretPolicy,
    }

    // for cognito event
    const cognitoPostconfirmationHandler = new Lambda(this, {
      ...commonLambdaProps,
      funcName: "cognito-postconfirmation-handler"
    });
    props.userPool.addTrigger(cognito.UserPoolOperation.POST_CONFIRMATION, cognitoPostconfirmationHandler.lambdaFunction);

    const addUserToGroupPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['cognito-idp:AdminAddUserToGroup'],
      resources: ["arn:aws:cognito-idp:*:*:userpool/*"],
    });
    cognitoPostconfirmationHandler.lambdaFunction.addToRolePolicy(addUserToGroupPolicy);

    // for migration
    new Lambda(this, {
      ...commonLambdaProps,
      funcName: "migration-handler"
    });

    this.nameLambdaMapper = props.datasourceResolver?.lambdaFunctions.map((dt) => {
      const fun = new Lambda(this, {
        ...commonLambdaProps,
        funcName: dt.source,
        dynamoDBTables: props.nameDynamoDBMapper.map((mapper) => {
          return {
            [mapper.name]: mapper.table.dynamoTable.tableName
          }
        }).reduce((a, b) => ({ ...a, ...b }), {})
      });
      return {
        name: dt.name,
        lambda: fun
      };
    });
  }
}
