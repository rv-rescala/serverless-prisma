/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type UserCreateInput = {
  id: string,
  email: string,
  groups?: Array< string | null > | null,
  fullname?: string | null,
  comment?: string | null,
  age?: number | null,
  hoge?: string | null,
  orders?: UserOrdersCreateNestedInput | null,
  createdAt?: string | null,
};

export type UserOrdersCreateNestedInput = {
  create?: Array< OrderCreateInput | null > | null,
  connect?: Array< OrderWhereUniqueInput | null > | null,
  connectOrCreate?: Array< OrderConnectOrCreateInput | null > | null,
};

export type OrderCreateInput = {
  id?: number | null,
  title: string,
  views?: number | null,
  value?: number | null,
  published?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  user: OrderUserCreateNestedInput,
};

export type OrderUserCreateNestedInput = {
  create?: UserCreateInput | null,
  connect?: UserWhereUniqueInput | null,
  connectOrCreate?: UserConnectOrCreateInput | null,
};

export type UserWhereUniqueInput = {
  id?: string | null,
  email?: string | null,
};

export type UserConnectOrCreateInput = {
  where: UserWhereUniqueInput,
  create: UserCreateInput,
};

export type OrderWhereUniqueInput = {
  id?: number | null,
};

export type OrderConnectOrCreateInput = {
  where: OrderWhereUniqueInput,
  create: OrderCreateInput,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  groups?: Array< string | null > | null,
  fullname?: string | null,
  comment?: string | null,
  age?: number | null,
  hoge?: string | null,
  orders?:  Array<Order | null > | null,
  createdAt: string,
};

export type Order = {
  __typename: "Order",
  id: number,
  userId: string,
  title: string,
  views?: number | null,
  value?: number | null,
  published?: boolean | null,
  createdAt: string,
  updatedAt: string,
  user: User,
};

export type UserCreateManyInput = {
  id: string,
  email: string,
  groups?: Array< string | null > | null,
  fullname?: string | null,
  comment?: string | null,
  age?: number | null,
  hoge?: string | null,
  createdAt?: string | null,
};

export type BatchPayload = {
  __typename: "BatchPayload",
  count?: number | null,
};

export type UserUpdateInput = {
  id?: string | null,
  email?: string | null,
  groups?: Array< string | null > | null,
  fullname?: string | null,
  comment?: string | null,
  age?: number | null,
  hoge?: string | null,
  orders?: UserOrdersUpdateNestedInput | null,
  createdAt?: string | null,
};

export type UserOrdersUpdateNestedInput = {
  connect?: Array< OrderWhereUniqueInput | null > | null,
  create?: Array< OrderCreateInput | null > | null,
  connectOrCreate?: Array< OrderConnectOrCreateInput | null > | null,
  update?: Array< OrderUpdateUniqueInput | null > | null,
  upsert?: Array< OrderUpsertUniqueInput | null > | null,
  delete?: Array< OrderWhereUniqueInput | null > | null,
  disconnect?: Array< OrderWhereUniqueInput | null > | null,
  deleteMany?: Array< OrderScalarWhereInput | null > | null,
  set?: Array< OrderWhereUniqueInput | null > | null,
  updateMany?: Array< OrderUpdateManyInput | null > | null,
};

export type OrderUpdateUniqueInput = {
  data: OrderUpdateInput,
  where: OrderWhereUniqueInput,
};

export type OrderUpdateInput = {
  id?: number | null,
  title?: string | null,
  views?: number | null,
  value?: number | null,
  published?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  user?: OrderUserUpdateNestedInput | null,
};

export type OrderUserUpdateNestedInput = {
  connect?: UserWhereUniqueInput | null,
  create?: UserCreateInput | null,
  connectOrCreate?: UserConnectOrCreateInput | null,
  update?: UserUpdateInput | null,
  upsert?: UserUpsertInput | null,
  delete?: boolean | null,
  disconnect?: boolean | null,
};

export type UserUpsertInput = {
  create: UserCreateInput,
  update: UserUpdateInput,
};

