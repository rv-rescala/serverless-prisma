#!/bin/bash

if [ $# -ne 4 ]; then
  echo "Usage: $0 <appname> <env> <schema> <version>"
  exit 1
fi

appname=$1
env=$2
schema=$3
version=$4

cp user/prisma/shcema.prisma prisma/schema.prisma
cp user/amplify/schema.gql amplify/backend/api/$appname/schema.graphql
amplify export --out ./cdk/lib/ -y
tsc scripts/mergeGraphqlSchema.ts
node scripts/mergeGraphqlSchema.js $appname
npm run generate
cp ./docker/.env.local ./.env
docker compose up -d
if [ "$version" = "init" ]; then
  npx prisma migrate reset
  rm -rf ./prisma/migrations
fi
echo "remove folders"
find ./prisma/migrations -type d -name "*$version*" -print
find ./prisma/migrations -type d -name "*$version*" -exec rm -rf {} \;
npx prisma migrate dev --name $version
rm ./.env

# geneate migration sql file
migration_path=$(find ./prisma/migrations -type d -name "*$version*" -print)
echo $migration_path

tsc scripts/createMigrateSQL.ts
if [ "$version" = "init" ]; then
  node scripts/createMigrateSQL.js $migration_path $schema 1
else
  node scripts/createMigrateSQL.js $migration_path $schema
fi
