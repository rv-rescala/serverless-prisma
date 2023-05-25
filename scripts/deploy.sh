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

bash $MODULE_PATH/scripts/build.sh $1
amplify push --allow-destructive-graphql-schema-updates -y
cdk deploy --all -c appname=$APPNAME -c env=$ENV -c schema=$APPNAME -c cidr=$CIDR
amplify codegen