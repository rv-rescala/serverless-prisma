import { Construct } from "constructs";
import { aws_ec2, aws_iam } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { LambdaFunction } from "../constructs/lambda-function";

interface LambdaProps {
  envName: string;
  pgHost: string;
  secretArn: string;
  dbClientSg: aws_ec2.SecurityGroup;
  iamGetSecretPolicy: aws_iam.ManagedPolicy;
  vpc: aws_ec2.Vpc;
  funcName: string,
  dynamoDBTables?: { [key: string]: string };
  cognitoTrigger?: boolean;
}

export class Lambda {
  public readonly lambdaFunction: LambdaFunction;

  constructor(scope: Construct, props: LambdaProps) {
    const environmentValue = {
      PG_HOST: props.pgHost,
      SECRET_ID: props.secretArn,
      ENV_NAME: props.envName,
      ...props.dynamoDBTables
    };

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

    const dynamoDbReadWritePolicy = new iam.ManagedPolicy(scope, `DynamoDBReadWriteAccess${props.funcName}`, {
      document: iam.PolicyDocument.fromJson(dynamoDbReadWritePolicyDocument),
    });    

    const role = new iam.Role(scope, `secretAccessRole${props.funcName}`, {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          `service-role/AWSLambdaVPCAccessExecutionRole`
        ),
        dynamoDbReadWritePolicy,// dynamo full access
        props.iamGetSecretPolicy,
      ],
    });

    const lambdaProps = {
      environment: {
        ...environmentValue,
      },
      securityGroups: [props.dbClientSg],
      vpc: props.vpc,
      vpcSubnets: props.vpc.selectSubnets({
        subnetType: aws_ec2.SubnetType.PRIVATE_WITH_EGRESS,
      }),
      role: role,
    };

    this.lambdaFunction= new LambdaFunction(
      scope,
      props.funcName,
      {
        ...lambdaProps,
      },
      {
        filePath: `${props.funcName}.ts`,
      }
    );
  }
}
