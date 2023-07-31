import { Construct } from "constructs";
import {
  Duration,
  RemovalPolicy,
  aws_iam as iam,
  aws_ec2 as ec2,
  aws_secretsmanager as secretsmanager,
  aws_rds as rds
} from "aws-cdk-lib";
import { CfnSecret } from 'aws-cdk-lib/aws-secretsmanager';
import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';

interface VpcRdsProps {
  envName: string;
  dbUserName: string;
  dbName: string;
  schemaName: string;
  cidrRange: string;
  vpcid: string;
  instanceEndpointAddress: string;
  instanceIdentifier: string;
  passowrd: string;
  sgGroupId: string;
  cliengSgGroupId: string;
}

const PORT = 5432
const EXCLUDE_CHARACTERS = "^:~\\/><?#[]@!$&'`-.|{}()*+,;=%\"";

export class VpcRds {
  public rdsSecretArn: string;
  public iamGetSecretPolicy: iam.ManagedPolicy;
  public dbClientSg;
  public vpc;
  public dbInstance;
  public dbHostName: string;

  crearteVPC(scope: Construct, props: VpcRdsProps){
    return new ec2.Vpc(scope, `${props.envName}Vpc`, {
      ipAddresses: ec2.IpAddresses.cidr(props.cidrRange),
      enableDnsHostnames: true,
      enableDnsSupport: true,
      natGateways: 1,
      maxAzs: 2,
      subnetConfiguration: [
        { name: "Public", subnetType: ec2.SubnetType.PUBLIC, cidrMask: 24 },
        {
          name: "Private",
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          cidrMask: 24,
        },
        {
          name: "Isolated",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 24,
        },
      ],
    });
  }

  getRDS(scope: Construct, props: VpcRdsProps){
    const fixedSecretValue = JSON.stringify({
      username: props.dbUserName,
      dbname: props.dbName,
      schema: props.schemaName,
      host: props.instanceEndpointAddress,
      port: PORT,
      password: props.passowrd,
    });

    const dbAdminSecret = new CfnSecret(scope, `${props.envName}DbAdminSecret`, {
      name: `${props.dbName}/${props.envName}AdminLoginInfo`,
      secretString: fixedSecretValue
    });
    const dbAdminSecretString = dbAdminSecret.ref;

    const dbSg = SecurityGroup.fromSecurityGroupId(scope, 'DB_SG_GROUP_ID', props.sgGroupId);
    const dbClientSg = SecurityGroup.fromSecurityGroupId(scope, 'DB_CLIENT_SG_GROUP_ID', props.cliengSgGroupId);

    const dbInstance = rds.DatabaseInstance.fromDatabaseInstanceAttributes(scope, `${props.envName}PostgresInstance`, {
      instanceIdentifier: props.instanceIdentifier,
      instanceEndpointAddress: props.instanceEndpointAddress,
      port: PORT,
      securityGroups: [dbSg],
    });
    return {dbAdminSecretString, dbSg, dbClientSg, dbInstance}
  }

