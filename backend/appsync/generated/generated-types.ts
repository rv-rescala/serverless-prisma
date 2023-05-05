import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDateTime: Date;
  AWSEmail: string;
  AWSIPAddress: any;
  AWSJSON: string;
  AWSPhone: any;
  AWSTime: any;
  AWSTimestamp: string;
  AWSURL: string;
};

export type AwsDateTimeFilter = {
  equals?: InputMaybe<Scalars['AWSDateTime']>;
  gt?: InputMaybe<Scalars['AWSDateTime']>;
  gte?: InputMaybe<Scalars['AWSDateTime']>;
  in?: InputMaybe<Array<Scalars['AWSDateTime']>>;
  lt?: InputMaybe<Scalars['AWSDateTime']>;
  lte?: InputMaybe<Scalars['AWSDateTime']>;
  not?: InputMaybe<AwsDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['AWSDateTime']>>;
};

export type AwsDateTimeListFilter = {
  equals?: InputMaybe<Array<Scalars['AWSDateTime']>>;
  has?: InputMaybe<Scalars['AWSDateTime']>;
  hasEvery?: InputMaybe<Array<Scalars['AWSDateTime']>>;
  hasSome?: InputMaybe<Array<Scalars['AWSDateTime']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type AwsDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['AWSDateTime']>;
  gt?: InputMaybe<Scalars['AWSDateTime']>;
  gte?: InputMaybe<Scalars['AWSDateTime']>;
  in?: InputMaybe<Array<Scalars['AWSDateTime']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['AWSDateTime']>;
  lte?: InputMaybe<Scalars['AWSDateTime']>;
  not?: InputMaybe<AwsDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['AWSDateTime']>>;
};