export type OrderUpsertUniqueInput = {
  where: OrderWhereUniqueInput,
  create: OrderCreateInput,
  update: OrderUpdateInput,
};

export type OrderScalarWhereInput = {
  OR?: Array< OrderScalarWhereInput | null > | null,
  NOT?: Array< OrderScalarWhereInput | null > | null,
  AND?: Array< OrderScalarWhereInput | null > | null,
  id?: IntFilter | null,
  userId?: StringFilter | null,
  title?: StringFilter | null,
  views?: IntNullableFilter | null,
  value?: IntNullableFilter | null,
  published?: BooleanNullableFilter | null,
  createdAt?: AWSDateTimeFilter | null,
  updatedAt?: AWSDateTimeFilter | null,
};

export type IntFilter = {
  equals?: number | null,
  gt?: number | null,
  gte?: number | null,
  in?: Array< number > | null,
  lt?: number | null,
  lte?: number | null,
  not?: IntFilter | null,
  notIn?: Array< number > | null,
};

export type StringFilter = {
  contains?: string | null,
  endsWith?: string | null,
  equals?: string | null,
  in?: Array< string > | null,
  not?: StringFilter | null,
  notIn?: Array< string > | null,
  startsWith?: string | null,
  mode?: string | null,
};

export type IntNullableFilter = {
  equals?: number | null,
  gt?: number | null,
  gte?: number | null,
  in?: Array< number > | null,
  lt?: number | null,
  lte?: number | null,
  not?: IntFilter | null,
  notIn?: Array< number > | null,
  isNull?: boolean | null,
};

export type BooleanNullableFilter = {
  equals?: boolean | null,
  not?: BooleanFilter | null,
  isNull?: boolean | null,
};

export type BooleanFilter = {
  equals?: boolean | null,
  not?: BooleanFilter | null,
};

export type AWSDateTimeFilter = {
  equals?: string | null,
  gt?: string | null,
  gte?: string | null,
  in?: Array< string > | null,
  lt?: string | null,
  lte?: string | null,
  not?: AWSDateTimeFilter | null,
  notIn?: Array< string > | null,
};

export type OrderUpdateManyInput = {
  where: OrderScalarWhereInput,
  data: OrderUpdateInput,
};

export type UserOperationInput = {
  age?: IntOperation | null,
};

export type IntOperation = {
  set?: number | null,
  increment?: number | null,
  decrement?: number | null,
  multiply?: number | null,
  divide?: number | null,
};

export type UserWhereInput = {
  is?: NullArg | null,
  isNot?: NullArg | null,
  OR?: Array< UserWhereInput | null > | null,
  NOT?: Array< UserWhereInput | null > | null,
  AND?: Array< UserWhereInput | null > | null,
  id?: StringFilter | null,
  email?: AWSEmailFilter | null,
  groups?: StringListFilter | null,
  fullname?: StringNullableFilter | null,
  comment?: StringNullableFilter | null,
  age?: IntNullableFilter | null,
  hoge?: StringNullableFilter | null,
  orders?: OrderFilter | null,
  createdAt?: AWSDateTimeFilter | null,
};

export enum NullArg {
  NULL = "NULL",
}


export type AWSEmailFilter = {
  contains?: string | null,
  endsWith?: string | null,
  equals?: string | null,
  in?: Array< string > | null,
  not?: AWSEmailFilter | null,
  notIn?: Array< string > | null,
  startsWith?: string | null,
};

export type StringListFilter = {
  equals?: Array< string > | null,
  has?: string | null,
  hasEvery?: Array< string > | null,
  hasSome?: Array< string > | null,
  isEmpty?: boolean | null,
};

export type StringNullableFilter = {
  contains?: string | null,
  endsWith?: string | null,
  equals?: string | null,
  in?: Array< string > | null,
  not?: StringFilter | null,
  notIn?: Array< string > | null,
  startsWith?: string | null,
  mode?: string | null,
  isNull?: boolean | null,
};

