#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib'
import { serverlessPrismaStack } from './serverless-prisma';

const app = new App();
serverlessPrismaStack(app, 'user/lambda/handler/');
app.synth();
