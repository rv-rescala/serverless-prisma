# Overview

Fully serverless web architecture on AWS with Prisma and GraphQL.

CDK version 2 and Amplify are used for deployment and development.

Please read this article for more information.

1. [Prisma](https://www.prisma.io/)
2. [Prisma with AWS AppSync](https://github.com/maoosi/prisma-appsync)
3. [Export Amplify backends to CDK and use with existing deployment pipelines](https://aws.amazon.com/jp/blogs/mobile/export-amplify-backends-to-cdk-and-use-with-existing-deployment-pipelines/)
4. [Setup authorization rules](https://docs.amplify.aws/cli-legacy/graphql-transformer/auth/)

## Features

This template provides GraphQL using AWS serveless services.

- AppSync and API gateway support

- DynamoDB and RDS support

- Prisma support for schema management

- Cognito authentication support

All of codes are written by typescript, and deploy it by AWS CDK and Amplify.

## Tech Stack

- [x] Prisma

Prisma is a performant open-source GraphQL ORM-like layer doing the heavy lifting in your GraphQL server.

[Prisma](https://www.prisma.io/)


- [x] Prisma Appsync

Prisma AppSync is a library that makes it easy to implement GraphQL servers with Prisma.

[Prisma with AWS AppSync](https://github.com/maoosi/prisma-appsync)

- [x] GraphQL

GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data.

- [x] AWS AppSync

AWS AppSync is a managed GraphQL service that makes it easy to develop, secure, and scale GraphQL APIs.

# Architecture

![Architecture](./docs/arch.png)

## Access Flow

1. Appsync -> Lambda -> RDS

2. Appsync -> DynamoDB

3. Appsync -> Lambda -> RDS and DynamoDB

## Directory Structure

```bash
├── amplify # for user defined amplify
├── bin  # for user defined cdk
├── lib  # for user defined cdk
├── gatsby # for user defined frontend
├── gqlserver # for local graphql server
├── prisma # for prisma defenition
└── user # user defined directory
    ├── amplify
    │   └── schema.gql amplify # for DynamoDB schema
    ├── lambda
    │   ├── controller # for access controller
    │   ├── handler    # for lambda functions, under this folder functions are depolyed automatically
    │   └── hooks.ts   # for Prisma Hoolks
    └── prisma
        └── shcema.prisma # for RDS/Prisma schema
└── serverless-prisma # modules
```

# Getting Started

## Local Enviroment

1. Initialization

```bash
cdk init --typescript
git clone https://github.com/rv-rescala/serverless-prisma.git
```

1. Install

```bash
./serverless-prisma/install.sh
```

2. Build config

```bash
amplify init # input project name
amplify add api # Select GraphQL, Cognito and API KEY for authentication type
# update .env.dev same as amplify inited project name
make build ENV_FILE=.env.dev
```

3. Test by GraphQL Playground

```bash
make run ENV_FILE=.env.dev
```

## Deploy to AWS

1. Deploy to AWS

```bash
# if you want new env, please run this command:
# amplify env add [env name]
make deploy ENV_FILE=.env.dev
```

2. Create schema
```bash
aws lambda list-functions | grep "migration" # Please check function-name you deployed to AWS which include "migration"
aws lambda invoke --function-name <function-name> output.json 
```

3. Insert data to DynamoDB/RDS via GraphQL API

Please open Appsync and run GraphQL on the editor.

x. Delete all resources

```bash
./destroy.sh .env.dev
```

# Frontend

1. Install dependencies
```bash
cd gatsby
npm install
```

2. run gatsby
```bash
gatsby develop
```

# Customize

## Apprync -> Lambda -> RDS

1. Edit user/prisma/schema.prisma

2. Generate

```bash
bash ./scripts/build.sh [appname] [env] [schema_name] [version]
```

3. Deplpy

```bash
bash ./scripts/deopy.sh [appname] [env] [schema_name] [version]
```

## Appsync -> DynamoDB

1. Edit user/amplify/schema.graphql

2. Generate

```bash
bash ./scripts/build.sh [appname] [env] [schema_name] [version]
```

3. Deplpy

```bash
bash ./scripts/deopy.sh [appname] [env] [schema_name] [version]
```

# Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v10.0.0 or higher)

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) (v1.16.0 or higher)

- [Docker](https://docs.docker.com/get-docker/) (v19.03.0 or higher)


# Reference
1. [Prisma](https://www.prisma.io/)
2. [Prisma with AWS AppSync](https://github.com/maoosi/prisma-appsync)
3. [Amplifyで構築したバックエンドをCDKで出力して既存のデプロイパイプラインで使用する新機能「エクスポート」のご紹介]https://aws.amazon.com/jp/blogs/news/export-amplify-backends-to-cdk-and-use-with-existing-deployment-pipelines/