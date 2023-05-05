/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listLatestTransactionHistory = /* GraphQL */ `
  query ListLatestTransactionHistory {
    listLatestTransactionHistory {
      id
      comment
    }
  }
`;
export const getTransactionHistory = /* GraphQL */ `
  query GetTransactionHistory($id: ID!) {
    getTransactionHistory(id: $id) {
      id
      comment
    }
  }
`;
export const listTransactionHistory = /* GraphQL */ `
  query ListTransactionHistory(
    $filter: TableTransactionHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactionHistory(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        comment
      }
      nextToken
    }
  }
`;
export const getUserHistory = /* GraphQL */ `
  query GetUserHistory($id: ID!) {
    getUserHistory(id: $id) {
      id
      message
      title
    }
  }
`;
export const listUserHistories = /* GraphQL */ `
  query ListUserHistories(
    $filter: TableUserHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserHistories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        title
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($where: UserWhereUniqueInput!) {
    getUser(where: $where) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $where: UserWhereInput
    $orderBy: [UserOrderByInput]
    $skip: Int
    $take: Int
  ) {
    listUsers(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
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
export const countUsers = /* GraphQL */ `
  query CountUsers(
    $where: UserWhereInput
    $orderBy: [UserOrderByInput]
    $skip: Int
    $take: Int
  ) {
    countUsers(where: $where, orderBy: $orderBy, skip: $skip, take: $take)
  }
`;
export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($where: UserInfoWhereUniqueInput!) {
    getUserInfo(where: $where) {
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
export const listUserInfos = /* GraphQL */ `
  query ListUserInfos(
    $where: UserInfoWhereInput
    $orderBy: [UserInfoOrderByInput]
    $skip: Int
    $take: Int
  ) {
    listUserInfos(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
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
export const countUserInfos = /* GraphQL */ `
  query CountUserInfos(
    $where: UserInfoWhereInput
    $orderBy: [UserInfoOrderByInput]
    $skip: Int
    $take: Int
  ) {
    countUserInfos(where: $where, orderBy: $orderBy, skip: $skip, take: $take)
  }
`;
