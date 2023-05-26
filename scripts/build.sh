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
export $(cat .installpath | xargs)

echo $MODULE_PATH
echo $APPNAME
echo $ENV
echo $VERSION
echo $CIDR

cp user/prisma/shcema.prisma prisma/schema.prisma
cp user/amplify/schema.gql amplify/backend/api/$APPNAME/schema.graphql
amplify export --out $MODULE_PATH/cdk/lib/ -y

# create schema and tables definition
echo "CREATE SCHEMA $APPNAME;" > $MODULE_PATH/docker/scripts/initdb/01_init_schema_and_tables.sql
echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/$APPNAME?schema=$APPNAME\"" > $MODULE_PATH/docker/.env.local
tsc $MODULE_PATH/scripts/mergeGraphqlSchema.ts
node $MODULE_PATH/scripts/mergeGraphqlSchema.js $MODULE_PATH $APPNAME

cp $MODULE_PATH/docker/.env.local .env
npx prisma generate
docker-compose -f $MODULE_PATH/docker-compose.yaml up -d

if [ $VERSION = "init" ]; then
  npx prisma migrate reset
  rm -rf prisma/migrations
fi
echo "remove folders"
find prisma/migrations -type d -name "*$VERSION*" -print
find prisma/migrations -type d -name "*$VERSION*" -exec rm -rf {} \;
npx prisma migrate dev --name $VERSION

# geneate migration sql file
migration_path=$(find prisma/migrations -type d -name "*$VERSION*" -print)
echo $migration_path

tsc $MODULE_PATH/scripts/createMigrateSQL.ts
if [ "$VERSION" = "init" ]; then
  node $MODULE_PATH/scripts/createMigrateSQL.js $migration_path $APPNAME 1
else
  node $MODULE_PATH/scripts/createMigrateSQL.js $migration_path $APPNAME
fi
cdk synth --all -c appname=$APPNAME -c env=$ENV -c schema=$APPNAME -c cidr=$CIDR
rm .env