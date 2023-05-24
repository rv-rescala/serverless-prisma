import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { Context } from 'aws-lambda';
import { UserController } from '../controller/userController';
import { getPrismaClient } from '../../../cdk/lambda/repository/prisma/client';

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

  /*
  switch (event.triggerSource) {
    case 'PostConfirmation_ConfirmSignUp':
      return await handlePostConfirmation(event, userPoolId, cognitoUserName, defaultUserGroup);
    case 'CustomMessage_SignUp':
      return await handleCustomMessageSignUp(event, userPoolId, cognitoUserName, defaultUserGroup);
    // Add additional cases for other Cognito events
    default:
      throw new Error(`Unhandled trigger source: ${event.triggerSource}`);
  }
  */
 return {
    statusCode: 200,
    body: JSON.stringify({event, context}),
 }
}
