import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { PostConfirmationTriggerEvent, Context } from 'aws-lambda';
import { UserController } from '../controller/user-controller';

const cognito = new CognitoIdentityServiceProvider();

export async function handler(event: PostConfirmationTriggerEvent, context: Context) {
  const userPoolId = event.userPoolId;
  const cognitoUserName = event.userName;
  const defaultUserGroup = 'user'; // デフォルトのユーザーグループ名を設定
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
    const controller = new UserController();
    await controller.create(cognitoUserName, userName, defaultUserGroup);

    return event;
  } catch (error) {
    console.error(`Error adding user ${userName} to default group ${defaultUserGroup}:`, error);
    context.fail(error);
  }
}
