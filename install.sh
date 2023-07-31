#!/bin/bash

if [ -d "user" ]; then
  echo "The directory 'user' already exists."
else
  cp -r serverless-prisma/user/ user
  cp -r serverless-prisma/gqlserver/ gqlserver
  cp -r serverless-prisma/.env.dev .env.dev
  cp -r serverless-prisma/gatsby/ gatsby
  cp -r serverless-prisma/test/ test
  mkdir -p prisma
fi

cp serverless-prisma/Makefile Makefile
npm install @graphql-tools/merge graphql aws-amplify @aws-amplify/cdk-exported-backend prisma-appsync js-yaml @types/js-yaml scule aws-sdk @aws-sdk/client-secrets-manager @mermaid-js/mermaid-cli prisma-erd-generator
