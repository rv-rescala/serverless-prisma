#!/bin/bash

rm -rf prisma
mkdir prisma
echo "MODULE_PATH=serverless-prisma" > .installpath
cp -r serverless-prisma/usertemplate user
cp -r serverless-prisma/.env.dev .env.dev
cp serverless-prisma/scripts/build.sh ./build.sh
cp serverless-prisma/scripts/deploy.sh ./deploy.sh
cp serverless-prisma/scripts/destroy.sh ./destroy.sh
npm install @graphql-tools/merge graphql aws-amplify @aws-amplify/cdk-exported-backend prisma-appsync js-yaml @types/js-yaml scule aws-sdk @aws-sdk/client-secrets-manager
