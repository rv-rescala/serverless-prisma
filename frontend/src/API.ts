/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTransactionHistoryInput = {
  comment?: string | null,
};

export type TransactionHistory = {
  __typename: "TransactionHistory",
  id: string,
  comment?: string | null,
};

export type DeleteTransactionHistoryInput = {
  id: string,
};

export type UpdateTransactionHistoryInput = {
  id: string,
  comment?: string | null,
};

export type CreateUserHistoryInput = {
  message?: string | null,
  title?: string | null,
};

export type UserHistory = {
  __typename: "UserHistory",
  id: string,
  message?: string | null,
  title?: string | null,
};

export type DeleteUserHistoryInput = {
  id: string,
};

export type UpdateUserHistoryInput = {
  id: string,
  message?: string | null,
  title?: string | null,
};

export type UserCreateInput = {
  cognitoid: string,
  group: string,
  username: string,
  userInfo?: UserUserInfoCreateNestedInput | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UserUserInfoCreateNestedInput = {
  create?: Array< UserInfoCreateInput | null > | null,
  connect?: Array< UserInfoWhereUniqueInput | null > | null,
  connectOrCreate?: Array< UserInfoConnectOrCreateInput | null > | null,
};

export type UserInfoCreateInput = {
  id?: number | null,
  status?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  user: UserInfoUserCreateNestedInput,
};

export type UserInfoUserCreateNestedInput = {
  create?: UserCreateInput | null,
  connect?: UserWhereUniqueInput | null,
  connectOrCreate?: UserConnectOrCreateInput | null,
};

export type UserWhereUniqueInput = {
  cognitoid?: string | null,
  username?: string | null,
};

export type UserConnectOrCreateInput = {
  where: UserWhereUniqueInput,
  create: UserCreateInput,
};

export type UserInfoWhereUniqueInput = {
  id?: number | null,
};

export type UserInfoConnectOrCreateInput = {
  where: UserInfoWhereUniqueInput,
  create: UserInfoCreateInput,
};

export type User = {
  __typename: "User",
  cognitoid: string,
  group: string,
  username: string,
  userInfo?:  Array<UserInfo | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type UserInfo = {
  __typename: "UserInfo",
  id: number,
  cognitoid: string,
  status?: string | null,
  createdAt: string,
  updatedAt: string,
  user: User,
};

export type UserCreateManyInput = {
  cognitoid: string,
  group: string,
  username: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type BatchPayload = {
  __typename: "BatchPayload",
  count?: number | null,
};

export type UserUpdateInput = {
  cognitoid?: string | null,
  group?: string | null,
  username?: string | null,
  userInfo?: UserUserInfoUpdateNestedInput | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UserUserInfoUpdateNestedInput = {
  connect?: Array< UserInfoWhereUniqueInput | null > | null,
  create?: Array< UserInfoCreateInput | null > | null,
  connectOrCreate?: Array< UserInfoConnectOrCreateInput | null > | null,
  update?: Array< UserInfoUpdateUniqueInput | null > | null,
  upsert?: Array< UserInfoUpsertUniqueInput | null > | null,
  delete?: Array< UserInfoWhereUniqueInput | null > | null,
  disconnect?: Array< UserInfoWhereUniqueInput | null > | null,
  deleteMany?: Array< UserInfoScalarWhereInput | null > | null,
  set?: Array< UserInfoWhereUniqueInput | null > | null,
  updateMany?: Array< UserInfoUpdateManyInput | null > | null,
};

export type UserInfoUpdateUniqueInput = {
  data: UserInfoUpdateInput,
  where: UserInfoWhereUniqueInput,
};

export type UserInfoUpdateInput = {
  id?: number | null,
  status?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  user?: UserInfoUserUpdateNestedInput | null,
};

export type UserInfoUserUpdateNestedInput = {
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

export type UserInfoUpsertUniqueInput = {
  where: UserInfoWhereUniqueInput,
  create: UserInfoCreateInput,
  update: UserInfoUpdateInput,
};

export type UserInfoScalarWhereInput = {
  OR?: Array< UserInfoScalarWhereInput | null > | null,
  NOT?: Array< UserInfoScalarWhereInput | null > | null,
  AND?: Array< UserInfoScalarWhereInput | null > | null,
  id?: IntFilter | null,
  cognitoid?: StringFilter | null,
  status?: StringNullableFilter | null,
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

export type UserInfoUpdateManyInput = {
  where: UserInfoScalarWhereInput,
  data: UserInfoUpdateInput,
};

export type UserWhereInput = {
  is?: NullArg | null,
  isNot?: NullArg | null,
  OR?: Array< UserWhereInput | null > | null,
  NOT?: Array< UserWhereInput | null > | null,
  AND?: Array< UserWhereInput | null > | null,
  cognitoid?: StringFilter | null,
  group?: StringFilter | null,
  username?: StringFilter | null,
  userInfo?: UserInfoFilter | null,
  createdAt?: AWSDateTimeFilter | null,
  updatedAt?: AWSDateTimeFilter | null,
};

export enum NullArg {
  NULL = "NULL",
}


export type UserInfoFilter = {
  some?: UserInfoWhereInputWithoutNullables | null,
  every?: UserInfoWhereInputWithoutNullables | null,
  none?: UserInfoWhereInputWithoutNullables | null,
};

export type UserInfoWhereInputWithoutNullables = {
  OR?: Array< UserInfoWhereInput | null > | null,
  NOT?: Array< UserInfoWhereInput | null > | null,
  AND?: Array< UserInfoWhereInput | null > | null,
  id?: IntFilter | null,
  cognitoid?: StringFilter | null,
  status?: StringNullableFilter | null,
  createdAt?: AWSDateTimeFilter | null,
  updatedAt?: AWSDateTimeFilter | null,
  user?: UserWhereInput | null,
};

export type UserInfoWhereInput = {
  is?: NullArg | null,
  isNot?: NullArg | null,
  OR?: Array< UserInfoWhereInput | null > | null,
  NOT?: Array< UserInfoWhereInput | null > | null,
  AND?: Array< UserInfoWhereInput | null > | null,
  id?: IntFilter | null,
  cognitoid?: StringFilter | null,
  status?: StringNullableFilter | null,
  createdAt?: AWSDateTimeFilter | null,
  updatedAt?: AWSDateTimeFilter | null,
  user?: UserWhereInput | null,
};

export type UserInfoCreateManyInput = {
  id?: number | null,
  status?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UserInfoOperationInput = {
  id?: IntOperation | null,
};

export type IntOperation = {
  set?: number | null,
  increment?: number | null,
  decrement?: number | null,
  multiply?: number | null,
  divide?: number | null,
};

export type TableTransactionHistoryFilterInput = {
  id?: TableIDFilterInput | null,
  comment?: TableStringFilterInput | null,
};

export type TableIDFilterInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
};

export type TableStringFilterInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
};

export type TransactionHistoryConnection = {
  __typename: "TransactionHistoryConnection",
  items?:  Array<TransactionHistory | null > | null,
  nextToken?: string | null,
};

export type TableUserHistoryFilterInput = {
  id?: TableIDFilterInput | null,
  message?: TableStringFilterInput | null,
  title?: TableStringFilterInput | null,
};

export type UserHistoryConnection = {
  __typename: "UserHistoryConnection",
  items?:  Array<UserHistory | null > | null,
  nextToken?: string | null,
};

export type UserOrderByInput = {
  cognitoid?: OrderByArg | null,
  group?: OrderByArg | null,
  username?: OrderByArg | null,
  userInfo?: UserInfoOrderByInput | null,
  createdAt?: OrderByArg | null,
  updatedAt?: OrderByArg | null,
};

export enum OrderByArg {
  ASC = "ASC",
  DESC = "DESC",
}


export type UserInfoOrderByInput = {
  id?: OrderByArg | null,
  cognitoid?: OrderByArg | null,
  status?: OrderByArg | null,
  createdAt?: OrderByArg | null,
  updatedAt?: OrderByArg | null,
  user?: UserOrderByInput | null,
};

export type CreateTransactionHistoryMutationVariables = {
  input: CreateTransactionHistoryInput,
};

export type CreateTransactionHistoryMutation = {
  createTransactionHistory?:  {
    __typename: "TransactionHistory",
    id: string,
    comment?: string | null,
  } | null,
};

export type DeleteTransactionHistoryMutationVariables = {
  input: DeleteTransactionHistoryInput,
};

export type DeleteTransactionHistoryMutation = {
  deleteTransactionHistory?:  {
    __typename: "TransactionHistory",
    id: string,
    comment?: string | null,
  } | null,
};

export type UpdateTransactionHistoryMutationVariables = {
  input: UpdateTransactionHistoryInput,
};

export type UpdateTransactionHistoryMutation = {
  updateTransactionHistory?:  {
    __typename: "TransactionHistory",
    id: string,
    comment?: string | null,
  } | null,
};

export type CreateUserHistoryMutationVariables = {
  input: CreateUserHistoryInput,
};

export type CreateUserHistoryMutation = {
  createUserHistory?:  {
    __typename: "UserHistory",
    id: string,
    message?: string | null,
    title?: string | null,
  } | null,
};

export type DeleteUserHistoryMutationVariables = {
  input: DeleteUserHistoryInput,
};

export type DeleteUserHistoryMutation = {
  deleteUserHistory?:  {
    __typename: "UserHistory",
    id: string,
    message?: string | null,
    title?: string | null,
  } | null,
};

export type UpdateUserHistoryMutationVariables = {
  input: UpdateUserHistoryInput,
};

export type UpdateUserHistoryMutation = {
  updateUserHistory?:  {
    __typename: "UserHistory",
    id: string,
    message?: string | null,
    title?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  data: UserCreateInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    cognitoid: string,
    group: string,
    username: string,
    userInfo?:  Array< {
      __typename: "UserInfo",
      id: number,
      cognitoid: string,
      status?: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        cognitoid: string,
        group: string,
        username: string,
        userInfo?:  Array< {
          __typename: "UserInfo",
          id: number,
          cognitoid: string,
          status?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    createdAt: string,
    updatedAt: string,
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
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    cognitoid: string,
    group: string,
    username: string,
    userInfo?:  Array< {
      __typename: "UserInfo",
      id: number,
      cognitoid: string,
      status?: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        cognitoid: string,
        group: string,
        username: string,
        userInfo?:  Array< {
          __typename: "UserInfo",
          id: number,
          cognitoid: string,
          status?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateManyUsersMutationVariables = {
  where: UserWhereInput,
  data?: UserUpdateInput | null,
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
    cognitoid: string,
    group: string,
    username: string,
    userInfo?:  Array< {
      __typename: "UserInfo",
      id: number,
      cognitoid: string,
      status?: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        cognitoid: string,
        group: string,
        username: string,
        userInfo?:  Array< {
          __typename: "UserInfo",
          id: number,
          cognitoid: string,
          status?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  where: UserWhereUniqueInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    cognitoid: string,
    group: string,
    username: string,
    userInfo?:  Array< {
      __typename: "UserInfo",
      id: number,
      cognitoid: string,
      status?: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        cognitoid: string,
        group: string,
        username: string,
        userInfo?:  Array< {
          __typename: "UserInfo",
          id: number,
          cognitoid: string,
          status?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    createdAt: string,
    updatedAt: string,
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

export type CreateUserInfoMutationVariables = {
  data: UserInfoCreateInput,
};

export type CreateUserInfoMutation = {
  createUserInfo?:  {
    __typename: "UserInfo",
    id: number,
    cognitoid: string,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      cognitoid: string,
      group: string,
      username: string,
      userInfo?:  Array< {
        __typename: "UserInfo",
        id: number,
        cognitoid: string,
        status?: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          cognitoid: string,
          group: string,
          username: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type CreateManyUserInfosMutationVariables = {
  data?: Array< UserInfoCreateManyInput > | null,
  skipDuplicates?: boolean | null,
};

export type CreateManyUserInfosMutation = {
  createManyUserInfos?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type UpdateUserInfoMutationVariables = {
  where: UserInfoWhereUniqueInput,
  data?: UserInfoUpdateInput | null,
  operation?: UserInfoOperationInput | null,
};

export type UpdateUserInfoMutation = {
  updateUserInfo?:  {
    __typename: "UserInfo",
    id: number,
    cognitoid: string,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      cognitoid: string,
      group: string,
      username: string,
      userInfo?:  Array< {
        __typename: "UserInfo",
        id: number,
        cognitoid: string,
        status?: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          cognitoid: string,
          group: string,
          username: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type UpdateManyUserInfosMutationVariables = {
  where: UserInfoWhereInput,
  data?: UserInfoUpdateInput | null,
  operation?: UserInfoOperationInput | null,
};

export type UpdateManyUserInfosMutation = {
  updateManyUserInfos?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type UpsertUserInfoMutationVariables = {
  create: UserInfoCreateInput,
  update: UserInfoUpdateInput,
  where: UserInfoWhereUniqueInput,
};

export type UpsertUserInfoMutation = {
  upsertUserInfo?:  {
    __typename: "UserInfo",
    id: number,
    cognitoid: string,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      cognitoid: string,
      group: string,
      username: string,
      userInfo?:  Array< {
        __typename: "UserInfo",
        id: number,
        cognitoid: string,
        status?: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          cognitoid: string,
          group: string,
          username: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type DeleteUserInfoMutationVariables = {
  where: UserInfoWhereUniqueInput,
};

export type DeleteUserInfoMutation = {
  deleteUserInfo?:  {
    __typename: "UserInfo",
    id: number,
    cognitoid: string,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      cognitoid: string,
      group: string,
      username: string,
      userInfo?:  Array< {
        __typename: "UserInfo",
        id: number,
        cognitoid: string,
        status?: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          cognitoid: string,
          group: string,
          username: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type DeleteManyUserInfosMutationVariables = {
  where: UserInfoWhereInput,
};

export type DeleteManyUserInfosMutation = {
  deleteManyUserInfos?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type ListLatestTransactionHistoryQuery = {
  listLatestTransactionHistory:  Array< {
    __typename: "TransactionHistory",
    id: string,
    comment?: string | null,
  } >,
};

export type GetTransactionHistoryQueryVariables = {
  id: string,
};

export type GetTransactionHistoryQuery = {
  getTransactionHistory?:  {
    __typename: "TransactionHistory",
    id: string,
    comment?: string | null,
  } | null,
};

export type ListTransactionHistoryQueryVariables = {
  filter?: TableTransactionHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionHistoryQuery = {
  listTransactionHistory?:  {
    __typename: "TransactionHistoryConnection",
    items?:  Array< {
      __typename: "TransactionHistory",
      id: string,
      comment?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserHistoryQueryVariables = {
  id: string,
};

export type GetUserHistoryQuery = {
  getUserHistory?:  {
    __typename: "UserHistory",
    id: string,
    message?: string | null,
    title?: string | null,
  } | null,
};

export type ListUserHistoriesQueryVariables = {
  filter?: TableUserHistoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserHistoriesQuery = {
  listUserHistories?:  {
    __typename: "UserHistoryConnection",
    items?:  Array< {
      __typename: "UserHistory",
      id: string,
      message?: string | null,
      title?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  where: UserWhereUniqueInput,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    cognitoid: string,
    group: string,
    username: string,
    userInfo?:  Array< {
      __typename: "UserInfo",
      id: number,
      cognitoid: string,
      status?: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        cognitoid: string,
        group: string,
        username: string,
        userInfo?:  Array< {
          __typename: "UserInfo",
          id: number,
          cognitoid: string,
          status?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    createdAt: string,
    updatedAt: string,
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
    cognitoid: string,
    group: string,
    username: string,
    userInfo?:  Array< {
      __typename: "UserInfo",
      id: number,
      cognitoid: string,
      status?: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        cognitoid: string,
        group: string,
        username: string,
        userInfo?:  Array< {
          __typename: "UserInfo",
          id: number,
          cognitoid: string,
          status?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    createdAt: string,
    updatedAt: string,
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

export type GetUserInfoQueryVariables = {
  where: UserInfoWhereUniqueInput,
};

export type GetUserInfoQuery = {
  getUserInfo?:  {
    __typename: "UserInfo",
    id: number,
    cognitoid: string,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      cognitoid: string,
      group: string,
      username: string,
      userInfo?:  Array< {
        __typename: "UserInfo",
        id: number,
        cognitoid: string,
        status?: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          cognitoid: string,
          group: string,
          username: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type ListUserInfosQueryVariables = {
  where?: UserInfoWhereInput | null,
  orderBy?: Array< UserInfoOrderByInput | null > | null,
  skip?: number | null,
  take?: number | null,
};

export type ListUserInfosQuery = {
  listUserInfos?:  Array< {
    __typename: "UserInfo",
    id: number,
    cognitoid: string,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      cognitoid: string,
      group: string,
      username: string,
      userInfo?:  Array< {
        __typename: "UserInfo",
        id: number,
        cognitoid: string,
        status?: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          cognitoid: string,
          group: string,
          username: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null > | null,
};

export type CountUserInfosQueryVariables = {
  where?: UserInfoWhereInput | null,
  orderBy?: Array< UserInfoOrderByInput | null > | null,
  skip?: number | null,
  take?: number | null,
};

export type CountUserInfosQuery = {
  countUserInfos?: number | null,
};

export type OnCreateTransactionHistorySubscriptionVariables = {
  id?: string | null,
  comment?: string | null,
};

export type OnCreateTransactionHistorySubscription = {
  onCreateTransactionHistory?:  {
    __typename: "TransactionHistory",
    id: string,
    comment?: string | null,
  } | null,
};

export type OnDeleteTransactionHistorySubscriptionVariables = {
  id?: string | null,
  comment?: string | null,
};

export type OnDeleteTransactionHistorySubscription = {
  onDeleteTransactionHistory?:  {
    __typename: "TransactionHistory",
    id: string,
    comment?: string | null,
  } | null,
};

export type OnUpdateTransactionHistorySubscriptionVariables = {
  id?: string | null,
  comment?: string | null,
};

export type OnUpdateTransactionHistorySubscription = {
  onUpdateTransactionHistory?:  {
    __typename: "TransactionHistory",
    id: string,
    comment?: string | null,
  } | null,
};

export type OnCreateUserHistorySubscriptionVariables = {
  id?: string | null,
  message?: string | null,
  title?: string | null,
};

export type OnCreateUserHistorySubscription = {
  onCreateUserHistory?:  {
    __typename: "UserHistory",
    id: string,
    message?: string | null,
    title?: string | null,
  } | null,
};

export type OnDeleteUserHistorySubscriptionVariables = {
  id?: string | null,
  message?: string | null,
  title?: string | null,
};

export type OnDeleteUserHistorySubscription = {
  onDeleteUserHistory?:  {
    __typename: "UserHistory",
    id: string,
    message?: string | null,
    title?: string | null,
  } | null,
};

export type OnUpdateUserHistorySubscriptionVariables = {
  id?: string | null,
  message?: string | null,
  title?: string | null,
};

export type OnUpdateUserHistorySubscription = {
  onUpdateUserHistory?:  {
    __typename: "UserHistory",
    id: string,
    message?: string | null,
    title?: string | null,
  } | null,
};

export type OnCreatedUserSubscriptionVariables = {
  cognitoid?: string | null,
  username?: string | null,
};

export type OnCreatedUserSubscription = {
  onCreatedUser?:  {
    __typename: "User",
    cognitoid: string,
    group: string,
    username: string,
    userInfo?:  Array< {
      __typename: "UserInfo",
      id: number,
      cognitoid: string,
      status?: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        cognitoid: string,
        group: string,
        username: string,
        userInfo?:  Array< {
          __typename: "UserInfo",
          id: number,
          cognitoid: string,
          status?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatedUserSubscriptionVariables = {
  cognitoid?: string | null,
  username?: string | null,
};

export type OnUpdatedUserSubscription = {
  onUpdatedUser?:  {
    __typename: "User",
    cognitoid: string,
    group: string,
    username: string,
    userInfo?:  Array< {
      __typename: "UserInfo",
      id: number,
      cognitoid: string,
      status?: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        cognitoid: string,
        group: string,
        username: string,
        userInfo?:  Array< {
          __typename: "UserInfo",
          id: number,
          cognitoid: string,
          status?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpsertedUserSubscriptionVariables = {
  cognitoid?: string | null,
  username?: string | null,
};

export type OnUpsertedUserSubscription = {
  onUpsertedUser?:  {
    __typename: "User",
    cognitoid: string,
    group: string,
    username: string,
    userInfo?:  Array< {
      __typename: "UserInfo",
      id: number,
      cognitoid: string,
      status?: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        cognitoid: string,
        group: string,
        username: string,
        userInfo?:  Array< {
          __typename: "UserInfo",
          id: number,
          cognitoid: string,
          status?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletedUserSubscriptionVariables = {
  cognitoid?: string | null,
  username?: string | null,
};

export type OnDeletedUserSubscription = {
  onDeletedUser?:  {
    __typename: "User",
    cognitoid: string,
    group: string,
    username: string,
    userInfo?:  Array< {
      __typename: "UserInfo",
      id: number,
      cognitoid: string,
      status?: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        cognitoid: string,
        group: string,
        username: string,
        userInfo?:  Array< {
          __typename: "UserInfo",
          id: number,
          cognitoid: string,
          status?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnMutatedUserSubscriptionVariables = {
  cognitoid?: string | null,
  username?: string | null,
};

export type OnMutatedUserSubscription = {
  onMutatedUser?:  {
    __typename: "User",
    cognitoid: string,
    group: string,
    username: string,
    userInfo?:  Array< {
      __typename: "UserInfo",
      id: number,
      cognitoid: string,
      status?: string | null,
      createdAt: string,
      updatedAt: string,
      user:  {
        __typename: "User",
        cognitoid: string,
        group: string,
        username: string,
        userInfo?:  Array< {
          __typename: "UserInfo",
          id: number,
          cognitoid: string,
          status?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null > | null,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    createdAt: string,
    updatedAt: string,
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

export type OnCreatedUserInfoSubscriptionVariables = {
  id?: number | null,
};

export type OnCreatedUserInfoSubscription = {
  onCreatedUserInfo?:  {
    __typename: "UserInfo",
    id: number,
    cognitoid: string,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      cognitoid: string,
      group: string,
      username: string,
      userInfo?:  Array< {
        __typename: "UserInfo",
        id: number,
        cognitoid: string,
        status?: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          cognitoid: string,
          group: string,
          username: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnUpdatedUserInfoSubscriptionVariables = {
  id?: number | null,
};

export type OnUpdatedUserInfoSubscription = {
  onUpdatedUserInfo?:  {
    __typename: "UserInfo",
    id: number,
    cognitoid: string,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      cognitoid: string,
      group: string,
      username: string,
      userInfo?:  Array< {
        __typename: "UserInfo",
        id: number,
        cognitoid: string,
        status?: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          cognitoid: string,
          group: string,
          username: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnUpsertedUserInfoSubscriptionVariables = {
  id?: number | null,
};

export type OnUpsertedUserInfoSubscription = {
  onUpsertedUserInfo?:  {
    __typename: "UserInfo",
    id: number,
    cognitoid: string,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      cognitoid: string,
      group: string,
      username: string,
      userInfo?:  Array< {
        __typename: "UserInfo",
        id: number,
        cognitoid: string,
        status?: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          cognitoid: string,
          group: string,
          username: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnDeletedUserInfoSubscriptionVariables = {
  id?: number | null,
};

export type OnDeletedUserInfoSubscription = {
  onDeletedUserInfo?:  {
    __typename: "UserInfo",
    id: number,
    cognitoid: string,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      cognitoid: string,
      group: string,
      username: string,
      userInfo?:  Array< {
        __typename: "UserInfo",
        id: number,
        cognitoid: string,
        status?: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          cognitoid: string,
          group: string,
          username: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnMutatedUserInfoSubscriptionVariables = {
  id?: number | null,
};

export type OnMutatedUserInfoSubscription = {
  onMutatedUserInfo?:  {
    __typename: "UserInfo",
    id: number,
    cognitoid: string,
    status?: string | null,
    createdAt: string,
    updatedAt: string,
    user:  {
      __typename: "User",
      cognitoid: string,
      group: string,
      username: string,
      userInfo?:  Array< {
        __typename: "UserInfo",
        id: number,
        cognitoid: string,
        status?: string | null,
        createdAt: string,
        updatedAt: string,
        user:  {
          __typename: "User",
          cognitoid: string,
          group: string,
          username: string,
          createdAt: string,
          updatedAt: string,
        },
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    },
  } | null,
};

export type OnCreatedManyUserInfosSubscription = {
  onCreatedManyUserInfos?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type OnUpdatedManyUserInfosSubscription = {
  onUpdatedManyUserInfos?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type OnMutatedManyUserInfosSubscription = {
  onMutatedManyUserInfos?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};

export type OnDeletedManyUserInfosSubscription = {
  onDeletedManyUserInfos?:  {
    __typename: "BatchPayload",
    count?: number | null,
  } | null,
};
