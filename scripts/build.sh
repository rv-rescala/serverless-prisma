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

echo $APPNAME
echo $ENV
echo $VERSION
echo $CIDR

# create init
echo "CREATE SCHEMA $APPNAME;" > docker/scripts/initdb/01_init_schema_and_tables.sql
echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/$APPNAME?schema=$APPNAME\"" > docker/.env.local

cp user/prisma/shcema.prisma prisma/schema.prisma
cp user/amplify/schema.gql amplify/backend/api/$APPNAME/schema.graphql
amplify push --allow-destructive-graphql-schema-updates -y
amplify export --out ./cdk/lib/ -y
tsc scripts/mergeGraphqlSchema.ts
node scripts/mergeGraphqlSchema.js $APPNAME
npm run generate
cp ./docker/.env.local ./.env
docker compose up -d
if [ $VERSION = "init" ]; then
  npx prisma migrate reset
  rm -rf ./prisma/migrations
fi
echo "remove folders"
find ./prisma/migrations -type d -name "*$VERSION*" -print
find ./prisma/migrations -type d -name "*$VERSION*" -exec rm -rf {} \;
npx prisma migrate dev --name $VERSION
rm ./.env

# geneate migration sql file
migration_path=$(find ./prisma/migrations -type d -name "*$VERSION*" -print)
echo $migration_path

tsc scripts/createMigrateSQL.ts
if [ "$VERSION" = "init" ]; then
  node scripts/createMigrateSQL.js $migration_path $APPNAME 1
else
  node scripts/createMigrateSQL.js $migration_path $APPNAME
fi
cdk synth --all -c appname=$APPNAME -c env=$ENV -c schema=$APPNAME -c cidr=$CIDR