export type OrderFilter = {
  some?: OrderWhereInputWithoutNullables | null,
  every?: OrderWhereInputWithoutNullables | null,
  none?: OrderWhereInputWithoutNullables | null,
};

export type OrderWhereInputWithoutNullables = {
  OR?: Array< OrderWhereInput | null > | null,
  NOT?: Array< OrderWhereInput | null > | null,
  AND?: Array< OrderWhereInput | null > | null,
  id?: IntFilter | null,
  userId?: StringFilter | null,
  title?: StringFilter | null,
  views?: IntNullableFilter | null,
  value?: IntNullableFilter | null,
  published?: BooleanNullableFilter | null,
  createdAt?: AWSDateTimeFilter | null,
  updatedAt?: AWSDateTimeFilter | null,
  user?: UserWhereInput | null,
};

export type OrderWhereInput = {
  is?: NullArg | null,
  isNot?: NullArg | null,
  OR?: Array< OrderWhereInput | null > | null,
  NOT?: Array< OrderWhereInput | null > | null,
  AND?: Array< OrderWhereInput | null > | null,
  id?: IntFilter | null,
  userId?: StringFilter | null,
  title?: StringFilter | null,
  views?: IntNullableFilter | null,
  value?: IntNullableFilter | null,
  published?: BooleanNullableFilter | null,
  createdAt?: AWSDateTimeFilter | null,
  updatedAt?: AWSDateTimeFilter | null,
  user?: UserWhereInput | null,
};

export type OrderCreateManyInput = {
  id?: number | null,
  title: string,
  views?: number | null,
  value?: number | null,
  published?: boolean | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type OrderOperationInput = {
  id?: IntOperation | null,
  views?: IntOperation | null,
  value?: IntOperation | null,
};

export type CreateTodoInput = {
  id?: string | null,
  name: string,
  description?: string | null,
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  name: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTodoInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteTodoInput = {
  id: string,
};

export type UserOrderByInput = {
  id?: OrderByArg | null,
  email?: OrderByArg | null,
  groups?: OrderByArg | null,
  fullname?: OrderByArg | null,
  comment?: OrderByArg | null,
  age?: OrderByArg | null,
  hoge?: OrderByArg | null,
  orders?: OrderOrderByInput | null,
  createdAt?: OrderByArg | null,
};

export enum OrderByArg {
  ASC = "ASC",
  DESC = "DESC",
}


export type OrderOrderByInput = {
  id?: OrderByArg | null,
  userId?: OrderByArg | null,
  title?: OrderByArg | null,
  views?: OrderByArg | null,
  value?: OrderByArg | null,
  published?: OrderByArg | null,
  createdAt?: OrderByArg | null,
  updatedAt?: OrderByArg | null,
  user?: UserOrderByInput | null,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionTodoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTodoFilterInput | null > | null,
  or?: Array< ModelSubscriptionTodoFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateUserMutationVariables = {
  data: UserCreateInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    email: string,
    groups?: Array< string | null > | null,
    fullname?: string | null,
    comment?: string | null,
    age?: number | null,
    hoge?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: number,
      userId: string,
      title: string,
      views?: number | null,
      value?: number | null,
      published?: boolean | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        groups?: Array< string | null > | null,
        fullname?: string | null,
        comment?: string | null,
        age?: number | null,
        hoge?: string | null,
        createdAt: string,
      },
    } | null > | null,
    createdAt: string,
  } | null,
};

export type CreateManyUsersMutationVariables = {
  data?: Array< UserCreateManyInput > | null,
  skipDuplicates?: boolean | null,
};

export type CreateManyUsersMutation = {
  createManyUsers?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  where: UserWhereUniqueInput,
  data?: UserUpdateInput | null,
  operation?: UserOperationInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    groups?: Array< string | null > | null,
    fullname?: string | null,
    comment?: string | null,
    age?: number | null,
    hoge?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: number,
      userId: string,
      title: string,
      views?: number | null,
      value?: number | null,
      published?: boolean | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        groups?: Array< string | null > | null,
        fullname?: string | null,
        comment?: string | null,
        age?: number | null,
        hoge?: string | null,
        createdAt: string,
      },
    } | null > | null,
    createdAt: string,
  } | null,
};

