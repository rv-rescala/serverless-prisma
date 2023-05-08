import {
    SecretsManagerClient,
    GetSecretValueCommand,
    GetSecretValueCommandOutput,
  } from "@aws-sdk/client-secrets-manager";
  import { PrismaClient } from "@prisma/client";
  
  export async function getPrismaClient(is_root: boolean = false) {
    let dbClient: PrismaClient;
    if (process.env.AWS_REGION) {
      const secretsManagerClient = new SecretsManagerClient({
        region: process.env.AWS_REGION!,
      });
      const getSecretValueCommand = new GetSecretValueCommand({
        SecretId: process.env.SECRET_ID,
      });
      const getSecretValueCommandResponse = await secretsManagerClient.send(
        getSecretValueCommand
      );
  
      const secret = JSON.parse(getSecretValueCommandResponse.SecretString!);
      let dbUrl: string;
      if(is_root){
        dbUrl = `postgresql://${secret.username}:${secret.password}@${secret.host}:${secret.port}/${secret.dbname}`;
      }
      else{
        dbUrl = `postgresql://${secret.username}:${secret.password}@${secret.host}:${secret.port}/${secret.dbname}?schema=${secret.schema}&connection_limit=1&socket_timeout=3`;
      }
      dbClient = new PrismaClient({
        datasources: {
          db: {
            url: dbUrl,
          },
        },
      });
    } else {
      dbClient = new PrismaClient();
    }
    return dbClient;
  }