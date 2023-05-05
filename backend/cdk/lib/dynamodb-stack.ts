import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { DynamoTable } from "./modules/dynamotable";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { DatasourceResolver } from '../lib/config/datasourceRsolver'

interface DynamoDBProps extends cdk.StackProps {
    envName: string;
    datasourceResolver: DatasourceResolver;
}

export type NameDynamoDBMapper = {
    name: string,
    table: DynamoTable
}

export class DynamoDBStack extends cdk.Stack {
    public readonly dynamoTables: {};
    public readonly nameDynamoDBMapper: NameDynamoDBMapper[];

    constructor(scope: Construct, id: string, props: DynamoDBProps) {
        super(scope, id, props);

        this.nameDynamoDBMapper = props.datasourceResolver.dynamodbTables.map((table) => {
            console.log(`Creating DynamoDB table ${table.name} with source ${table.source}`)
            const dt = new DynamoTable(this, {
                envName: props.envName,
                tableName: table.source,
                partitionKey: {
                    name: "id",
                    type: dynamodb.AttributeType.STRING
                }
            });
            return {
                name: table.name,
                table: dt
            };
        });
    }
}