export type UpdateManyUsersMutationVariables = {
  where: UserWhereInput,
  data?: UserUpdateInput | null,
  operation?: UserOperationInput | null,
};

export type UpdateManyUsersMutation = {
  updateManyUsers?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type UpsertUserMutationVariables = {
  create: UserCreateInput,
  update: UserUpdateInput,
  where: UserWhereUniqueInput,
};

export type UpsertUserMutation = {
  upsertUser?:  {
    __typename: "User",
    id: string,
    email: string,
    groups?: Array< string | null > | null,
    fullname?: string | null,
    comment?: string | null,
    age?: number | null,
    hoge?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: number,
      userId: string,
      title: string,
      views?: number | null,
      value?: number | null,
      published?: boolean | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        groups?: Array< string | null > | null,
        fullname?: string | null,
        comment?: string | null,
        age?: number | null,
        hoge?: string | null,
        createdAt: string,
      },
    } | null > | null,
    createdAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  where: UserWhereUniqueInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    groups?: Array< string | null > | null,
    fullname?: string | null,
    comment?: string | null,
    age?: number | null,
    hoge?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: number,
      userId: string,
      title: string,
      views?: number | null,
      value?: number | null,
      published?: boolean | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        groups?: Array< string | null > | null,
        fullname?: string | null,
        comment?: string | null,
        age?: number | null,
        hoge?: string | null,
        createdAt: string,
      },
    } | null > | null,
    createdAt: string,
  } | null,
};

export type DeleteManyUsersMutationVariables = {
  where: UserWhereInput,
};

