import { AppSyncResolverHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { TransactionHistory } from "../../appsync/generated/generated-types";

const docClient = new DynamoDB.DocumentClient();

export const handler: AppSyncResolverHandler<
  null,
  TransactionHistory[] | null
> = async () => {
  try {
    if (!process.env.TransactionHistory) {
      console.log("TransactionHistoryTable was not specified");
      return null;
    }

    const data = await docClient
      .scan({ TableName: process.env.TransactionHistory })
      .promise();

    return data.Items as TransactionHistory[];
  } catch (err) {
    console.error(`DynamoDB error: ${err}`);
    return null;
  }
};