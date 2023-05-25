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

amplify delete
cdk destroy --all -c appname=$APPNAME -c env=$ENV -c schema=$APPNAME -c cidr=$CIDR