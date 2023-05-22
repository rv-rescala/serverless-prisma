
import { AmplifyExportedBackend } from '@aws-amplify/cdk-exported-backend';
import * as path from 'path'
import {
  Stage,
  StageProps,
} from 'aws-cdk-lib'
import type { Construct } from 'constructs'

export class AmplifyStage extends Stage {
  
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    
    // ADD AMPLIFY EXPORTED BACKEND STACK HERE
    const amplifyStack = new AmplifyExportedBackend(this, "amplifyexportedbackend", {
      path: path.resolve(__dirname, '..', 'amplify-export-backend'),
      amplifyEnvironment: "dev"
    })
  }
}