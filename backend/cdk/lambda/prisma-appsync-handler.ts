import type { AppSyncResolverEvent } from '../../prisma/generated/prisma-appsync/client'
import { PrismaAppSync } from '../../prisma/generated/prisma-appsync/client'
import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

// Instantiate Prisma-AppSync Client

// Lambda handler (AppSync Direct Lambda Resolver)
export const main = async (event: AppSyncResolverEvent<any>) => {
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

    const secret = JSON.parse(getSecretValueCommandResponse.SecretString!);

    //const dbUrl = `postgresql://${secret.username}:${secret.password}@${secret.host}:${secret.port}/${secret.dbname}?connection_limit=1&socket_timeout=3`;
    const dbUrl = `postgresql://${secret.username}:${secret.password}@${secret.host}:${secret.port}/${secret.dbname}?schema=${secret.schema}&connection_limit=1&socket_timeout=3`;

    // Instantiate Prisma-AppSync Client
    const prismaAppSync = new PrismaAppSync({ connectionString: dbUrl });

    return await prismaAppSync.resolve({event});
}
