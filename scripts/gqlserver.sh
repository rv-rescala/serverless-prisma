#!/bin/bash

if [ $# -eq 0 ]
then
  echo "Usage: $0 <env file>"
  exit 1
fi

if [ ! -f $1 ]
then
  echo "File not found: $1"
  exit 1
fi

# .env load
export $(cat $1 | xargs)


echo $MODULE_PATH
echo $APPNAME
echo $ENV
echo $VERSION
echo $CIDR

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/$APPNAME?schema=$APPNAME"
export DATABASE_URL

npx prisma generate
npx prisma db push --accept-data-loss
npx vite-node ./gqlserver/server.ts --watch -- --schema prisma/generated/prisma-appsync/schema.gql --handler gqlserver/handler.ts --watchers '[{"watch":["**/*.prisma","*.prisma"],"exec":" npx prisma generate && npx prisma db push --accept-data-loss && touch ./gqlserver/server.ts"}]'