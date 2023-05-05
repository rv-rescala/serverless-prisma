import { join, dirname } from 'path';
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'fs';
import * as AWS from 'aws-sdk';

const appsync = new AWS.AppSync({ region: 'ap-northeast-1' });
const GQL_OUTPUT_FOLDER = 'appsync/generated/graphql'
const RESOLVER_OUTPUT_FOLDER = 'appsync/generated/resolver'

const main = async (apiId: string, schema_name: string) => {

    const api = await appsync.getGraphqlApi({ apiId: apiId }).promise();
    const schemaData = await appsync.getIntrospectionSchema({ apiId: apiId, format: 'SDL' }).promise();

    const fs = require('fs');
    const schemaString = schemaData.schema?.toString();
    const outputGqlPath = `${GQL_OUTPUT_FOLDER}/${schema_name}.gql`;
    mkdirSync(dirname(outputGqlPath), { recursive: true });
    console.log(`Schema written to: ${outputGqlPath}`);
    fs.writeFileSync(outputGqlPath, schemaString);

    const allTypes = await appsync.listTypes({ apiId: apiId, format: 'SDL' }).promise();

    for (const type of allTypes.types!) {
        const typeName = type.name;
        const resolversForType = await appsync.listResolvers({ apiId: apiId, typeName: typeName! }).promise();
        for (const resolver of resolversForType.resolvers!) {
            const fieldName = resolver.fieldName;
            const resolverData = await appsync.getResolver({ apiId: apiId, typeName: typeName!, fieldName: fieldName! }).promise();
            const requestMappingTemplate = resolverData.resolver!.requestMappingTemplate;
            const responseMappingTemplate = resolverData.resolver!.responseMappingTemplate;

            const outputResolverPath = `${RESOLVER_OUTPUT_FOLDER}/${schema_name}`
            mkdirSync(outputResolverPath, { recursive: true });

            fs.writeFileSync(`${outputResolverPath}/${typeName}.${fieldName}.request.vtl`, requestMappingTemplate);
            fs.writeFileSync(`${outputResolverPath}/${typeName}.${fieldName}.response.vtl`, responseMappingTemplate);
            console.log(`Resolver folder written: ${outputResolverPath}`);
        }
    }
};


const api_id = process.argv[2];
const schema_name = process.argv[3];
main(api_id, schema_name);