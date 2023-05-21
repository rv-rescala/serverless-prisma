#!/bin/bash

if [ $# -ne 4 ]; then
  echo "Usage: $0 <appname> <env> <schema> <version>"
  exit 1
fi

appname=$1
env=$2
schema=$3
version=$4

bash ./scripts/build.sh $appname $env $schema $version
cdk deploy --all -c appname=$appname -c env=$env -c schema=$schema -c version=$version
amplify codegen