import { Construct } from "constructs";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import {
  Duration
} from 'aws-cdk-lib'

interface ApiFunctionProps extends NodejsFunctionProps {}
interface ExtendsProps {
  filePath: string;
}

const backendPath = "../../../lambda";
const rootPath = "../../../";
const srcPath = `${backendPath}/handler`;

export class LambdaFunction extends NodejsFunction {
  constructor(
    scope: Construct,
    id: string,
    props: ApiFunctionProps,
    extendsProps: ExtendsProps
  ) {
    const defaultEnvironment = {
      NODE_OPTIONS: "--enable-source-maps",
    };
    const environment = {
      ...defaultEnvironment,
      ...props.environment,
    };
    props = {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: path.join(__dirname, srcPath, extendsProps.filePath),
      timeout: Duration.seconds(30),
      memorySize: 512,
      depsLockFilePath: path.join(__dirname, rootPath, "package-lock.json"),
      bundling: {
        target: 'node18',
        minify: true,
        sourceMap: true,
        commandHooks: {
          beforeBundling: (i) => [`cd ${i} && npm ci`],
          afterBundling(i: string, o: string): string[] {
            return [
              `cp ${i}/node_modules/.prisma/client/libquery_engine-rhel-* ${o}`,
              `cp ${i}/prisma/schema.prisma ${o}`,
              `cp ${i}/prisma/migration.sql ${o}`,
            ];
          },
          beforeInstall: () => [],
        },
      },
      role: props.role,
      environment: environment,
      ...props,
    };
    super(scope, id, props);
  }
}
