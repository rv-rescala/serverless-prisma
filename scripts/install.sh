#!/bin/bash

echo "MODULE_PATH=serverless-prisma" > .installpath
cp -r serverless-prisma/user/ user
cp -r serverless-prisma/gqlserver/ gqlserver
cp -r serverless-prisma/.env.dev .env.dev
cp -r serverless-prisma/gatsby/ gatsby
cp -r serverless-prisma/prisma/ prisma

cp serverless-prisma/scripts/build.sh ./build.sh
cp serverless-prisma/scripts/deploy.sh ./deploy.sh
cp serverless-prisma/scripts/destroy.sh ./destroy.sh
cp serverless-prisma/scripts/gqlserver.sh ./gqlserver.sh

npm install @graphql-tools/merge graphql aws-amplify @aws-amplify/cdk-exported-backend prisma-appsync js-yaml @types/js-yaml scule aws-sdk @aws-sdk/client-secrets-manager