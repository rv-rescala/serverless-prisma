import type { Construct } from 'constructs'
import type { StackProps } from 'aws-cdk-lib'
import {
    Duration,
    RemovalPolicy,
    Stack,
    aws_appsync as appsync,
    aws_iam as iam,
    aws_lambda as lambda,
    aws_lambda_nodejs as lambdaNodejs,
} from 'aws-cdk-lib'
import { VpcRds } from '../modules/vpc-rds'
import { aws_ec2 } from "aws-cdk-lib"
import { kebabCase, camelCase } from 'scule'
import { join } from 'path'
import { load } from 'js-yaml'


export interface ResolverStackProps {
    resourcesPrefix: string
    graphqlApi: appsync.CfnGraphQLApi
    vpcRds: VpcRds
    schemaPath: string
    resolverPath: string
    lambdaApiRole: iam.Role
    prismaLambda:  lambdaNodejs.NodejsFunction
    directResolverFn: lambda.Alias
}
import { readFileSync } from 'fs'


export class ResolverStack extends Stack {
    private props: ResolverStackProps
    private resourcesPrefix: string
    private resourcesPrefixCamel: string
    private uuid: string
    private lambdaDataSource!: appsync.CfnDataSource
    private noneDataSource!: appsync.CfnDataSource


    constructor(scope: Construct, id: string, tplProps: ResolverStackProps, props?: StackProps) {
        super(scope, id, props)

        // stack naming convention
        this.props = tplProps;
        this.resourcesPrefix = kebabCase(this.props.resourcesPrefix);
        this.resourcesPrefixCamel = camelCase(this.resourcesPrefix);
        this.uuid = Math.floor( Math.random() * 100000 ).toString();

        this.createDataSources();
        this.createResolvers();
    }

    createDataSources() {
        const lambdaDatasourceName =  `${this.props.resourcesPrefix}CfnLambdaDatasource`;
        this.lambdaDataSource = new appsync.CfnDataSource(this, lambdaDatasourceName, {
            apiId: this.props.graphqlApi.attrApiId,
            name: lambdaDatasourceName,
            serviceRoleArn: this.props.lambdaApiRole.roleArn,
            type: 'AWS_LAMBDA',
            lambdaConfig: {
                lambdaFunctionArn: this.props.directResolverFn.functionArn
            }
        });

        const noneDatasourceName =  `${this.props.resourcesPrefix}CfnNoneDatasource`
        this.noneDataSource = new appsync.CfnDataSource(this, noneDatasourceName, {
            apiId: this.props.graphqlApi.attrApiId,
            name: noneDatasourceName,
            type: 'NONE'
        });
    }

    createResolvers() {
        // force update for shema and resolver
        const schema = new appsync.CfnGraphQLSchema(this, `${this.resourcesPrefix}CfnSchema`, {
            apiId: this.props.graphqlApi.attrApiId,
            definition: readFileSync(this.props.schemaPath).toString()
        });
        schema.node.addDependency(this.lambdaDataSource);

        // read resolvers from yaml
        const resolvers = load(readFileSync(this.props.resolverPath, 'utf8'));

        // create resolvers
        if (Array.isArray(resolvers)) {
            resolvers.forEach((resolver: any) => {
                const resolvername = `${resolver.fieldName}${resolver.typeName}resolver`

                if (['lambda', 'prisma-appsync'].includes(resolver.dataSource)) {
                    const cfnResolver = new appsync.CfnResolver(this, resolvername, {
                        apiId: this.props.graphqlApi.attrApiId,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSourceName: this.lambdaDataSource.attrName,
                        kind: "UNIT"
                    });
                    cfnResolver.node.addDependency(schema);
                }
                else if (resolver.dataSource === 'none') {
                    const cfnResolver = new appsync.CfnResolver(this, resolvername, {
                        apiId: this.props.graphqlApi.attrApiId,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSourceName: this.noneDataSource.attrName,
                        requestMappingTemplate: resolver.requestMappingTemplate,
                        responseMappingTemplate: resolver.responseMappingTemplate,
                        kind: "UNIT"
                    });
                    cfnResolver.node.addDependency(schema);
                }
            });
        }
    }
}