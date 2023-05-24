/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      email
      groups
      fullname
      comment
      age
      hoge
      orders {
        id
        userId
        title
        views
        value
        published
        createdAt
        updatedAt
        user {
          id
          email
          groups
          fullname
          comment
          age
          hoge
          createdAt
        }
      }
      createdAt
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
  mutation UpdateUser(
    $where: UserWhereUniqueInput!
    $data: UserUpdateInput
    $operation: UserOperationInput
  ) {
    updateUser(where: $where, data: $data, operation: $operation) {
      id
      email
      groups
      fullname
      comment
      age
      hoge
      orders {
        id
        userId
        title
        views
        value
        published
        createdAt
        updatedAt
        user {
          id
          email
          groups
          fullname
          comment
          age
          hoge
          createdAt
        }
      }
      createdAt
    }
  }
`;
export const updateManyUsers = /* GraphQL */ `
  mutation UpdateManyUsers(
    $where: UserWhereInput!
    $data: UserUpdateInput
    $operation: UserOperationInput
  ) {
    updateManyUsers(where: $where, data: $data, operation: $operation) {
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
      id
      email
      groups
      fullname
      comment
      age
      hoge
      orders {
        id
        userId
        title
        views
        value
        published
        createdAt
        updatedAt
        user {
          id
          email
          groups
          fullname
          comment
          age
          hoge
          createdAt
        }
      }
      createdAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
      id
      email
      groups
      fullname
      comment
      age
      hoge
      orders {
        id
        userId
        title
        views
        value
        published
        createdAt
        updatedAt
        user {
          id
          email
          groups
          fullname
          comment
          age
          hoge
          createdAt
        }
      }
      createdAt
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder($data: OrderCreateInput!) {
    createOrder(data: $data) {
      id
      userId
      title
      views
      value
      published
      createdAt
      updatedAt
      user {
        id
        email
        groups
        fullname
        comment
        age
        hoge
        orders {
          id
          userId
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
  }
`;
export const createManyOrders = /* GraphQL */ `
  mutation CreateManyOrders(
    $data: [OrderCreateManyInput!]
    $skipDuplicates: Boolean
  ) {
    createManyOrders(data: $data, skipDuplicates: $skipDuplicates) {
      count
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $where: OrderWhereUniqueInput!
    $data: OrderUpdateInput
    $operation: OrderOperationInput
  ) {
    updateOrder(where: $where, data: $data, operation: $operation) {
      id
      userId
      title
      views
      value
      published
      createdAt
      updatedAt
      user {
        id
        email
        groups
        fullname
        comment
        age
        hoge
        orders {
          id
          userId
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
  }
`;
export const updateManyOrders = /* GraphQL */ `
  mutation UpdateManyOrders(
    $where: OrderWhereInput!
    $data: OrderUpdateInput
    $operation: OrderOperationInput
  ) {
    updateManyOrders(where: $where, data: $data, operation: $operation) {
      count
    }
  }
`;
export const upsertOrder = /* GraphQL */ `
  mutation UpsertOrder(
    $create: OrderCreateInput!
    $update: OrderUpdateInput!
    $where: OrderWhereUniqueInput!
  ) {
    upsertOrder(create: $create, update: $update, where: $where) {
      id
      userId
      title
      views
      value
      published
      createdAt
      updatedAt
      user {
        id
        email
        groups
        fullname
        comment
        age
        hoge
        orders {
          id
          userId
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
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder($where: OrderWhereUniqueInput!) {
    deleteOrder(where: $where) {
      id
      userId
      title
      views
      value
      published
      createdAt
      updatedAt
      user {
        id
        email
        groups
        fullname
        comment
        age
        hoge
        orders {
          id
          userId
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
  }
`;
export const deleteManyOrders = /* GraphQL */ `
  mutation DeleteManyOrders($where: OrderWhereInput!) {
    deleteManyOrders(where: $where) {
      count
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
