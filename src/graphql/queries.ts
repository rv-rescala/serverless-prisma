/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($where: UserWhereUniqueInput!) {
    getUser(where: $where) {
      id
      email
      fullname
      orders {
        id
        author {
          id
          email
          fullname
          createdAt
        }
        authorId
        title
        views
        value
        published
        createdAt
        updatedAt
      }
      createdAt
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
      id
      email
      fullname
      orders {
        id
        author {
          id
          email
          fullname
          createdAt
        }
        authorId
        title
        views
        value
        published
        createdAt
        updatedAt
      }
      createdAt
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
export const getOrder = /* GraphQL */ `
  query GetOrder($where: OrderWhereUniqueInput!) {
    getOrder(where: $where) {
      id
      author {
        id
        email
        fullname
        orders {
          id
          authorId
          title
          views
          value
          published
          createdAt
          updatedAt
        }
        createdAt
      }
      authorId
      title
      views
      value
      published
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $where: OrderWhereInput
    $orderBy: [OrderOrderByInput]
    $skip: Int
    $take: Int
  ) {
    listOrders(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
      id
      author {
        id
        email
        fullname
        orders {
          id
          authorId
          title
          views
          value
          published
          createdAt
          updatedAt
        }
        createdAt
      }
      authorId
      title
      views
      value
      published
      createdAt
      updatedAt
    }
  }
`;
export const countOrders = /* GraphQL */ `
  query CountOrders(
    $where: OrderWhereInput
    $orderBy: [OrderOrderByInput]
    $skip: Int
    $take: Int
  ) {
    countOrders(where: $where, orderBy: $orderBy, skip: $skip, take: $take)
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;