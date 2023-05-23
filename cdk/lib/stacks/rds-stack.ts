import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { VpcRds } from "../modules/vpc-rds";

interface RDSStackProps extends cdk.StackProps {
  envName: string;
  appName: string;
  schemaName: string;
  cidrRange: string;
}

export class RDSStack extends cdk.Stack {
    public readonly vpcRds: VpcRds;

    constructor(scope: Construct, id: string, props: RDSStackProps) {
      super(scope, id, props);

      const vpcRds = new VpcRds(this, {
        envName: props.envName,
        dbUserName: "appuser",
        dbName: props.appName,
        schemaName: props.schemaName,
        cidrRange: props.cidrRange
      });
      this.vpcRds = vpcRds;
    }
}