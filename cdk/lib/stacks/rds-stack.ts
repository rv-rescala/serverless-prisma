import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { VpcRds } from "../modules/vpc-rds";

interface RDSStackProps extends cdk.StackProps {
  envName: string;
  appName: string;
  schemaName: string;
  cidrRange: string;
  vpcid: string;
  instanceEndpointAddress: string;
  instanceIdentifier: string;
  passowrd: string;
  sgGroupId: string;
  cliengSgGroupId: string;
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
        cidrRange: props.cidrRange,
        vpcid: props.vpcid,
        instanceEndpointAddress: props.instanceEndpointAddress,
        instanceIdentifier: props.instanceIdentifier,
        passowrd: props.passowrd,
        sgGroupId: props.sgGroupId,
        cliengSgGroupId: props.cliengSgGroupId,
      });
      this.vpcRds = vpcRds;
    }
}