export type DeleteManyUsersMutation = {
  deleteManyUsers?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type CreateOrderMutationVariables = {
  data: OrderCreateInput,
};

export type CreateOrderMutation = {
  createOrder?:  {
    __typename: "Order",
    id: number,
    userId: string,
    title: string,
    views?: number | null,
    value?: number | null,
    published?: boolean | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      groups?: Array< string | null > | null,
      fullname?: string | null,
      comment?: string | null,
      age?: number | null,
      hoge?: string | null,
      orders?:  Array< {
        __typename: "Order",
        id: number,
        userId: string,
        title: string,
        views?: number | null,
        value?: number | null,
        published?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
    },
  } | null,
};

export type CreateManyOrdersMutationVariables = {
  data?: Array< OrderCreateManyInput > | null,
  skipDuplicates?: boolean | null,
};

export type CreateManyOrdersMutation = {
  createManyOrders?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type UpdateOrderMutationVariables = {
  where: OrderWhereUniqueInput,
  data?: OrderUpdateInput | null,
  operation?: OrderOperationInput | null,
};

export type UpdateOrderMutation = {
  updateOrder?:  {
    __typename: "Order",
    id: number,
    userId: string,
    title: string,
    views?: number | null,
    value?: number | null,
    published?: boolean | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      groups?: Array< string | null > | null,
      fullname?: string | null,
      comment?: string | null,
      age?: number | null,
      hoge?: string | null,
      orders?:  Array< {
        __typename: "Order",
        id: number,
        userId: string,
        title: string,
        views?: number | null,
        value?: number | null,
        published?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
    },
  } | null,
};

export type UpdateManyOrdersMutationVariables = {
  where: OrderWhereInput,
  data?: OrderUpdateInput | null,
  operation?: OrderOperationInput | null,
};

export type UpdateManyOrdersMutation = {
  updateManyOrders?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type UpsertOrderMutationVariables = {
  create: OrderCreateInput,
  update: OrderUpdateInput,
  where: OrderWhereUniqueInput,
};

export type UpsertOrderMutation = {
  upsertOrder?:  {
    __typename: "Order",
    id: number,
    userId: string,
    title: string,
    views?: number | null,
    value?: number | null,
    published?: boolean | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      groups?: Array< string | null > | null,
      fullname?: string | null,
      comment?: string | null,
      age?: number | null,
      hoge?: string | null,
      orders?:  Array< {
        __typename: "Order",
        id: number,
        userId: string,
        title: string,
        views?: number | null,
        value?: number | null,
        published?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
    },
  } | null,
};

export type DeleteOrderMutationVariables = {
  where: OrderWhereUniqueInput,
};

export type DeleteOrderMutation = {
  deleteOrder?:  {
    __typename: "Order",
    id: number,
    userId: string,
    title: string,
    views?: number | null,
    value?: number | null,
    published?: boolean | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      groups?: Array< string | null > | null,
      fullname?: string | null,
      comment?: string | null,
      age?: number | null,
      hoge?: string | null,
      orders?:  Array< {
        __typename: "Order",
        id: number,
        userId: string,
        title: string,
        views?: number | null,
        value?: number | null,
        published?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
    },
  } | null,
};

export type DeleteManyOrdersMutationVariables = {
  where: OrderWhereInput,
};

export type DeleteManyOrdersMutation = {
  deleteManyOrders?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  where: UserWhereUniqueInput,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    email: string,
    groups?: Array< string | null > | null,
    fullname?: string | null,
    comment?: string | null,
    age?: number | null,
    hoge?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: number,
      userId: string,
      title: string,
      views?: number | null,
      value?: number | null,
      published?: boolean | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        groups?: Array< string | null > | null,
        fullname?: string | null,
        comment?: string | null,
        age?: number | null,
        hoge?: string | null,
        createdAt: string,
      },
    } | null > | null,
    createdAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  where?: UserWhereInput | null,
  orderBy?: Array< UserOrderByInput | null > | null,
  skip?: number | null,
  take?: number | null,
};

export type ListUsersQuery = {
  listUsers?:  Array< {
    __typename: "User",
    id: string,
    email: string,
    groups?: Array< string | null > | null,
    fullname?: string | null,
    comment?: string | null,
    age?: number | null,
    hoge?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: number,
      userId: string,
      title: string,
      views?: number | null,
      value?: number | null,
      published?: boolean | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        groups?: Array< string | null > | null,
        fullname?: string | null,
        comment?: string | null,
        age?: number | null,
        hoge?: string | null,
        createdAt: string,
      },
    } | null > | null,
    createdAt: string,
  } | null > | null,
};

export type CountUsersQueryVariables = {
  where?: UserWhereInput | null,
  orderBy?: Array< UserOrderByInput | null > | null,
  skip?: number | null,
  take?: number | null,
};

export type CountUsersQuery = {
  countUsers?: number | null,
};

export type GetOrderQueryVariables = {
  where: OrderWhereUniqueInput,
};

export type GetOrderQuery = {
  getOrder?:  {
    __typename: "Order",
    id: number,
    userId: string,
    title: string,
    views?: number | null,
    value?: number | null,
    published?: boolean | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      groups?: Array< string | null > | null,
      fullname?: string | null,
      comment?: string | null,
      age?: number | null,
      hoge?: string | null,
      orders?:  Array< {
        __typename: "Order",
        id: number,
        userId: string,
        title: string,
        views?: number | null,
        value?: number | null,
        published?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
    },
  } | null,
};

export type ListOrdersQueryVariables = {
  where?: OrderWhereInput | null,
  orderBy?: Array< OrderOrderByInput | null > | null,
  skip?: number | null,
  take?: number | null,
};

export type ListOrdersQuery = {
  listOrders?:  Array< {
    __typename: "Order",
    id: number,
    userId: string,
    title: string,
    views?: number | null,
    value?: number | null,
    published?: boolean | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      groups?: Array< string | null > | null,
      fullname?: string | null,
      comment?: string | null,
      age?: number | null,
      hoge?: string | null,
      orders?:  Array< {
        __typename: "Order",
        id: number,
        userId: string,
        title: string,
        views?: number | null,
        value?: number | null,
        published?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
    },
  } | null > | null,
};

