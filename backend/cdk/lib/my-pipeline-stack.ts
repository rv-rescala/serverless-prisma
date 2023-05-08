import {
  Stack,
  StackProps,
  aws_appsync as appsync,
  aws_iam as iam,
  aws_lambda as lambda,
  aws_lambda_nodejs as lambdaNodejs,
} from 'aws-cdk-lib'
import { AmplifyStage } from './stages/amplify-stage';
import type { Construct } from 'constructs'
import { PrismaAppsyncStage } from './stages/prisma-appsync-stage';

/**
 * The stack that defines the application pipeline
 */
export class MyPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /*
    const pipeline = new CodePipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'MyCdkPipeline',

       // How it will be built and synthesized
       synth: new ShellStep('Synth', {
         // Where the source can be found
         input: CodePipelineSource.gitHub('<YOUR_GITHUB_USERNAME>/mycdkpipeline', 'main'),
         
         // Install dependencies, build and run cdk synth
         commands: [
           'npm ci',
           'npm run build',
           'npx cdk synth'
         ],
       }),
    });
    */

    // This is where we add the application stages
    //pipeline.addStage(new AmplifyStage(this, "amplifyStage"))
    //pipeline.addStage(new OtherApiStage(this, "otherApiStage"))
    new AmplifyStage(this, "amplifyStage");
    new PrismaAppsyncStage(this, 'prismaAppsyncStage', {});

  }
}
