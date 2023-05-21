#!/bin/bash

if [ $# -ne 4 ]; then
  echo "Usage: $0 <appname> <env> <schema> <version>"
  exit 1
fi

appname=$1
env=$2
schema=$3
version=$4

cdk destroy --all -c appname=$appname -c env=$env -c schema=$schema -c version=$version