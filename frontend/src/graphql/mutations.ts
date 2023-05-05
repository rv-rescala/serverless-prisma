/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTransactionHistory = /* GraphQL */ `
  mutation CreateTransactionHistory($input: CreateTransactionHistoryInput!) {
    createTransactionHistory(input: $input) {
      id
      comment
    }
  }
`;
export const deleteTransactionHistory = /* GraphQL */ `
  mutation DeleteTransactionHistory($input: DeleteTransactionHistoryInput!) {
    deleteTransactionHistory(input: $input) {
      id
      comment
    }
  }
`;
export const updateTransactionHistory = /* GraphQL */ `
  mutation UpdateTransactionHistory($input: UpdateTransactionHistoryInput!) {
    updateTransactionHistory(input: $input) {
      id
      comment
    }
  }
`;
export const createUserHistory = /* GraphQL */ `
  mutation CreateUserHistory($input: CreateUserHistoryInput!) {
    createUserHistory(input: $input) {
      id
      message
      title
    }
  }
`;
export const deleteUserHistory = /* GraphQL */ `
  mutation DeleteUserHistory($input: DeleteUserHistoryInput!) {
    deleteUserHistory(input: $input) {
      id
      message
      title
    }
  }
`;
export const updateUserHistory = /* GraphQL */ `
  mutation UpdateUserHistory($input: UpdateUserHistoryInput!) {
    updateUserHistory(input: $input) {
      id
      message
      title
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
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
export const createManyUsers = /* GraphQL */ `
  mutation CreateManyUsers(
    $data: [UserCreateManyInput!]
    $skipDuplicates: Boolean
  ) {
    createManyUsers(data: $data, skipDuplicates: $skipDuplicates) {
      count
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput) {
    updateUser(where: $where, data: $data) {
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
export const updateManyUsers = /* GraphQL */ `
  mutation UpdateManyUsers($where: UserWhereInput!, $data: UserUpdateInput) {
    updateManyUsers(where: $where, data: $data) {
      count
    }
  }
`;
export const upsertUser = /* GraphQL */ `
  mutation UpsertUser(
    $create: UserCreateInput!
    $update: UserUpdateInput!
    $where: UserWhereUniqueInput!
  ) {
    upsertUser(create: $create, update: $update, where: $where) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
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
export const deleteManyUsers = /* GraphQL */ `
  mutation DeleteManyUsers($where: UserWhereInput!) {
    deleteManyUsers(where: $where) {
      count
    }
  }
`;
export const createUserInfo = /* GraphQL */ `
  mutation CreateUserInfo($data: UserInfoCreateInput!) {
    createUserInfo(data: $data) {
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
export const createManyUserInfos = /* GraphQL */ `
  mutation CreateManyUserInfos(
    $data: [UserInfoCreateManyInput!]
    $skipDuplicates: Boolean
  ) {
    createManyUserInfos(data: $data, skipDuplicates: $skipDuplicates) {
      count
    }
  }
`;
export const updateUserInfo = /* GraphQL */ `
  mutation UpdateUserInfo(
    $where: UserInfoWhereUniqueInput!
    $data: UserInfoUpdateInput
    $operation: UserInfoOperationInput
  ) {
    updateUserInfo(where: $where, data: $data, operation: $operation) {
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
export const updateManyUserInfos = /* GraphQL */ `
  mutation UpdateManyUserInfos(
    $where: UserInfoWhereInput!
    $data: UserInfoUpdateInput
    $operation: UserInfoOperationInput
  ) {
    updateManyUserInfos(where: $where, data: $data, operation: $operation) {
      count
    }
  }
`;
export const upsertUserInfo = /* GraphQL */ `
  mutation UpsertUserInfo(
    $create: UserInfoCreateInput!
    $update: UserInfoUpdateInput!
    $where: UserInfoWhereUniqueInput!
  ) {
    upsertUserInfo(create: $create, update: $update, where: $where) {
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
export const deleteUserInfo = /* GraphQL */ `
  mutation DeleteUserInfo($where: UserInfoWhereUniqueInput!) {
    deleteUserInfo(where: $where) {
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
export const deleteManyUserInfos = /* GraphQL */ `
  mutation DeleteManyUserInfos($where: UserInfoWhereInput!) {
    deleteManyUserInfos(where: $where) {
      count
    }
  }
`;
