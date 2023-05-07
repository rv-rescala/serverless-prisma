/* eslint-disable no-new */
import { join } from 'path'
import { App } from 'aws-cdk-lib'
import { AuthorizationType } from '@aws-cdk/aws-appsync-alpha'
import { kebabCase } from 'scule'
import { AppSyncStack } from './appsync'

const app = new App()



app.synth()
