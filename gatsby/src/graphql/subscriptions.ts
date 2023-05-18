/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTransactionHistory = /* GraphQL */ `
  subscription OnCreateTransactionHistory($id: ID, $comment: String) {
    onCreateTransactionHistory(id: $id, comment: $comment) {
      id
      comment
    }
  }
`;
export const onDeleteTransactionHistory = /* GraphQL */ `
  subscription OnDeleteTransactionHistory($id: ID, $comment: String) {
    onDeleteTransactionHistory(id: $id, comment: $comment) {
      id
      comment
    }
  }
`;
export const onUpdateTransactionHistory = /* GraphQL */ `
  subscription OnUpdateTransactionHistory($id: ID, $comment: String) {
    onUpdateTransactionHistory(id: $id, comment: $comment) {
      id
      comment
    }
  }
`;
export const onCreateUserHistory = /* GraphQL */ `
  subscription OnCreateUserHistory($id: ID, $message: String, $title: String) {
    onCreateUserHistory(id: $id, message: $message, title: $title) {
      id
      message
      title
    }
  }
`;
export const onDeleteUserHistory = /* GraphQL */ `
  subscription OnDeleteUserHistory($id: ID, $message: String, $title: String) {
    onDeleteUserHistory(id: $id, message: $message, title: $title) {
      id
      message
      title
    }
  }
`;
export const onUpdateUserHistory = /* GraphQL */ `
  subscription OnUpdateUserHistory($id: ID, $message: String, $title: String) {
    onUpdateUserHistory(id: $id, message: $message, title: $title) {
      id
      message
      title
    }
  }
`;
export const onCreatedUser = /* GraphQL */ `
  subscription OnCreatedUser($cognitoid: String, $username: String) {
    onCreatedUser(cognitoid: $cognitoid, username: $username) {
      cognitoid
      group
      username
      userInfo {
        id
        cognitoid
        status
        createdAt
        updatedAt
        user {
          cognitoid
          group
          username
          userInfo {
            id
            cognitoid
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatedUser = /* GraphQL */ `
  subscription OnUpdatedUser($cognitoid: String, $username: String) {
    onUpdatedUser(cognitoid: $cognitoid, username: $username) {
      cognitoid
      group
      username
      userInfo {
        id
        cognitoid
        status
        createdAt
        updatedAt
        user {
          cognitoid
          group
          username
          userInfo {
            id
            cognitoid
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpsertedUser = /* GraphQL */ `
  subscription OnUpsertedUser($cognitoid: String, $username: String) {
    onUpsertedUser(cognitoid: $cognitoid, username: $username) {
      cognitoid
      group
      username
      userInfo {
        id
        cognitoid
        status
        createdAt
        updatedAt
        user {
          cognitoid
          group
          username
          userInfo {
            id
            cognitoid
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletedUser = /* GraphQL */ `
  subscription OnDeletedUser($cognitoid: String, $username: String) {
    onDeletedUser(cognitoid: $cognitoid, username: $username) {
      cognitoid
      group
      username
      userInfo {
        id
        cognitoid
        status
        createdAt
        updatedAt
        user {
          cognitoid
          group
          username
          userInfo {
            id
            cognitoid
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const onMutatedUser = /* GraphQL */ `
  subscription OnMutatedUser($cognitoid: String, $username: String) {
    onMutatedUser(cognitoid: $cognitoid, username: $username) {
      cognitoid
      group
      username
      userInfo {
        id
        cognitoid
        status
        createdAt
        updatedAt
        user {
          cognitoid
          group
          username
          userInfo {
            id
            cognitoid
            status
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatedManyUsers = /* GraphQL */ `
  subscription OnCreatedManyUsers {
    onCreatedManyUsers {
      count
    }
  }
`;
export const onUpdatedManyUsers = /* GraphQL */ `
  subscription OnUpdatedManyUsers {
    onUpdatedManyUsers {
      count
    }
  }
`;
export const onMutatedManyUsers = /* GraphQL */ `
  subscription OnMutatedManyUsers {
    onMutatedManyUsers {
      count
    }
  }
`;
export const onDeletedManyUsers = /* GraphQL */ `
  subscription OnDeletedManyUsers {
    onDeletedManyUsers {
      count
    }
  }
`;
export const onCreatedUserInfo = /* GraphQL */ `
  subscription OnCreatedUserInfo($id: Int) {
    onCreatedUserInfo(id: $id) {
      id
      cognitoid
      status
      createdAt
      updatedAt
      user {
        cognitoid
        group
        username
        userInfo {
          id
          cognitoid
          status
          createdAt
          updatedAt
          user {
            cognitoid
            group
            username
            createdAt
            updatedAt
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdatedUserInfo = /* GraphQL */ `
  subscription OnUpdatedUserInfo($id: Int) {
    onUpdatedUserInfo(id: $id) {
      id
      cognitoid
      status
      createdAt
      updatedAt
      user {
        cognitoid
        group
        username
        userInfo {
          id
          cognitoid
          status
          createdAt
          updatedAt
          user {
            cognitoid
            group
            username
            createdAt
            updatedAt
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpsertedUserInfo = /* GraphQL */ `
  subscription OnUpsertedUserInfo($id: Int) {
    onUpsertedUserInfo(id: $id) {
      id
      cognitoid
      status
      createdAt
      updatedAt
      user {
        cognitoid
        group
        username
        userInfo {
          id
          cognitoid
          status
          createdAt
          updatedAt
          user {
            cognitoid
            group
            username
            createdAt
            updatedAt
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeletedUserInfo = /* GraphQL */ `
  subscription OnDeletedUserInfo($id: Int) {
    onDeletedUserInfo(id: $id) {
      id
      cognitoid
      status
      createdAt
      updatedAt
      user {
        cognitoid
        group
        username
        userInfo {
          id
          cognitoid
          status
          createdAt
          updatedAt
          user {
            cognitoid
            group
            username
            createdAt
            updatedAt
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const onMutatedUserInfo = /* GraphQL */ `
  subscription OnMutatedUserInfo($id: Int) {
    onMutatedUserInfo(id: $id) {
      id
      cognitoid
      status
      createdAt
      updatedAt
      user {
        cognitoid
        group
        username
        userInfo {
          id
          cognitoid
          status
          createdAt
          updatedAt
          user {
            cognitoid
            group
            username
            createdAt
            updatedAt
          }
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreatedManyUserInfos = /* GraphQL */ `
  subscription OnCreatedManyUserInfos {
    onCreatedManyUserInfos {
      count
    }
  }
`;
export const onUpdatedManyUserInfos = /* GraphQL */ `
  subscription OnUpdatedManyUserInfos {
    onUpdatedManyUserInfos {
      count
    }
  }
`;
export const onMutatedManyUserInfos = /* GraphQL */ `
  subscription OnMutatedManyUserInfos {
    onMutatedManyUserInfos {
      count
    }
  }
`;
export const onDeletedManyUserInfos = /* GraphQL */ `
  subscription OnDeletedManyUserInfos {
    onDeletedManyUserInfos {
      count
    }
  }
`;
