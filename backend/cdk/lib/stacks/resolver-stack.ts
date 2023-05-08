/* eslint-disable no-new */
import { readFileSync } from 'fs'
import type { Construct } from 'constructs'
import { camelCase, kebabCase, pascalCase } from 'scule'
import { load } from 'js-yaml'
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
import * as appsync_alpha from '@aws-cdk/aws-appsync-alpha'

export interface ResolverStackProps extends StackProps{
    resourcesPrefix: string
    schema: string
    graphqlApi: appsync.CfnGraphQLApi
    resolvers: string
    dataSources: {
        lambda?: appsync.CfnDataSource
        none?: appsync.CfnDataSource
    }
}

export class ResolverStack extends Stack {
    private props: ResolverStackProps;

    constructor(scope: Construct, id: string, props: ResolverStackProps) {
        super(scope, id, props);
        this.props = props;
        this.createResolvers();
    }


    createResolvers() {
        const schema = new appsync.CfnGraphQLSchema(this,  `${this.props}Schema`, {
            apiId: this.props.graphqlApi.attrApiId,
            definition: readFileSync(this.props.schema).toString()
        });
        
        // read resolvers from yaml
        const resolvers = load(readFileSync(this.props.resolvers, 'utf8'));
        
        // create resolvers
        if (Array.isArray(resolvers)) {
            resolvers.forEach((resolver: any) => {
                const resolvername = `${resolver.fieldName}${resolver.typeName}_resolver`

                if (['lambda', 'prisma-appsync'].includes(resolver.dataSource) && this.props.dataSources.lambda) {
                    const cfnResolver = new appsync.CfnResolver(this, resolvername, {
                        apiId: this.props.graphqlApi.attrApiId,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSourceName: this.props.dataSources.lambda.name
                    });
                    cfnResolver.addDependsOn(schema);
                }
                else if (resolver.dataSource === 'none' && this.props.dataSources.none) {
                    const cfnResolver = new appsync.CfnResolver(this, resolvername, {
                        apiId: this.props.graphqlApi.attrApiId,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSourceName: this.props.dataSources.none.name,
                        requestMappingTemplate: resolver.requestMappingTemplate,
                        responseMappingTemplate: resolver.responseMappingTemplate
                    });
                    cfnResolver.addDependsOn(schema);
                }
            });
        }
    }
}