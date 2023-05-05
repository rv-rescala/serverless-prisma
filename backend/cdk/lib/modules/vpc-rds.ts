import { Construct } from "constructs";
import {
  Duration,
  RemovalPolicy,
  aws_iam as iam,
  aws_ec2 as ec2,
  aws_secretsmanager as secretsmanager,
  aws_rds as rds,
} from "aws-cdk-lib";


interface VpcRdsProps {
  envName: string;
  dbUserName: string;
  dbName: string;
  schemaName: string;
}

export class VpcRds {
  public rdsSecretArn: string;
  public iamGetSecretPolicy: iam.ManagedPolicy;
  public dbClientSg: ec2.SecurityGroup;
  public vpc: ec2.Vpc;
  public dbInstance: rds.DatabaseInstance;
  public dbHostName: string;

  constructor(scope: Construct, props: VpcRdsProps) {
    const envName = props.envName;

    // Characters to exclude in passwords set for DB
    const EXCLUDE_CHARACTERS = ":/?#[]@!$&'()*+,;=%\"";

    // VPC
    const vpc = new ec2.Vpc(scope, "Vpc", {
      ipAddresses: ec2.IpAddresses.cidr("10.100.0.0/16"),
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

    // Security Group
    // Security Group for DB Client
    const dbClientSg = new ec2.SecurityGroup(scope, "DbClientSg", {
      vpc,
      securityGroupName: `${envName}-db-client-sg`,
      description: "",
      allowAllOutbound: true,
    });

    // Security Group for Lambda Functions that rotate secret
    const rotateSecretsLambdaFunctionSg = new ec2.SecurityGroup(
      scope,
      "RotateSecretsLambdaFunctionSg",
      {
        vpc,
        securityGroupName: `${envName}-rotate-secrets-lambda-sg`,
        description: "",
        allowAllOutbound: true,
      }
    );

  
    // Security Group for DB
    // Allow access from DB clients, Lambda Functions that rotate the secret and RDS Proxy
    const dbSg = new ec2.SecurityGroup(scope, "DbSg", {
      vpc,
      securityGroupName: `${envName}-db-sg`,
      description: "",
      allowAllOutbound: true,
    });
    dbSg.addIngressRule(
      ec2.Peer.securityGroupId(rotateSecretsLambdaFunctionSg.securityGroupId),
      ec2.Port.tcp(5432),
      "Allow DB access from Lambda Functions that rotate Secrets"
    );
    dbSg.addIngressRule(
      ec2.Peer.securityGroupId(dbClientSg.securityGroupId),
      ec2.Port.tcp(5432),
      "Allow DB access from DB Client"
    );

    // DB Admin User Secret
    const dbAdminSecret = new secretsmanager.Secret(scope, "DbAdminSecret", {
      secretName: `${props.dbName}/AdminLoginInfo`,
      generateSecretString: {
        excludeCharacters: EXCLUDE_CHARACTERS,
        generateStringKey: "password",
        passwordLength: 32,
        requireEachIncludedType: true,
        secretStringTemplate: `{"username": "${props.dbUserName}", "dbname": "${props.dbName}", "schema": "${props.schemaName}"}`,
      },
    });

    // Subnet Group
    const subnetGroup = new rds.SubnetGroup(scope, "SubnetGroup", {
      description: "description",
      vpc,
      subnetGroupName: `${envName}-SubnetGroup`,
      vpcSubnets: vpc.selectSubnets({
        onePerAz: true,
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      }),
    });

    // RDS for PostgreSQL
    const dbInstance = new rds.DatabaseInstance(scope, 'PostgresInstance', {
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


    // DB Client IAM Policy
    const getSecretValueIamPolicy = new iam.ManagedPolicy(
      scope,
      "GetSecretValueIamPolicy",
      {
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
    this.rdsSecretArn = dbAdminSecret.secretArn;
    this.iamGetSecretPolicy = getSecretValueIamPolicy;
    this.dbClientSg = dbClientSg;
    this.dbHostName = dbInstance.dbInstanceEndpointAddress;
  }
}
