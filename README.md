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
 cdk  init app --language=typescript
# add serverless-prisma/ to .git ignore
git clone https://github.com/NishiharaEnergy/serverless-prisma.git
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

open http://localhost:4000/graphql or
check the database using pgAdmin(address is written in .env, user=postgres, password=postgres)

4. Test by jest(Prisma Unit Test)

```bash
npx jest -- user-controller.test.ts
```

## Deploy to AWS

1. Deploy to AWS

Update bin/[appname].ts to

```typescript
#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib'
import { ServerlessPrismaStage } from '../serverless-prisma/cdk/lib/serverless-prisma-stage';

const app = new App();
const env = app.node.tryGetContext('env');
const stage = new ServerlessPrismaStage(app, env, {
    userLambdaHandlerPath: 'user/lambda/handler/',
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    }
})
stage.synth();
```

```bash
make init-migration ENV_FILE=.env.dev
# if you want to diff migration, please run this command:
# make diff-deploy ENV_FILE=.env.dev

make deploy ENV_FILE=.env.dev
# if you want to publish new env, please run this command:
# make init-deploy ENV_FILE=.env.dev
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

# ENV profile

# ENV profile

1. Create new VPC and RDS

```bash
APPNAME="Your App Name" # ex. serverless-prisma
STAGE="Stage Name" # ex. dev, prod
CIDR="10.2.0.0/16" # VPC CIDR, ex. 10.2.0.0/16 if you want to use existing VPC, please do not set this value.
VERSION=v1 # version of your app, please do not use "." in this value.
```

2. Create new RDS, using existing VPC

```bash
APPNAME="Your App Name" # ex. serverless-prisma
STAGE="Stage Name" # ex. dev, prod
VERSION=v1 # version of your app, please do not use "." in this value.
VPC_ID="vpc-xxxxxx" # VPC ID, ex. vpc-xxxxxx if you want to use existing VPC, please set this value.
```

3. Using existing VPC and RDS

```bash
APPNAME=demoserverlessprisma
STAGE=staging
VPC_ID=vpc-008d961a15bd9ab12
VERSION=v1
DB_INSTANCE_ENDPOINT_ADDRESS=dev-demoserverlessprismar-devdemoserverlessprismar-iq7hq7zwxmkm.ch3ckmqedqmv.ap-northeast-1.rds.amazonaws.com
DB_INSTANCE_IDENTIFER=dev-demoserverlessprismar-devdemoserverlessprismar-iq7hq7zwxmkm
DB_PASSWORD=PHYTgG4Y7eHX\KbYJuSAgqkIpgHuxT~5
DB_SG_GROUP_ID=sg-0de0280f18aea2a05
DB_CLIENT_SG_GROUP_ID=sg-0a17a0b79d1b44474
```

# Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v10.0.0 or higher)

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) (v1.16.0 or higher)

- [Docker](https://docs.docker.com/get-docker/) (v19.03.0 or higher)


# Reference
1. [Prisma](https://www.prisma.io/)
2. [Prisma with AWS AppSync](https://github.com/maoosi/prisma-appsync)
3. [Amplifyで構築したバックエンドをCDKで出力して既存のデプロイパイプラインで使用する新機能「エクスポート」のご紹介]https://aws.amazon.com/jp/blogs/news/export-amplify-backends-to-cdk-and-use-with-existing-deployment-pipelines/