export type AwsEmailFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['AWSEmail']>;
  in?: InputMaybe<Array<Scalars['AWSEmail']>>;
  not?: InputMaybe<AwsEmailFilter>;
  notIn?: InputMaybe<Array<Scalars['AWSEmail']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type AwsEmailListFilter = {
  equals?: InputMaybe<Array<Scalars['AWSEmail']>>;
  has?: InputMaybe<Scalars['AWSEmail']>;
  hasEvery?: InputMaybe<Array<Scalars['AWSEmail']>>;
  hasSome?: InputMaybe<Array<Scalars['AWSEmail']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type AwsEmailNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['AWSEmail']>;
  in?: InputMaybe<Array<Scalars['AWSEmail']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<AwsEmailFilter>;
  notIn?: InputMaybe<Array<Scalars['AWSEmail']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type AwsjsonFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['AWSJSON']>;
  in?: InputMaybe<Array<Scalars['AWSJSON']>>;
  not?: InputMaybe<AwsjsonFilter>;
  notIn?: InputMaybe<Array<Scalars['AWSJSON']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type AwsjsonListFilter = {
  equals?: InputMaybe<Array<Scalars['AWSJSON']>>;
  has?: InputMaybe<Scalars['AWSJSON']>;
  hasEvery?: InputMaybe<Array<Scalars['AWSJSON']>>;
  hasSome?: InputMaybe<Array<Scalars['AWSJSON']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type AwsjsonNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['AWSJSON']>;
  in?: InputMaybe<Array<Scalars['AWSJSON']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<AwsjsonFilter>;
  notIn?: InputMaybe<Array<Scalars['AWSJSON']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type AwsurlFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['AWSURL']>;
  in?: InputMaybe<Array<Scalars['AWSURL']>>;
  not?: InputMaybe<AwsurlFilter>;
  notIn?: InputMaybe<Array<Scalars['AWSURL']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type AwsurlListFilter = {
  equals?: InputMaybe<Array<Scalars['AWSURL']>>;
  has?: InputMaybe<Scalars['AWSURL']>;
  hasEvery?: InputMaybe<Array<Scalars['AWSURL']>>;
  hasSome?: InputMaybe<Array<Scalars['AWSURL']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type AwsurlNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['AWSURL']>;
  in?: InputMaybe<Array<Scalars['AWSURL']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<AwsurlFilter>;
  notIn?: InputMaybe<Array<Scalars['AWSURL']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count?: Maybe<Scalars['Int']>;
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilter>;
};

export type BooleanListFilter = {
  equals?: InputMaybe<Array<Scalars['Boolean']>>;
  has?: InputMaybe<Scalars['Boolean']>;
  hasEvery?: InputMaybe<Array<Scalars['Boolean']>>;
  hasSome?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type BooleanNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilter>;
};

export type CreateTransactionHistoryInput = {
  comment?: InputMaybe<Scalars['String']>;
};

export type CreateUserHistoryInput = {
  message?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type DeleteTransactionHistoryInput = {
  id: Scalars['ID'];
};

export type DeleteUserHistoryInput = {
  id: Scalars['ID'];
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type FloatListFilter = {
  equals?: InputMaybe<Array<Scalars['Float']>>;
  has?: InputMaybe<Scalars['Float']>;
  hasEvery?: InputMaybe<Array<Scalars['Float']>>;
  hasSome?: InputMaybe<Array<Scalars['Float']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type FloatOperation = {
  decrement?: InputMaybe<Scalars['Float']>;
  divide?: InputMaybe<Scalars['Float']>;
  increment?: InputMaybe<Scalars['Float']>;
  multiply?: InputMaybe<Scalars['Float']>;
  set?: InputMaybe<Scalars['Float']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntListFilter = {
  equals?: InputMaybe<Array<Scalars['Int']>>;
  has?: InputMaybe<Scalars['Int']>;
  hasEvery?: InputMaybe<Array<Scalars['Int']>>;
  hasSome?: InputMaybe<Array<Scalars['Int']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntOperation = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create multiple new UserInfo records. */
  createManyUserInfos?: Maybe<BatchPayload>;
  /** Create multiple new User records. */
  createManyUsers?: Maybe<BatchPayload>;
  createTransactionHistory?: Maybe<TransactionHistory>;
  /** Create a new single User record. */
  createUser?: Maybe<User>;
  createUserHistory?: Maybe<UserHistory>;
  /** Create a new single UserInfo record. */
  createUserInfo?: Maybe<UserInfo>;
  /** Delete multiple UserInfo records. */
  deleteManyUserInfos?: Maybe<BatchPayload>;
  /** Delete multiple User records. */
  deleteManyUsers?: Maybe<BatchPayload>;
  deleteTransactionHistory?: Maybe<TransactionHistory>;
  /** Delete a single User record. */
  deleteUser?: Maybe<User>;
  deleteUserHistory?: Maybe<UserHistory>;
  /** Delete a single UserInfo record. */
  ?: Maybe<UserInfo>;
  /** Update multiple existing UserInfo records. */
  updateManyUserInfos?: Maybe<BatchPayload>;
  /** Update multiple existing User records. */
  updateManyUsers?: Maybe<BatchPayload>;
  updateTransactionHistory?: Maybe<TransactionHistory>;
  /** Update an existing single User record. */
  updateUser?: Maybe<User>;
  updateUserHistory?: Maybe<UserHistory>;
  /** Update an existing single UserInfo record. */
  updateUserInfo?: Maybe<UserInfo>;
  /** Update an existing or create a new single User record. */
  upsertUser?: Maybe<User>;
  /** Update an existing or create a new single UserInfo record. */
  upsertUserInfo?: Maybe<UserInfo>;
};


export type MutationCreateManyUserInfosArgs = {
  data?: InputMaybe<Array<UserInfoCreateManyInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateManyUsersArgs = {
  data?: InputMaybe<Array<UserCreateManyInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateTransactionHistoryArgs = {
  input: CreateTransactionHistoryInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUserHistoryArgs = {
  input: CreateUserHistoryInput;
};


export type MutationCreateUserInfoArgs = {
  data: UserInfoCreateInput;
};


export type MutationDeleteManyUserInfosArgs = {
  where: UserInfoWhereInput;
};


export type MutationDeleteManyUsersArgs = {
  where: UserWhereInput;
};


export type MutationDeleteTransactionHistoryArgs = {
  input: DeleteTransactionHistoryInput;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUserHistoryArgs = {
  input: DeleteUserHistoryInput;
};


export type MutationDeleteUserInfoArgs = {
  where: UserInfoWhereUniqueInput;
};


export type MutationUpdateManyUserInfosArgs = {
  data?: InputMaybe<UserInfoUpdateInput>;
  operation?: InputMaybe<UserInfoOperationInput>;
  where: UserInfoWhereInput;
};


export type MutationUpdateManyUsersArgs = {
  data?: InputMaybe<UserUpdateInput>;
  where: UserWhereInput;
};


export type MutationUpdateTransactionHistoryArgs = {
  input: UpdateTransactionHistoryInput;
};


export type MutationUpdateUserArgs = {
  data?: InputMaybe<UserUpdateInput>;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUserHistoryArgs = {
  input: UpdateUserHistoryInput;
};


export type MutationUpdateUserInfoArgs = {
  data?: InputMaybe<UserInfoUpdateInput>;
  operation?: InputMaybe<UserInfoOperationInput>;
  where: UserInfoWhereUniqueInput;
};


export type MutationUpsertUserArgs = {
  create: UserCreateInput;
  update: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpsertUserInfoArgs = {
  create: UserInfoCreateInput;
  update: UserInfoUpdateInput;
  where: UserInfoWhereUniqueInput;
};

export enum NullArg {
  Null = 'NULL'
}

export enum OrderByArg {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Query = {
  __typename?: 'Query';
  /** Count all UserInfo records (optional query filters). */
  countUserInfos?: Maybe<Scalars['Int']>;
  /** Count all User records (optional query filters). */
  countUsers?: Maybe<Scalars['Int']>;
  getTransactionHistory?: Maybe<TransactionHistory>;
  /** Find a single User record by unique identifier. */
  getUser?: Maybe<User>;
  getUserHistory?: Maybe<UserHistory>;
  /** Find a single UserInfo record by unique identifier. */
  getUserInfo?: Maybe<UserInfo>;
  listLatestTransactionHistory: Array<TransactionHistory>;
  listTransactionHistory?: Maybe<TransactionHistoryConnection>;
  listUserHistories?: Maybe<UserHistoryConnection>;
  /** Find many UserInfo records (optional query filters). */
  listUserInfos?: Maybe<Array<Maybe<UserInfo>>>;
  /** Find many User records (optional query filters). */
  listUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryCountUserInfosArgs = {
  orderBy?: InputMaybe<Array<InputMaybe<UserInfoOrderByInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserInfoWhereInput>;
};


export type QueryCountUsersArgs = {
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryGetTransactionHistoryArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryGetUserHistoryArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserInfoArgs = {
  where: UserInfoWhereUniqueInput;
};


export type QueryListTransactionHistoryArgs = {
  filter?: InputMaybe<TableTransactionHistoryFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
};


export type QueryListUserHistoriesArgs = {
  filter?: InputMaybe<TableUserHistoryFilterInput>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
};


export type QueryListUserInfosArgs = {
  orderBy?: InputMaybe<Array<InputMaybe<UserInfoOrderByInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserInfoWhereInput>;
};


export type QueryListUsersArgs = {
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  mode?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>;
  has?: InputMaybe<Scalars['String']>;
  hasEvery?: InputMaybe<Array<Scalars['String']>>;
  hasSome?: InputMaybe<Array<Scalars['String']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  mode?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  onCreateTransactionHistory?: Maybe<TransactionHistory>;
  onCreateUserHistory?: Maybe<UserHistory>;
  /** Triggered from `createManyUserInfos` mutation. */
  onCreatedManyUserInfos?: Maybe<BatchPayload>;
  /** Triggered from `createManyUsers` mutation. */
  onCreatedManyUsers?: Maybe<BatchPayload>;
  /** Triggered from `createUser` mutation (excl. `createManyUsers` and `upsertUser`). */
  onCreatedUser?: Maybe<User>;
  /** Triggered from `createUserInfo` mutation (excl. `createManyUserInfos` and `upsertUserInfo`). */
  onCreatedUserInfo?: Maybe<UserInfo>;
  onDeleteTransactionHistory?: Maybe<TransactionHistory>;
  onDeleteUserHistory?: Maybe<UserHistory>;
  /** Triggered from `deleteManyUserInfos` mutation. */
  onDeletedManyUserInfos?: Maybe<BatchPayload>;
  /** Triggered from `deleteManyUsers` mutation. */
  onDeletedManyUsers?: Maybe<BatchPayload>;
  /** Triggered from `deleteUser` mutation (excl. `deleteManyUsers`). */
  onDeletedUser?: Maybe<User>;
  /** Triggered from `deleteUserInfo` mutation (excl. `deleteManyUserInfos`). */
  onDeletedUserInfo?: Maybe<UserInfo>;
  /** Triggered from ANY MULTIPLE records mutation. */
  onMutatedManyUserInfos?: Maybe<BatchPayload>;
  /** Triggered from ANY MULTIPLE records mutation. */
  onMutatedManyUsers?: Maybe<BatchPayload>;
  /** Triggered from ANY SINGLE record mutation. */
  onMutatedUser?: Maybe<User>;
  /** Triggered from ANY SINGLE record mutation. */
  onMutatedUserInfo?: Maybe<UserInfo>;
  onUpdateTransactionHistory?: Maybe<TransactionHistory>;
  onUpdateUserHistory?: Maybe<UserHistory>;
  /** Triggered from `updateManyUserInfos` mutation. */
  onUpdatedManyUserInfos?: Maybe<BatchPayload>;
  /** Triggered from `updateManyUsers` mutation. */
  onUpdatedManyUsers?: Maybe<BatchPayload>;
  /** Triggered from `updateUser` mutation (excl. `updateManyUsers` and `upsertUser`). */
  onUpdatedUser?: Maybe<User>;
  /** Triggered from `updateUserInfo` mutation (excl. `updateManyUserInfos` and `upsertUserInfo`). */
  onUpdatedUserInfo?: Maybe<UserInfo>;
  /** Triggered from `upsertUser` mutation. */
  onUpsertedUser?: Maybe<User>;
  /** Triggered from `upsertUserInfo` mutation. */
  onUpsertedUserInfo?: Maybe<UserInfo>;
};


export type SubscriptionOnCreateTransactionHistoryArgs = {
  comment?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionOnCreateUserHistoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  message?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnCreatedUserArgs = {
  cognitoid?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnCreatedUserInfoArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type SubscriptionOnDeleteTransactionHistoryArgs = {
  comment?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionOnDeleteUserHistoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  message?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnDeletedUserArgs = {
  cognitoid?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnDeletedUserInfoArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type SubscriptionOnMutatedUserArgs = {
  cognitoid?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnMutatedUserInfoArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type SubscriptionOnUpdateTransactionHistoryArgs = {
  comment?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionOnUpdateUserHistoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  message?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnUpdatedUserArgs = {
  cognitoid?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnUpdatedUserInfoArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type SubscriptionOnUpsertedUserArgs = {
  cognitoid?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnUpsertedUserInfoArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type TableBooleanFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
};

export type TableFloatFilterInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  ge?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  le?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  notContains?: InputMaybe<Scalars['Float']>;
};

export type TableIdFilterInput = {
  beginsWith?: InputMaybe<Scalars['ID']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  ge?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  le?: InputMaybe<Scalars['ID']>;
  lt?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  notContains?: InputMaybe<Scalars['ID']>;
};

export type TableIntFilterInput = {
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  ge?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  le?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  notContains?: InputMaybe<Scalars['Int']>;
};

export type TableStringFilterInput = {
  beginsWith?: InputMaybe<Scalars['String']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  ge?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  le?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  notContains?: InputMaybe<Scalars['String']>;
};

export type TableTransactionHistoryFilterInput = {
  comment?: InputMaybe<TableStringFilterInput>;
  id?: InputMaybe<TableIdFilterInput>;
};

export type TableUserHistoryFilterInput = {
  id?: InputMaybe<TableIdFilterInput>;
  message?: InputMaybe<TableStringFilterInput>;
  title?: InputMaybe<TableStringFilterInput>;
};

export type TransactionHistory = {
  __typename?: 'TransactionHistory';
  comment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type TransactionHistoryConnection = {
  __typename?: 'TransactionHistoryConnection';
  items?: Maybe<Array<Maybe<TransactionHistory>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type UpdateTransactionHistoryInput = {
  comment?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateUserHistoryInput = {
  id: Scalars['ID'];
  message?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  cognitoid: Scalars['String'];
  createdAt: Scalars['AWSDateTime'];
  group: Scalars['String'];
  updatedAt: Scalars['AWSDateTime'];
  userInfo?: Maybe<Array<Maybe<UserInfo>>>;
  username: Scalars['String'];
};

export type UserConnectOrCreateInput = {
  create: UserCreateInput;
  where: UserWhereUniqueInput;
};

export type UserCreateInput = {
  cognitoid: Scalars['String'];
  createdAt?: InputMaybe<Scalars['AWSDateTime']>;
  group: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['AWSDateTime']>;
  userInfo?: InputMaybe<UserUserInfoCreateNestedInput>;
  username: Scalars['String'];
};

export type UserCreateManyInput = {
  cognitoid: Scalars['String'];
  createdAt?: InputMaybe<Scalars['AWSDateTime']>;
  group: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['AWSDateTime']>;
  username: Scalars['String'];
};

export type UserExtendedWhereUniqueInput = {
  AND?: InputMaybe<Array<InputMaybe<UserWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<UserWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<UserWhereInput>>>;
  cognitoid?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<AwsDateTimeFilter>;
  group?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<AwsDateTimeFilter>;
  userInfo?: InputMaybe<UserInfoFilter>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserFilter = {
  every?: InputMaybe<UserWhereInputWithoutNullables>;
  none?: InputMaybe<UserWhereInputWithoutNullables>;
  some?: InputMaybe<UserWhereInputWithoutNullables>;
};

export type UserHistory = {
  __typename?: 'UserHistory';
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type UserHistoryConnection = {
  __typename?: 'UserHistoryConnection';
  items?: Maybe<Array<Maybe<UserHistory>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  cognitoid: Scalars['String'];
  createdAt: Scalars['AWSDateTime'];
  id: Scalars['Int'];
  status?: Maybe<Scalars['String']>;
  updatedAt: Scalars['AWSDateTime'];
  user: User;
};

export type UserInfoConnectOrCreateInput = {
  create: UserInfoCreateInput;
  where: UserInfoWhereUniqueInput;
};

export type UserInfoCreateInput = {
  createdAt?: InputMaybe<Scalars['AWSDateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']>;
  user: UserInfoUserCreateNestedInput;
};

export type UserInfoCreateManyInput = {
  createdAt?: InputMaybe<Scalars['AWSDateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']>;
};

export type UserInfoExtendedWhereUniqueInput = {
  AND?: InputMaybe<Array<InputMaybe<UserInfoWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<UserInfoWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<UserInfoWhereInput>>>;
  cognitoid?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<AwsDateTimeFilter>;
  id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<AwsDateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type UserInfoFilter = {
  every?: InputMaybe<UserInfoWhereInputWithoutNullables>;
  none?: InputMaybe<UserInfoWhereInputWithoutNullables>;
  some?: InputMaybe<UserInfoWhereInputWithoutNullables>;
};

export type UserInfoOperationInput = {
  id?: InputMaybe<IntOperation>;
};

export type UserInfoOrderByInput = {
  cognitoid?: InputMaybe<OrderByArg>;
  createdAt?: InputMaybe<OrderByArg>;
  id?: InputMaybe<OrderByArg>;
  status?: InputMaybe<OrderByArg>;
  updatedAt?: InputMaybe<OrderByArg>;
  user?: InputMaybe<UserOrderByInput>;
};

export type UserInfoScalarWhereInput = {
  AND?: InputMaybe<Array<InputMaybe<UserInfoScalarWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<UserInfoScalarWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<UserInfoScalarWhereInput>>>;
  cognitoid?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<AwsDateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  status?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<AwsDateTimeFilter>;
};

export type UserInfoUpdateInput = {
  createdAt?: InputMaybe<Scalars['AWSDateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']>;
  user?: InputMaybe<UserInfoUserUpdateNestedInput>;
};

export type UserInfoUpdateManyInput = {
  data: UserInfoUpdateInput;
  where: UserInfoScalarWhereInput;
};

export type UserInfoUpdateUniqueInput = {
  data: UserInfoUpdateInput;
  where: UserInfoWhereUniqueInput;
};

export type UserInfoUpsertInput = {
  create: UserInfoCreateInput;
  update: UserInfoUpdateInput;
};

export type UserInfoUpsertUniqueInput = {
  create: UserInfoCreateInput;
  update: UserInfoUpdateInput;
  where: UserInfoWhereUniqueInput;
};

export type UserInfoUserCreateNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserConnectOrCreateInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserInfoUserUpdateNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserConnectOrCreateInput>;
  create?: InputMaybe<UserCreateInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUpdateInput>;
  upsert?: InputMaybe<UserUpsertInput>;
};

export type UserInfoWhereInput = {
  AND?: InputMaybe<Array<InputMaybe<UserInfoWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<UserInfoWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<UserInfoWhereInput>>>;
  cognitoid?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<AwsDateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  is?: InputMaybe<NullArg>;
  isNot?: InputMaybe<NullArg>;
  status?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<AwsDateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type UserInfoWhereInputWithoutNullables = {
  AND?: InputMaybe<Array<InputMaybe<UserInfoWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<UserInfoWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<UserInfoWhereInput>>>;
  cognitoid?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<AwsDateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  status?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<AwsDateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type UserInfoWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type UserOrderByInput = {
  cognitoid?: InputMaybe<OrderByArg>;
  createdAt?: InputMaybe<OrderByArg>;
  group?: InputMaybe<OrderByArg>;
  updatedAt?: InputMaybe<OrderByArg>;
  userInfo?: InputMaybe<UserInfoOrderByInput>;
  username?: InputMaybe<OrderByArg>;
};

export type UserScalarWhereInput = {
  AND?: InputMaybe<Array<InputMaybe<UserScalarWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<UserScalarWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<UserScalarWhereInput>>>;
  cognitoid?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<AwsDateTimeFilter>;
  group?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<AwsDateTimeFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserUpdateInput = {
  cognitoid?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['AWSDateTime']>;
  group?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['AWSDateTime']>;
  userInfo?: InputMaybe<UserUserInfoUpdateNestedInput>;
  username?: InputMaybe<Scalars['String']>;
};

export type UserUpdateManyInput = {
  data: UserUpdateInput;
  where: UserScalarWhereInput;
};

export type UserUpdateUniqueInput = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertInput = {
  create: UserCreateInput;
  update: UserUpdateInput;
};

export type UserUpsertUniqueInput = {
  create: UserCreateInput;
  update: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUserInfoCreateNestedInput = {
  connect?: InputMaybe<Array<InputMaybe<UserInfoWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<UserInfoConnectOrCreateInput>>>;
  create?: InputMaybe<Array<InputMaybe<UserInfoCreateInput>>>;
};

export type UserUserInfoUpdateNestedInput = {
  connect?: InputMaybe<Array<InputMaybe<UserInfoWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<UserInfoConnectOrCreateInput>>>;
  create?: InputMaybe<Array<InputMaybe<UserInfoCreateInput>>>;
  delete?: InputMaybe<Array<InputMaybe<UserInfoWhereUniqueInput>>>;
  deleteMany?: InputMaybe<Array<InputMaybe<UserInfoScalarWhereInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<UserInfoWhereUniqueInput>>>;
  set?: InputMaybe<Array<InputMaybe<UserInfoWhereUniqueInput>>>;
  update?: InputMaybe<Array<InputMaybe<UserInfoUpdateUniqueInput>>>;
  updateMany?: InputMaybe<Array<InputMaybe<UserInfoUpdateManyInput>>>;
  upsert?: InputMaybe<Array<InputMaybe<UserInfoUpsertUniqueInput>>>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<InputMaybe<UserWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<UserWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<UserWhereInput>>>;
  cognitoid?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<AwsDateTimeFilter>;
  group?: InputMaybe<StringFilter>;
  is?: InputMaybe<NullArg>;
  isNot?: InputMaybe<NullArg>;
  updatedAt?: InputMaybe<AwsDateTimeFilter>;
  userInfo?: InputMaybe<UserInfoFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserWhereInputWithoutNullables = {
  AND?: InputMaybe<Array<InputMaybe<UserWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<UserWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<UserWhereInput>>>;
  cognitoid?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<AwsDateTimeFilter>;
  group?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<AwsDateTimeFilter>;
  userInfo?: InputMaybe<UserInfoFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  cognitoid?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AWSDateTime: ResolverTypeWrapper<Scalars['AWSDateTime']>;
  AWSDateTimeFilter: AwsDateTimeFilter;
  AWSDateTimeListFilter: AwsDateTimeListFilter;
  AWSDateTimeNullableFilter: AwsDateTimeNullableFilter;
  AWSEmail: ResolverTypeWrapper<Scalars['AWSEmail']>;
  AWSEmailFilter: AwsEmailFilter;
  AWSEmailListFilter: AwsEmailListFilter;
  AWSEmailNullableFilter: AwsEmailNullableFilter;
  AWSIPAddress: ResolverTypeWrapper<Scalars['AWSIPAddress']>;
  AWSJSON: ResolverTypeWrapper<Scalars['AWSJSON']>;
  AWSJSONFilter: AwsjsonFilter;
  AWSJSONListFilter: AwsjsonListFilter;
  AWSJSONNullableFilter: AwsjsonNullableFilter;
  AWSPhone: ResolverTypeWrapper<Scalars['AWSPhone']>;
  AWSTime: ResolverTypeWrapper<Scalars['AWSTime']>;
  AWSTimestamp: ResolverTypeWrapper<Scalars['AWSTimestamp']>;
  AWSURL: ResolverTypeWrapper<Scalars['AWSURL']>;
  AWSURLFilter: AwsurlFilter;
  AWSURLListFilter: AwsurlListFilter;
  AWSURLNullableFilter: AwsurlNullableFilter;
  BatchPayload: ResolverTypeWrapper<BatchPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BooleanFilter: BooleanFilter;
  BooleanListFilter: BooleanListFilter;
  BooleanNullableFilter: BooleanNullableFilter;
  CreateTransactionHistoryInput: CreateTransactionHistoryInput;
  CreateUserHistoryInput: CreateUserHistoryInput;
  DeleteTransactionHistoryInput: DeleteTransactionHistoryInput;
  DeleteUserHistoryInput: DeleteUserHistoryInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  FloatFilter: FloatFilter;
  FloatListFilter: FloatListFilter;
  FloatNullableFilter: FloatNullableFilter;
  FloatOperation: FloatOperation;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntFilter: IntFilter;
  IntListFilter: IntListFilter;
  IntNullableFilter: IntNullableFilter;
  IntOperation: IntOperation;
  Mutation: ResolverTypeWrapper<{}>;
  NullArg: NullArg;
  OrderByArg: OrderByArg;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringFilter: StringFilter;
  StringListFilter: StringListFilter;
  StringNullableFilter: StringNullableFilter;
  Subscription: ResolverTypeWrapper<{}>;
  TableBooleanFilterInput: TableBooleanFilterInput;
  TableFloatFilterInput: TableFloatFilterInput;
  TableIDFilterInput: TableIdFilterInput;
  TableIntFilterInput: TableIntFilterInput;
  TableStringFilterInput: TableStringFilterInput;
  TableTransactionHistoryFilterInput: TableTransactionHistoryFilterInput;
  TableUserHistoryFilterInput: TableUserHistoryFilterInput;
  TransactionHistory: ResolverTypeWrapper<TransactionHistory>;
  TransactionHistoryConnection: ResolverTypeWrapper<TransactionHistoryConnection>;
  UpdateTransactionHistoryInput: UpdateTransactionHistoryInput;
  UpdateUserHistoryInput: UpdateUserHistoryInput;
  User: ResolverTypeWrapper<User>;
  UserConnectOrCreateInput: UserConnectOrCreateInput;
  UserCreateInput: UserCreateInput;
  UserCreateManyInput: UserCreateManyInput;
  UserExtendedWhereUniqueInput: UserExtendedWhereUniqueInput;
  UserFilter: UserFilter;
  UserHistory: ResolverTypeWrapper<UserHistory>;
  UserHistoryConnection: ResolverTypeWrapper<UserHistoryConnection>;
  UserInfo: ResolverTypeWrapper<UserInfo>;
  UserInfoConnectOrCreateInput: UserInfoConnectOrCreateInput;
  UserInfoCreateInput: UserInfoCreateInput;
  UserInfoCreateManyInput: UserInfoCreateManyInput;
  UserInfoExtendedWhereUniqueInput: UserInfoExtendedWhereUniqueInput;
  UserInfoFilter: UserInfoFilter;
  UserInfoOperationInput: UserInfoOperationInput;
  UserInfoOrderByInput: UserInfoOrderByInput;
  UserInfoScalarWhereInput: UserInfoScalarWhereInput;
  UserInfoUpdateInput: UserInfoUpdateInput;
  UserInfoUpdateManyInput: UserInfoUpdateManyInput;
  UserInfoUpdateUniqueInput: UserInfoUpdateUniqueInput;
  UserInfoUpsertInput: UserInfoUpsertInput;
  UserInfoUpsertUniqueInput: UserInfoUpsertUniqueInput;
  UserInfoUserCreateNestedInput: UserInfoUserCreateNestedInput;
  UserInfoUserUpdateNestedInput: UserInfoUserUpdateNestedInput;
  UserInfoWhereInput: UserInfoWhereInput;
  UserInfoWhereInputWithoutNullables: UserInfoWhereInputWithoutNullables;
  UserInfoWhereUniqueInput: UserInfoWhereUniqueInput;
  UserOrderByInput: UserOrderByInput;
  UserScalarWhereInput: UserScalarWhereInput;
  UserUpdateInput: UserUpdateInput;
  UserUpdateManyInput: UserUpdateManyInput;
  UserUpdateUniqueInput: UserUpdateUniqueInput;
  UserUpsertInput: UserUpsertInput;
  UserUpsertUniqueInput: UserUpsertUniqueInput;
  UserUserInfoCreateNestedInput: UserUserInfoCreateNestedInput;
  UserUserInfoUpdateNestedInput: UserUserInfoUpdateNestedInput;
  UserWhereInput: UserWhereInput;
  UserWhereInputWithoutNullables: UserWhereInputWithoutNullables;
  UserWhereUniqueInput: UserWhereUniqueInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AWSDateTime: Scalars['AWSDateTime'];
  AWSDateTimeFilter: AwsDateTimeFilter;
  AWSDateTimeListFilter: AwsDateTimeListFilter;
  AWSDateTimeNullableFilter: AwsDateTimeNullableFilter;
  AWSEmail: Scalars['AWSEmail'];
  AWSEmailFilter: AwsEmailFilter;
  AWSEmailListFilter: AwsEmailListFilter;
  AWSEmailNullableFilter: AwsEmailNullableFilter;
  AWSIPAddress: Scalars['AWSIPAddress'];
  AWSJSON: Scalars['AWSJSON'];
  AWSJSONFilter: AwsjsonFilter;
  AWSJSONListFilter: AwsjsonListFilter;
  AWSJSONNullableFilter: AwsjsonNullableFilter;
  AWSPhone: Scalars['AWSPhone'];
  AWSTime: Scalars['AWSTime'];
  AWSTimestamp: Scalars['AWSTimestamp'];
  AWSURL: Scalars['AWSURL'];
  AWSURLFilter: AwsurlFilter;
  AWSURLListFilter: AwsurlListFilter;
  AWSURLNullableFilter: AwsurlNullableFilter;
  BatchPayload: BatchPayload;
  Boolean: Scalars['Boolean'];
  BooleanFilter: BooleanFilter;
  BooleanListFilter: BooleanListFilter;
  BooleanNullableFilter: BooleanNullableFilter;
  CreateTransactionHistoryInput: CreateTransactionHistoryInput;
  CreateUserHistoryInput: CreateUserHistoryInput;
  DeleteTransactionHistoryInput: DeleteTransactionHistoryInput;
  DeleteUserHistoryInput: DeleteUserHistoryInput;
  Float: Scalars['Float'];
  FloatFilter: FloatFilter;
  FloatListFilter: FloatListFilter;
  FloatNullableFilter: FloatNullableFilter;
  FloatOperation: FloatOperation;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  IntFilter: IntFilter;
  IntListFilter: IntListFilter;
  IntNullableFilter: IntNullableFilter;
  IntOperation: IntOperation;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  StringFilter: StringFilter;
  StringListFilter: StringListFilter;
  StringNullableFilter: StringNullableFilter;
  Subscription: {};
  TableBooleanFilterInput: TableBooleanFilterInput;
  TableFloatFilterInput: TableFloatFilterInput;
  TableIDFilterInput: TableIdFilterInput;
  TableIntFilterInput: TableIntFilterInput;
  TableStringFilterInput: TableStringFilterInput;
  TableTransactionHistoryFilterInput: TableTransactionHistoryFilterInput;
  TableUserHistoryFilterInput: TableUserHistoryFilterInput;
  TransactionHistory: TransactionHistory;
  TransactionHistoryConnection: TransactionHistoryConnection;
  UpdateTransactionHistoryInput: UpdateTransactionHistoryInput;
  UpdateUserHistoryInput: UpdateUserHistoryInput;
  User: User;
  UserConnectOrCreateInput: UserConnectOrCreateInput;
  UserCreateInput: UserCreateInput;
  UserCreateManyInput: UserCreateManyInput;
  UserExtendedWhereUniqueInput: UserExtendedWhereUniqueInput;
  UserFilter: UserFilter;
  UserHistory: UserHistory;
  UserHistoryConnection: UserHistoryConnection;
  UserInfo: UserInfo;
  UserInfoConnectOrCreateInput: UserInfoConnectOrCreateInput;
  UserInfoCreateInput: UserInfoCreateInput;
  UserInfoCreateManyInput: UserInfoCreateManyInput;
  UserInfoExtendedWhereUniqueInput: UserInfoExtendedWhereUniqueInput;
  UserInfoFilter: UserInfoFilter;
  UserInfoOperationInput: UserInfoOperationInput;
  UserInfoOrderByInput: UserInfoOrderByInput;
  UserInfoScalarWhereInput: UserInfoScalarWhereInput;
  UserInfoUpdateInput: UserInfoUpdateInput;
  UserInfoUpdateManyInput: UserInfoUpdateManyInput;
  UserInfoUpdateUniqueInput: UserInfoUpdateUniqueInput;
  UserInfoUpsertInput: UserInfoUpsertInput;
  UserInfoUpsertUniqueInput: UserInfoUpsertUniqueInput;
  UserInfoUserCreateNestedInput: UserInfoUserCreateNestedInput;
  UserInfoUserUpdateNestedInput: UserInfoUserUpdateNestedInput;
  UserInfoWhereInput: UserInfoWhereInput;
  UserInfoWhereInputWithoutNullables: UserInfoWhereInputWithoutNullables;
  UserInfoWhereUniqueInput: UserInfoWhereUniqueInput;
  UserOrderByInput: UserOrderByInput;
  UserScalarWhereInput: UserScalarWhereInput;
  UserUpdateInput: UserUpdateInput;
  UserUpdateManyInput: UserUpdateManyInput;
  UserUpdateUniqueInput: UserUpdateUniqueInput;
  UserUpsertInput: UserUpsertInput;
  UserUpsertUniqueInput: UserUpsertUniqueInput;
  UserUserInfoCreateNestedInput: UserUserInfoCreateNestedInput;
  UserUserInfoUpdateNestedInput: UserUserInfoUpdateNestedInput;
  UserWhereInput: UserWhereInput;
  UserWhereInputWithoutNullables: UserWhereInputWithoutNullables;
  UserWhereUniqueInput: UserWhereUniqueInput;
};

export type Aws_Api_KeyDirectiveArgs = { };

export type Aws_Api_KeyDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_Api_KeyDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_AuthDirectiveArgs = {
  cognito_groups: Array<Scalars['String']>;
};

export type Aws_AuthDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_Cognito_User_PoolsDirectiveArgs = {
  cognito_groups?: Maybe<Array<Scalars['String']>>;
};

export type Aws_Cognito_User_PoolsDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_Cognito_User_PoolsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_IamDirectiveArgs = { };

export type Aws_IamDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_IamDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_OidcDirectiveArgs = { };

export type Aws_OidcDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_OidcDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Aws_SubscribeDirectiveArgs = {
  mutations: Array<Scalars['String']>;
};

export type Aws_SubscribeDirectiveResolver<Result, Parent, ContextType = any, Args = Aws_SubscribeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface AwsDateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSDateTime'], any> {
  name: 'AWSDateTime';
}

export interface AwsEmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSEmail'], any> {
  name: 'AWSEmail';
}

export interface AwsipAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSIPAddress'], any> {
  name: 'AWSIPAddress';
}

export interface AwsjsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSJSON'], any> {
  name: 'AWSJSON';
}

export interface AwsPhoneScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSPhone'], any> {
  name: 'AWSPhone';
}

export interface AwsTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSTime'], any> {
  name: 'AWSTime';
}

export interface AwsTimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSTimestamp'], any> {
  name: 'AWSTimestamp';
}

export interface AwsurlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['AWSURL'], any> {
  name: 'AWSURL';
}

export type BatchPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['BatchPayload'] = ResolversParentTypes['BatchPayload']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createManyUserInfos?: Resolver<Maybe<ResolversTypes['BatchPayload']>, ParentType, ContextType, Partial<MutationCreateManyUserInfosArgs>>;
  createManyUsers?: Resolver<Maybe<ResolversTypes['BatchPayload']>, ParentType, ContextType, Partial<MutationCreateManyUsersArgs>>;
  createTransactionHistory?: Resolver<Maybe<ResolversTypes['TransactionHistory']>, ParentType, ContextType, RequireFields<MutationCreateTransactionHistoryArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'data'>>;
  createUserHistory?: Resolver<Maybe<ResolversTypes['UserHistory']>, ParentType, ContextType, RequireFields<MutationCreateUserHistoryArgs, 'input'>>;
  createUserInfo?: Resolver<Maybe<ResolversTypes['UserInfo']>, ParentType, ContextType, RequireFields<MutationCreateUserInfoArgs, 'data'>>;
  deleteManyUserInfos?: Resolver<Maybe<ResolversTypes['BatchPayload']>, ParentType, ContextType, RequireFields<MutationDeleteManyUserInfosArgs, 'where'>>;
  deleteManyUsers?: Resolver<Maybe<ResolversTypes['BatchPayload']>, ParentType, ContextType, RequireFields<MutationDeleteManyUsersArgs, 'where'>>;
  deleteTransactionHistory?: Resolver<Maybe<ResolversTypes['TransactionHistory']>, ParentType, ContextType, RequireFields<MutationDeleteTransactionHistoryArgs, 'input'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'where'>>;
  deleteUserHistory?: Resolver<Maybe<ResolversTypes['UserHistory']>, ParentType, ContextType, RequireFields<MutationDeleteUserHistoryArgs, 'input'>>;
  deleteUserInfo?: Resolver<Maybe<ResolversTypes['UserInfo']>, ParentType, ContextType, RequireFields<MutationDeleteUserInfoArgs, 'where'>>;
  updateManyUserInfos?: Resolver<Maybe<ResolversTypes['BatchPayload']>, ParentType, ContextType, RequireFields<MutationUpdateManyUserInfosArgs, 'where'>>;
  updateManyUsers?: Resolver<Maybe<ResolversTypes['BatchPayload']>, ParentType, ContextType, RequireFields<MutationUpdateManyUsersArgs, 'where'>>;
  updateTransactionHistory?: Resolver<Maybe<ResolversTypes['TransactionHistory']>, ParentType, ContextType, RequireFields<MutationUpdateTransactionHistoryArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'where'>>;
  updateUserHistory?: Resolver<Maybe<ResolversTypes['UserHistory']>, ParentType, ContextType, RequireFields<MutationUpdateUserHistoryArgs, 'input'>>;
  updateUserInfo?: Resolver<Maybe<ResolversTypes['UserInfo']>, ParentType, ContextType, RequireFields<MutationUpdateUserInfoArgs, 'where'>>;
  upsertUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpsertUserArgs, 'create' | 'update' | 'where'>>;
  upsertUserInfo?: Resolver<Maybe<ResolversTypes['UserInfo']>, ParentType, ContextType, RequireFields<MutationUpsertUserInfoArgs, 'create' | 'update' | 'where'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  countUserInfos?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryCountUserInfosArgs>>;
  countUsers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<QueryCountUsersArgs>>;
  getTransactionHistory?: Resolver<Maybe<ResolversTypes['TransactionHistory']>, ParentType, ContextType, RequireFields<QueryGetTransactionHistoryArgs, 'id'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'where'>>;
  getUserHistory?: Resolver<Maybe<ResolversTypes['UserHistory']>, ParentType, ContextType, RequireFields<QueryGetUserHistoryArgs, 'id'>>;
  getUserInfo?: Resolver<Maybe<ResolversTypes['UserInfo']>, ParentType, ContextType, RequireFields<QueryGetUserInfoArgs, 'where'>>;
  listLatestTransactionHistory?: Resolver<Array<ResolversTypes['TransactionHistory']>, ParentType, ContextType>;
  listTransactionHistory?: Resolver<Maybe<ResolversTypes['TransactionHistoryConnection']>, ParentType, ContextType, Partial<QueryListTransactionHistoryArgs>>;
  listUserHistories?: Resolver<Maybe<ResolversTypes['UserHistoryConnection']>, ParentType, ContextType, Partial<QueryListUserHistoriesArgs>>;
  listUserInfos?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserInfo']>>>, ParentType, ContextType, Partial<QueryListUserInfosArgs>>;
  listUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, Partial<QueryListUsersArgs>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  onCreateTransactionHistory?: SubscriptionResolver<Maybe<ResolversTypes['TransactionHistory']>, "onCreateTransactionHistory", ParentType, ContextType, Partial<SubscriptionOnCreateTransactionHistoryArgs>>;
  onCreateUserHistory?: SubscriptionResolver<Maybe<ResolversTypes['UserHistory']>, "onCreateUserHistory", ParentType, ContextType, Partial<SubscriptionOnCreateUserHistoryArgs>>;
  onCreatedManyUserInfos?: SubscriptionResolver<Maybe<ResolversTypes['BatchPayload']>, "onCreatedManyUserInfos", ParentType, ContextType>;
  onCreatedManyUsers?: SubscriptionResolver<Maybe<ResolversTypes['BatchPayload']>, "onCreatedManyUsers", ParentType, ContextType>;
  onCreatedUser?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "onCreatedUser", ParentType, ContextType, Partial<SubscriptionOnCreatedUserArgs>>;
  onCreatedUserInfo?: SubscriptionResolver<Maybe<ResolversTypes['UserInfo']>, "onCreatedUserInfo", ParentType, ContextType, Partial<SubscriptionOnCreatedUserInfoArgs>>;
  onDeleteTransactionHistory?: SubscriptionResolver<Maybe<ResolversTypes['TransactionHistory']>, "onDeleteTransactionHistory", ParentType, ContextType, Partial<SubscriptionOnDeleteTransactionHistoryArgs>>;
  onDeleteUserHistory?: SubscriptionResolver<Maybe<ResolversTypes['UserHistory']>, "onDeleteUserHistory", ParentType, ContextType, Partial<SubscriptionOnDeleteUserHistoryArgs>>;
  onDeletedManyUserInfos?: SubscriptionResolver<Maybe<ResolversTypes['BatchPayload']>, "onDeletedManyUserInfos", ParentType, ContextType>;
  onDeletedManyUsers?: SubscriptionResolver<Maybe<ResolversTypes['BatchPayload']>, "onDeletedManyUsers", ParentType, ContextType>;
  onDeletedUser?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "onDeletedUser", ParentType, ContextType, Partial<SubscriptionOnDeletedUserArgs>>;
  onDeletedUserInfo?: SubscriptionResolver<Maybe<ResolversTypes['UserInfo']>, "onDeletedUserInfo", ParentType, ContextType, Partial<SubscriptionOnDeletedUserInfoArgs>>;
  onMutatedManyUserInfos?: SubscriptionResolver<Maybe<ResolversTypes['BatchPayload']>, "onMutatedManyUserInfos", ParentType, ContextType>;
  onMutatedManyUsers?: SubscriptionResolver<Maybe<ResolversTypes['BatchPayload']>, "onMutatedManyUsers", ParentType, ContextType>;
  onMutatedUser?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "onMutatedUser", ParentType, ContextType, Partial<SubscriptionOnMutatedUserArgs>>;
  onMutatedUserInfo?: SubscriptionResolver<Maybe<ResolversTypes['UserInfo']>, "onMutatedUserInfo", ParentType, ContextType, Partial<SubscriptionOnMutatedUserInfoArgs>>;
  onUpdateTransactionHistory?: SubscriptionResolver<Maybe<ResolversTypes['TransactionHistory']>, "onUpdateTransactionHistory", ParentType, ContextType, Partial<SubscriptionOnUpdateTransactionHistoryArgs>>;
  onUpdateUserHistory?: SubscriptionResolver<Maybe<ResolversTypes['UserHistory']>, "onUpdateUserHistory", ParentType, ContextType, Partial<SubscriptionOnUpdateUserHistoryArgs>>;
  onUpdatedManyUserInfos?: SubscriptionResolver<Maybe<ResolversTypes['BatchPayload']>, "onUpdatedManyUserInfos", ParentType, ContextType>;
  onUpdatedManyUsers?: SubscriptionResolver<Maybe<ResolversTypes['BatchPayload']>, "onUpdatedManyUsers", ParentType, ContextType>;
  onUpdatedUser?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "onUpdatedUser", ParentType, ContextType, Partial<SubscriptionOnUpdatedUserArgs>>;
  onUpdatedUserInfo?: SubscriptionResolver<Maybe<ResolversTypes['UserInfo']>, "onUpdatedUserInfo", ParentType, ContextType, Partial<SubscriptionOnUpdatedUserInfoArgs>>;
  onUpsertedUser?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "onUpsertedUser", ParentType, ContextType, Partial<SubscriptionOnUpsertedUserArgs>>;
  onUpsertedUserInfo?: SubscriptionResolver<Maybe<ResolversTypes['UserInfo']>, "onUpsertedUserInfo", ParentType, ContextType, Partial<SubscriptionOnUpsertedUserInfoArgs>>;
};

export type TransactionHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionHistory'] = ResolversParentTypes['TransactionHistory']> = {
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionHistoryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionHistoryConnection'] = ResolversParentTypes['TransactionHistoryConnection']> = {
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['TransactionHistory']>>>, ParentType, ContextType>;
  nextToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  cognitoid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['AWSDateTime'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['AWSDateTime'], ParentType, ContextType>;
  userInfo?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserInfo']>>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserHistory'] = ResolversParentTypes['UserHistory']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserHistoryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserHistoryConnection'] = ResolversParentTypes['UserHistoryConnection']> = {
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserHistory']>>>, ParentType, ContextType>;
  nextToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInfo'] = ResolversParentTypes['UserInfo']> = {
  cognitoid?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['AWSDateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['AWSDateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AWSDateTime?: GraphQLScalarType;
  AWSEmail?: GraphQLScalarType;
  AWSIPAddress?: GraphQLScalarType;
  AWSJSON?: GraphQLScalarType;
  AWSPhone?: GraphQLScalarType;
  AWSTime?: GraphQLScalarType;
  AWSTimestamp?: GraphQLScalarType;
  AWSURL?: GraphQLScalarType;
  BatchPayload?: BatchPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TransactionHistory?: TransactionHistoryResolvers<ContextType>;
  TransactionHistoryConnection?: TransactionHistoryConnectionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserHistory?: UserHistoryResolvers<ContextType>;
  UserHistoryConnection?: UserHistoryConnectionResolvers<ContextType>;
  UserInfo?: UserInfoResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  aws_api_key?: Aws_Api_KeyDirectiveResolver<any, any, ContextType>;
  aws_auth?: Aws_AuthDirectiveResolver<any, any, ContextType>;
  aws_cognito_user_pools?: Aws_Cognito_User_PoolsDirectiveResolver<any, any, ContextType>;
  aws_iam?: Aws_IamDirectiveResolver<any, any, ContextType>;
  aws_oidc?: Aws_OidcDirectiveResolver<any, any, ContextType>;
  aws_subscribe?: Aws_SubscribeDirectiveResolver<any, any, ContextType>;
};
