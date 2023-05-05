import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as cdk from "aws-cdk-lib";

interface DynamoTableProps {
  envName: string;
  tableName: string;
  partitionKey: {
    name: string;
    type: dynamodb.AttributeType;
  }
}

export class DynamoTable {
  // public readonly lambdaFunction: LambdaFunction;
  public readonly dynamoTable: dynamodb.Table;

  constructor(scope: Construct, props: DynamoTableProps) {
    // DynamoDB

    this.dynamoTable = new dynamodb.Table(scope, `${props.envName}${props.tableName}Table`, {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      partitionKey: props.partitionKey
    });
  }
}