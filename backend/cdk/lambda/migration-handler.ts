import { RootController } from "../controller/root-controller";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
  GetSecretValueCommandOutput,
} from "@aws-sdk/client-secrets-manager";
import * as fs from 'fs';
import * as path from 'path';

export async function handler() {

  console.log("event: ", JSON.stringify(process.env));
  const secretsManagerClient = new SecretsManagerClient({
    region: process.env.AWS_REGION,
  });
  const getSecretValueCommand = new GetSecretValueCommand({
    SecretId: process.env.SECRET_ID,
  });
  const getSecretValueCommandResponse = await secretsManagerClient.send(
    getSecretValueCommand
  );

  let fileContent = '';
  try {
    const filePath = path.join(__dirname, 'migration.sql');
    console.log("filePath: ", filePath);
    fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log("fileContent: ", fileContent);
  } catch (error) {
    console.error('Error reading file:', error);
  }

  const controller = new RootController();
  await controller.execute(fileContent);
}