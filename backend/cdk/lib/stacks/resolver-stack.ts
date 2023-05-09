import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { readFileSync } from 'fs'
import {
    aws_iam as iam,
    aws_appsync as appsync,
    aws_lambda as lambda
} from 'aws-cdk-lib'
import { load } from 'js-yaml'

interface ResolverStackProps extends cdk.StackProps {
    envName: string;
    graphqlApi: appsync.CfnGraphQLApi
    schema: string
    resolvers: string
    lambdaApiRole: iam.Role
    directResolverFn: lambda.Alias
}

export class ResolverStack extends cdk.Stack {
    public readonly props: ResolverStackProps;
    private lambdaDataSource: appsync.CfnDataSource;
    private noneDataSource: appsync.CfnDataSource;
    private id: string;

    constructor(scope: Construct, id: string, props: ResolverStackProps) {
        super(scope, id, props);
        this.props = props;
       
        // force update for resolver
        this.id = Math.floor( Math.random() * 100000 ).toString();
        this.createDataSources();
        this.createResolvers();
    }

    createDataSources() {
        const lambdaDatasourceName =  `${this.props.envName}${this.id}CfnLambdaDatasource`;
        this.lambdaDataSource = new appsync.CfnDataSource(this, lambdaDatasourceName, {
            apiId: this.props.graphqlApi.attrApiId,
            name: lambdaDatasourceName,
            serviceRoleArn: this.props.lambdaApiRole.roleArn,
            type: 'AWS_LAMBDA',
            lambdaConfig: {
                lambdaFunctionArn: this.props.directResolverFn.functionArn
            }
        });

        const noneDatasourceName =  `${this.props.envName}${this.id}CfnNoneDatasource`
        this.noneDataSource = new appsync.CfnDataSource(this, noneDatasourceName, {
            apiId: this.props.graphqlApi.attrApiId,
            name: noneDatasourceName,
            type: 'NONE'
        });
    }

    createResolvers() {
        // force update for shema and resolver
        const schema = new appsync.CfnGraphQLSchema(this, `${this.props.envName}${this.id}CfnSchema`, {
            apiId: this.props.graphqlApi.attrApiId,
            definition: readFileSync(this.props.schema).toString()
        });

        // read resolvers from yaml
        const resolvers = load(readFileSync(this.props.resolvers, 'utf8'));

        // create resolvers
        if (Array.isArray(resolvers)) {
            resolvers.forEach((resolver: any) => {
                const resolvername = `${resolver.fieldName}${resolver.typeName}${this.id}resolver`

                if (['lambda', 'prisma-appsync'].includes(resolver.dataSource)) {
                    const cfnResolver = new appsync.CfnResolver(this, resolvername, {
                        apiId: this.props.graphqlApi.attrApiId,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSourceName: this.lambdaDataSource.attrName
                    });
                    cfnResolver.addDependsOn(schema);
                }
                else if (resolver.dataSource === 'none') {
                    const cfnResolver = new appsync.CfnResolver(this, resolvername, {
                        apiId: this.props.graphqlApi.attrApiId,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSourceName: this.noneDataSource.attrName,
                        requestMappingTemplate: resolver.requestMappingTemplate,
                        responseMappingTemplate: resolver.responseMappingTemplate
                    });
                    cfnResolver.addDependsOn(schema);
                }
            });
        }
    }
}