import { getTypeFieldWithResolver } from '../../../scripts/getTypeFieldWithResolver'
import * as appsync_alpha from '@aws-cdk/aws-appsync-alpha'

export type resolverType = {
    typeName: string
    fieldName: string
    requestMappingTemplate: appsync_alpha.MappingTemplate
    responseMappingTemplate: appsync_alpha.MappingTemplate
}

export function getResolverFromAppsyncGenerated(schema: string, schemaFolerPath?: string, resolverFolerPath?: string): resolverType[]  {
    // Get GraphQL Schema
    // "appsync/generated/graphql", "appsync/resolver/common", 
    let schemaPath;
    if(schemaFolerPath){
        schemaPath = `${schemaFolerPath}/${schema}.gql`;
    }
    else{
        schemaPath = `appsync/generated/graphql/${schema}.gql`;
    }

    let resolvers;
    if(resolverFolerPath){
        const resolverPath = `${resolverFolerPath}/${schema}`;
        resolvers = getTypeFieldWithResolver(schemaPath, resolverPath, false);
    }
    else{
        const resolverPath = `appsync/resolver/common`;
        resolvers = getTypeFieldWithResolver(schemaPath, resolverPath, true);
    }

    return resolvers.map((resolver) => {
        return{
            typeName: resolver.typeName,
            fieldName: resolver.fieldName,
            requestMappingTemplate: appsync_alpha.MappingTemplate.fromString(resolver.requestMappingTemplateString),
            responseMappingTemplate: appsync_alpha.MappingTemplate.fromString(resolver.responseMappingTemplateString)
        }
    })
}