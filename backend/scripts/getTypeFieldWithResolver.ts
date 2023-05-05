import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import * as fs from 'fs';

type typeField = {
    typeName: string;
    fieldName: string;
}

function getTypeFields(schemaPath: string): typeField[]{
    const schemaString = fs.readFileSync(schemaPath, 'utf8');

    // Remove all occurrences of the @aws_subscribe directive
    const cleanedSchemaString = schemaString.replace(/@aws_subscribe\([^)]*\)/g, '');
    const schema: GraphQLSchema = makeExecutableSchema({
        typeDefs: cleanedSchemaString,
    });

    const extractTypeFields = (typeName: string, schema: GraphQLSchema): Array<typeField> => {
        const type = schema.getType(typeName);
        if (!type || !(type instanceof GraphQLObjectType)) return [];

        const fields = type.getFields();
        return Object.keys(fields).map((fieldName) => {
            const result: typeField = { 
                "typeName": typeName,
                "fieldName": fieldName,
            };
            return result;
        });
    };

    const queryFields = extractTypeFields('Query', schema);
    const mutationFields = extractTypeFields('Mutation', schema);

    const result = [...queryFields, ...mutationFields];
    return result;
}

type typeResolver = {
    requestMappingTemplateString: string,
    responseMappingTemplateString: string
}

function getResolver(resolverDirPath: string, typeName: string, fieldName?: string): typeResolver{
    let requestMappingTemplatePath;
    let responseMappingTemplatePath;
    if(fieldName) {
        requestMappingTemplatePath = `${resolverDirPath}/${typeName}.${fieldName}.request.vtl`;
        responseMappingTemplatePath = `${resolverDirPath}/${typeName}.${fieldName}.response.vtl`;
    }
    else {
        requestMappingTemplatePath = `${resolverDirPath}/${typeName}.request.vtl`;
        responseMappingTemplatePath = `${resolverDirPath}/${typeName}.response.vtl`;
    }

    const requestMappingTemplate = fs.readFileSync(requestMappingTemplatePath, 'utf8');
    const responseMappingTemplate = fs.readFileSync(responseMappingTemplatePath, 'utf8');
    return {
        "requestMappingTemplateString": requestMappingTemplate,
        "responseMappingTemplateString": responseMappingTemplate,
    }
}

export type typeFieldWithResolver = {
    typeName: string,
    fieldName: string,
    requestMappingTemplateString: string,
    responseMappingTemplateString: string
}

function extractLowerCasePrefix(str: string): string {
  const regex = /^[a-z]+/;
  const match = str.match(regex);
  return match ? match[0] : "";
}

export function getTypeFieldWithResolver(schemaPath: string, resolverDirPath: string, isCommon: boolean): typeFieldWithResolver[]{
    const typeFuncNamePairs = getTypeFields(schemaPath);
    const result = typeFuncNamePairs.map((typeFuncNamePair) => {
        let resolver;
        if(isCommon){
            resolver = getResolver(resolverDirPath, typeFuncNamePair.typeName, extractLowerCasePrefix(typeFuncNamePair.fieldName));
        }
        else{
            resolver = getResolver(resolverDirPath, typeFuncNamePair.typeName, typeFuncNamePair.fieldName);
        }
        return {
            ...typeFuncNamePair,
            ...resolver,
        }
    });
    return result
}


// schemaPath: string, resolverDirPath: string, isCommon: boolean
/*
const schemaPath = `appsync/generated/graphql/transaction-history.gql`;
const resolverDirPath = `appsync/resolver/common`;
const results = getTypeFieldWithResolver(schemaPath, resolverDirPath, true);
console.log(results);
*/