  createRDS(scope: Construct, props: VpcRdsProps, vpc: ec2.IVpc){
      const dbClientSg = new ec2.SecurityGroup(scope, `${props.envName}DbClientSg`, {
        vpc,
        securityGroupName: `${props.envName}-db-client-sg`,
        description: "",
        allowAllOutbound: true,
      });

      // Security Group for Lambda Functions that rotate secret
      const rotateSecretsLambdaFunctionSg = new ec2.SecurityGroup(
        scope,
        `${props.envName}RotateSecretsLambdaFunctionSg`,
        {
          vpc,
          securityGroupName: `${props.envName}-rotate-secrets-lambda-sg`,
          description: "",
          allowAllOutbound: true,
        }
      );

      // Security Group for DB
      // Allow access from DB clients, Lambda Functions that rotate the secret and RDS Proxy
      const dbSg = new ec2.SecurityGroup(scope, `${props.envName}DbSg`, {
        vpc,
        securityGroupName: `${props.envName}-db-sg`,
        description: "",
        allowAllOutbound: true,
      });
      dbSg.addIngressRule(
        ec2.Peer.securityGroupId(rotateSecretsLambdaFunctionSg.securityGroupId),
        ec2.Port.tcp(PORT),
        "Allow DB access from Lambda Functions that rotate Secrets"
      );
      dbSg.addIngressRule(
        ec2.Peer.securityGroupId(dbClientSg.securityGroupId),
        ec2.Port.tcp(PORT),
        "Allow DB access from DB Client"
      );

      const secreatValue = JSON.stringify({
        username: props.dbUserName,
        dbname: props.dbName,
        schema: props.schemaName,
        sgGroupId: dbSg.securityGroupId,
        cliengSgGroupId: dbClientSg.securityGroupId,
        vpcId: vpc.vpcId
      });

      const dbAdminSecret = new secretsmanager.Secret(scope, `${props.envName}DbAdminSecret`, {
        secretName: `${props.dbName}/${props.envName}AdminLoginInfo`,
        generateSecretString: {
          excludeCharacters: EXCLUDE_CHARACTERS,
          generateStringKey: "password",
          passwordLength: 32,
          requireEachIncludedType: true,
          secretStringTemplate: secreatValue,
        },
      });
      const dbAdminSecretString = dbAdminSecret.secretArn;

      // Subnet Group
      console.log("Create new RDS", props.instanceEndpointAddress);
      const subnetGroup = new rds.SubnetGroup(scope, `${props.envName}SubnetGroup`, {
        description: "description",
        vpc,
        subnetGroupName: `${props.envName}-SubnetGroup`,
        vpcSubnets: vpc.selectSubnets({
          onePerAz: true,
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        }),
      });

      // RDS for PostgreSQL
      const dbInstance = new rds.DatabaseInstance(scope, `${props.envName}PostgresInstance`, {
        engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_13 }),
        instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
        vpc,
        securityGroups: [dbSg],
        removalPolicy: RemovalPolicy.DESTROY,
        deleteAutomatedBackups: true,
        allocatedStorage: 5,
        storageType: rds.StorageType.GP2,
        backupRetention: Duration.days(7),
        multiAz: false,
        publiclyAccessible: false,
        subnetGroup: subnetGroup,
        credentials: rds.Credentials.fromSecret(dbAdminSecret),
        databaseName: props.dbName
      });
      return {dbAdminSecretString, dbSg, dbClientSg, dbInstance}
  }

  constructor(scope: Construct, props: VpcRdsProps) {
    const envName = props.envName;

    // check the validity
    if (props.instanceEndpointAddress || props.instanceIdentifier || props.passowrd || props.sgGroupId || props.cliengSgGroupId) {
      if (!props.instanceIdentifier) {
        throw new Error("instanceIdentifier is required when instanceEndpointAddress is provided");
      }
      if (!props.instanceEndpointAddress) {
        throw new Error("instanceEndpointAddress is required when instanceIdentifier is provided");
      }
      if(!props.passowrd) {
        throw new Error("passowrd is required when instanceEndpointAddress is provided");
      }
      if (!props.sgGroupId) {
        throw new Error("sgGroupId is required when instanceEndpointAddress is provided");
      }
      if (!props.cliengSgGroupId) {
        throw new Error("cliengSgGroupId is required when instanceEndpointAddress is provided");
      }
      else if (!props.vpcid) {
        throw new Error("vpcid is required when instanceEndpointAddress is provided");
      }
    }

    // VPC
    let vpc;
    if (props.vpcid) {
      console.log("Get existing vpc", props.vpcid);
      vpc = ec2.Vpc.fromLookup(scope, `${envName}Vpc`, {
        isDefault: false,
        vpcId: props.vpcid
      });
    }
    else {
      console.log("Create new vpc");
      vpc = this.crearteVPC(scope, props);
    }

    // RDS
    let dbInstance;
    let dbAdminSecretString;
    let dbSg;
    let dbClientSg;
    if (props.instanceEndpointAddress && props.instanceIdentifier) {
        console.log("Get existing RDS", props.instanceEndpointAddress);
        ({ dbAdminSecretString, dbSg, dbClientSg, dbInstance } = this.getRDS(scope, props));
    } else {
        ({ dbAdminSecretString, dbSg, dbClientSg, dbInstance } = this.createRDS(scope, props, vpc));
    }
    

    // DB Client IAM Policy
    const getSecretValueIamPolicy = new iam.ManagedPolicy(
      scope,
      `${envName}GetSecretValueIamPolicy`,
      {
        managedPolicyName: `${envName}-GetSecretValueIamPolicy`,
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            resources: ["*"],
            actions: ["secretsmanager:GetSecretValue"],
          }),
        ],
      }
    );

    this.dbInstance = dbInstance;
    this.vpc = vpc;
    this.rdsSecretArn = dbAdminSecretString;
    this.iamGetSecretPolicy = getSecretValueIamPolicy;
    this.dbClientSg = dbClientSg;
    this.dbHostName = dbInstance.dbInstanceEndpointAddress;
    console.log("dbHostName", this.dbHostName);
  }
}