export type CountOrdersQueryVariables = {
  where?: OrderWhereInput | null,
  orderBy?: Array< OrderOrderByInput | null > | null,
  skip?: number | null,
  take?: number | null,
};

export type CountOrdersQuery = {
  countOrders?: number | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreatedUserSubscriptionVariables = {
  id?: string | null,
  email?: string | null,
};

export type OnCreatedUserSubscription = {
  onCreatedUser?:  {
    __typename: "User",
    id: string,
    email: string,
    groups?: Array< string | null > | null,
    fullname?: string | null,
    comment?: string | null,
    age?: number | null,
    hoge?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: number,
      userId: string,
      title: string,
      views?: number | null,
      value?: number | null,
      published?: boolean | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        groups?: Array< string | null > | null,
        fullname?: string | null,
        comment?: string | null,
        age?: number | null,
        hoge?: string | null,
        createdAt: string,
      },
    } | null > | null,
    createdAt: string,
  } | null,
};

export type OnUpdatedUserSubscriptionVariables = {
  id?: string | null,
  email?: string | null,
};

export type OnUpdatedUserSubscription = {
  onUpdatedUser?:  {
    __typename: "User",
    id: string,
    email: string,
    groups?: Array< string | null > | null,
    fullname?: string | null,
    comment?: string | null,
    age?: number | null,
    hoge?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: number,
      userId: string,
      title: string,
      views?: number | null,
      value?: number | null,
      published?: boolean | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        groups?: Array< string | null > | null,
        fullname?: string | null,
        comment?: string | null,
        age?: number | null,
        hoge?: string | null,
        createdAt: string,
      },
    } | null > | null,
    createdAt: string,
  } | null,
};

export type OnUpsertedUserSubscriptionVariables = {
  id?: string | null,
  email?: string | null,
};

export type OnUpsertedUserSubscription = {
  onUpsertedUser?:  {
    __typename: "User",
    id: string,
    email: string,
    groups?: Array< string | null > | null,
    fullname?: string | null,
    comment?: string | null,
    age?: number | null,
    hoge?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: number,
      userId: string,
      title: string,
      views?: number | null,
      value?: number | null,
      published?: boolean | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        groups?: Array< string | null > | null,
        fullname?: string | null,
        comment?: string | null,
        age?: number | null,
        hoge?: string | null,
        createdAt: string,
      },
    } | null > | null,
    createdAt: string,
  } | null,
};

export type OnDeletedUserSubscriptionVariables = {
  id?: string | null,
  email?: string | null,
};

export type OnDeletedUserSubscription = {
  onDeletedUser?:  {
    __typename: "User",
    id: string,
    email: string,
    groups?: Array< string | null > | null,
    fullname?: string | null,
    comment?: string | null,
    age?: number | null,
    hoge?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: number,
      userId: string,
      title: string,
      views?: number | null,
      value?: number | null,
      published?: boolean | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        groups?: Array< string | null > | null,
        fullname?: string | null,
        comment?: string | null,
        age?: number | null,
        hoge?: string | null,
        createdAt: string,
      },
    } | null > | null,
    createdAt: string,
  } | null,
};

export type OnMutatedUserSubscriptionVariables = {
  id?: string | null,
  email?: string | null,
};

export type OnMutatedUserSubscription = {
  onMutatedUser?:  {
    __typename: "User",
    id: string,
    email: string,
    groups?: Array< string | null > | null,
    fullname?: string | null,
    comment?: string | null,
    age?: number | null,
    hoge?: string | null,
    orders?:  Array< {
      __typename: "Order",
      id: number,
      userId: string,
      title: string,
      views?: number | null,
      value?: number | null,
      published?: boolean | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        id: string,
        email: string,
        groups?: Array< string | null > | null,
        fullname?: string | null,
        comment?: string | null,
        age?: number | null,
        hoge?: string | null,
        createdAt: string,
      },
    } | null > | null,
    createdAt: string,
  } | null,
};

