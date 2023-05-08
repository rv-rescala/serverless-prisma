import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { readFileSync } from 'fs'
import {
    aws_appsync as appsync
} from 'aws-cdk-lib'
import { load } from 'js-yaml'

interface ResolverStackProps extends cdk.StackProps {
    envName: string;
    graphqlApi: appsync.CfnGraphQLApi
    schema: string
    resolvers: string
    dataSources: {
        lambda?: appsync.CfnDataSource
        none?: appsync.CfnDataSource
    }
}

export class ResolverStack extends cdk.Stack {
    public readonly props: ResolverStackProps;

    constructor(scope: Construct, id: string, props: ResolverStackProps) {
        super(scope, id, props);
        this.props = props;
        // force update for shema and resolver
        this.fourceUpdate();
        this.createResolvers();
    }

    fourceUpdate() {
        const id = Math.random().toString();
        new cdk.CfnParameter(this, id, {
            type: "String",
            description: "Force Update Param",
            default: "HogeDefaultValue"
        });
    }

    createResolvers() {
        const schema = new appsync.CfnGraphQLSchema(this, `${this.props.envName}CfnSchema`, {
            apiId: this.props.graphqlApi.attrApiId,
            definition: readFileSync(this.props.schema).toString()
        });

        // read resolvers from yaml
        const resolvers = load(readFileSync(this.props.resolvers, 'utf8'));

        // create resolvers
        if (Array.isArray(resolvers)) {
            resolvers.forEach((resolver: any) => {
                const resolvername = `${resolver.fieldName}${resolver.typeName}-resolver`

                if (['lambda', 'prisma-appsync'].includes(resolver.dataSource) && this.props.dataSources.lambda) {
                    const cfnResolver = new appsync.CfnResolver(this, resolvername, {
                        apiId: this.props.graphqlApi.attrApiId,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSourceName: this.props.dataSources.lambda.attrName
                    });
                    cfnResolver.addDependsOn(schema);
                }
                else if (resolver.dataSource === 'none' && this.props.dataSources.none) {
                    const cfnResolver = new appsync.CfnResolver(this, resolvername, {
                        apiId: this.props.graphqlApi.attrApiId,
                        typeName: resolver.typeName,
                        fieldName: resolver.fieldName,
                        dataSourceName: this.props.dataSources.none.attrName,
                        requestMappingTemplate: resolver.requestMappingTemplate,
                        responseMappingTemplate: resolver.responseMappingTemplate
                    });
                    cfnResolver.addDependsOn(schema);
                }
            });
        }
    }
}