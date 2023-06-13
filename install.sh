#!/bin/bash

cp -r serverless-prisma/user/ user
cp -r serverless-prisma/gqlserver/ gqlserver
cp -r serverless-prisma/.env.dev .env.dev
cp -r serverless-prisma/gatsby/ gatsby

mkdir prisma
cp serverless-prisma/Makefile Makefile

npm install @graphql-tools/merge graphql aws-amplify @aws-amplify/cdk-exported-backend prisma-appsync js-yaml @types/js-yaml scule aws-sdk @aws-sdk/client-secrets-manager