export type OnCreatedManyUsersSubscription = {
  onCreatedManyUsers?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type OnUpdatedManyUsersSubscription = {
  onUpdatedManyUsers?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type OnMutatedManyUsersSubscription = {
  onMutatedManyUsers?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type OnDeletedManyUsersSubscription = {
  onDeletedManyUsers?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type OnCreatedOrderSubscriptionVariables = {
  id?: number | null,
};

export type OnCreatedOrderSubscription = {
  onCreatedOrder?:  {
    __typename: "Order",
    id: number,
    userId: string,
    title: string,
    views?: number | null,
    value?: number | null,
    published?: boolean | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      groups?: Array< string | null > | null,
      fullname?: string | null,
      comment?: string | null,
      age?: number | null,
      hoge?: string | null,
      orders?:  Array< {
        __typename: "Order",
        id: number,
        userId: string,
        title: string,
        views?: number | null,
        value?: number | null,
        published?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
    },
  } | null,
};

export type OnUpdatedOrderSubscriptionVariables = {
  id?: number | null,
};

export type OnUpdatedOrderSubscription = {
  onUpdatedOrder?:  {
    __typename: "Order",
    id: number,
    userId: string,
    title: string,
    views?: number | null,
    value?: number | null,
    published?: boolean | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      groups?: Array< string | null > | null,
      fullname?: string | null,
      comment?: string | null,
      age?: number | null,
      hoge?: string | null,
      orders?:  Array< {
        __typename: "Order",
        id: number,
        userId: string,
        title: string,
        views?: number | null,
        value?: number | null,
        published?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
    },
  } | null,
};

export type OnUpsertedOrderSubscriptionVariables = {
  id?: number | null,
};

export type OnUpsertedOrderSubscription = {
  onUpsertedOrder?:  {
    __typename: "Order",
    id: number,
    userId: string,
    title: string,
    views?: number | null,
    value?: number | null,
    published?: boolean | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      groups?: Array< string | null > | null,
      fullname?: string | null,
      comment?: string | null,
      age?: number | null,
      hoge?: string | null,
      orders?:  Array< {
        __typename: "Order",
        id: number,
        userId: string,
        title: string,
        views?: number | null,
        value?: number | null,
        published?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
    },
  } | null,
};

export type OnDeletedOrderSubscriptionVariables = {
  id?: number | null,
};

export type OnDeletedOrderSubscription = {
  onDeletedOrder?:  {
    __typename: "Order",
    id: number,
    userId: string,
    title: string,
    views?: number | null,
    value?: number | null,
    published?: boolean | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      groups?: Array< string | null > | null,
      fullname?: string | null,
      comment?: string | null,
      age?: number | null,
      hoge?: string | null,
      orders?:  Array< {
        __typename: "Order",
        id: number,
        userId: string,
        title: string,
        views?: number | null,
        value?: number | null,
        published?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
    },
  } | null,
};

export type OnMutatedOrderSubscriptionVariables = {
  id?: number | null,
};

export type OnMutatedOrderSubscription = {
  onMutatedOrder?:  {
    __typename: "Order",
    id: number,
    userId: string,
    title: string,
    views?: number | null,
    value?: number | null,
    published?: boolean | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      groups?: Array< string | null > | null,
      fullname?: string | null,
      comment?: string | null,
      age?: number | null,
      hoge?: string | null,
      orders?:  Array< {
        __typename: "Order",
        id: number,
        userId: string,
        title: string,
        views?: number | null,
        value?: number | null,
        published?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      createdAt: string,
    },
  } | null,
};

export type OnCreatedManyOrdersSubscription = {
  onCreatedManyOrders?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type OnUpdatedManyOrdersSubscription = {
  onUpdatedManyOrders?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type OnMutatedManyOrdersSubscription = {
  onMutatedManyOrders?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type OnDeletedManyOrdersSubscription = {
  onDeletedManyOrders?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type OnCreateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
