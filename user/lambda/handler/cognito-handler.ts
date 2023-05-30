import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { Context } from 'aws-lambda';
import { UserController } from '../controller/userController';
import { getPrismaClient } from '../../../serverless-prisma/cdk/lambda/repository/prisma/client';

interface CognitoTriggerEvent {
  version: string,
  region: string,
  userPoolId: string,
  userName: string,
  triggerSource:
  | "PreSignUp_SignUp"
  | "PostConfirmation_ConfirmSignUp"
  | "PreAuthentication_Authentication"
  | "PostAuthentication_Authentication"
  | "CustomMessage_SignUp"
  ,
  callerContext: {
    awsSdkVersion: string,
    clientId: string
  },
  request: {
    userAttributes: { [key: string]: string }
  },
  response: {
  }
}

const cognito = new CognitoIdentityServiceProvider();

export async function main(event: CognitoTriggerEvent, context: Context) {
  const userPoolId = event.userPoolId;
  const cognitoUserName = event.userName;
  const defaultUserGroup = 'user'; // Default user group name
  console.log("event", event);
  const prismaClient = await getPrismaClient();

  try {
    await cognito
      .adminAddUserToGroup({
        UserPoolId: userPoolId,
        Username: cognitoUserName,
        GroupName: defaultUserGroup,
      })
      .promise();

    switch (event.triggerSource) {
      case 'PostConfirmation_ConfirmSignUp':
        // Add user to default user group
        const userController = new UserController(prismaClient);
        await userController.create(
          event.request.userAttributes.sub,
          event.request.userAttributes.email,
          cognitoUserName,
          [defaultUserGroup]
        );
        break;
      default:
        console.log(`Unhandled trigger source: ${event.triggerSource}`);
        break;
    }
    return event;
  }
  catch (error) {
    console.error(`Error adding user ${userPoolId} to default group ${defaultUserGroup}:`, error);
    throw error;
  }
}
