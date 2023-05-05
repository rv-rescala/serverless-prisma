import type { AppSyncResolverEvent } from '../../prisma/generated/prisma-appsync/client'
import { PrismaAppSync, BeforeHookParams, AfterHookParams } from '../../prisma/generated/prisma-appsync/client'
import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";


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

    return await prismaAppSync.resolve({
        event,
        hooks: {
            // execute before any query
            // TBD: mutation filter
            /**
             *  mutationに重大に脆弱性が含まれている => 任意のcognito idで任意のデータを操作できる
                mutation MyMutation {
                createUserInfo(data: {user: {connect: {cognitoid: ""}}})
                 => connectをparams.identity.subで補完する
                updateUserInfo(where: {id: 10}, data: {user: {connect: {cognitoid: ""}}})
                => idからtableのcognito idを確認の上、connectをparams.identity.subで補完する
                deleteUserInfo(where: {id: 10})
                => idからtableのcognito idを確認の上、connectをparams.identity.subで補完する
                }
             */
            'before:**': async (params: BeforeHookParams) => {
                params.paths
                console.log('before:**:', params.identity);
                console.log('prismaArgs', params.prismaArgs);
                console.log('params.type', params.type);
                return params
            },
            'before:createUser': async (params: BeforeHookParams) => {
                console.log('before:createUser:', params.identity.sub);
                params.prismaArgs.data.id = params.identity.sub;
                return params
            },

            // execute after any query, 
            'after:**': async (params: AfterHookParams) => {
                console.log('after:result', params.result);
                console.log('after:authorization', params.authorization);
                console.log('result:identity', params.identity);
                console.log('result:prismaArgs', params.prismaArgs);

                // check if user is logged in, API Key or IAM access does not check for identity
                const isMismatch = (result: any, cognitoId: string, group: string): { idMismatch: boolean, groupMismatch: boolean } => {
                    if (Array.isArray(result)) {
                        return {
                            idMismatch: result[0].cognitoid !== cognitoId,
                            groupMismatch: result[0].cognitoid === undefined && result[0].group !== group
                        };
                    } else {
                        return {
                            idMismatch: result.cognitoid !== cognitoId,
                            groupMismatch: result.cognitoid === undefined && result.group !== group
                        };
                    }
                };

                if (params.identity.sub) {
                    const group = params.identity['cognito:groups'];
                    if (params.result) {
                        const { idMismatch, groupMismatch } = isMismatch(params.result, params.identity.sub, group);
                        if (idMismatch) {
                            throw new Error('You are not allowed to access this resource, id mismatch, Please add id or group to your query result to check access permissions');
                        } else if (groupMismatch) {
                            throw new Error('You are not allowed to access this resource, group mismatch, Please add id or group to your query result to check access permissions');
                        }
                    }
                }

                return params
            }
        }
    });
}
