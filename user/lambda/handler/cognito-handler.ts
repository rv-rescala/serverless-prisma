import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { PostConfirmationTriggerEvent, Context } from 'aws-lambda';
import { UserController } from '../controller/userController';
import { getPrismaClient  } from '../../../cdk/lambda/repository/prisma/client';

const cognito = new CognitoIdentityServiceProvider();

export async function main(event: PostConfirmationTriggerEvent, context: Context) {
  const userPoolId = event.userPoolId;
  const cognitoUserName = event.userName;
  const defaultUserGroup = 'user'; // Deafult user group name
  const userName = event.request.userAttributes.email;

  try {
    await cognito
      .adminAddUserToGroup({
        UserPoolId: userPoolId,
        Username: cognitoUserName,
        GroupName: defaultUserGroup,
      })
      .promise();

    // TBD: change user gropp based on mail address
    const prismaClient = await getPrismaClient();
    const controller = new UserController(prismaClient);
    await controller.create(cognitoUserName, userName, defaultUserGroup);

    return event;
  } catch (error) {
    console.error(`Error adding user ${userName} to default group ${defaultUserGroup}:`, error);
    throw error;
  }
}