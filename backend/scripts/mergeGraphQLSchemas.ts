import { mergeTypeDefs } from '@graphql-tools/merge';
import { readFileSync, readdirSync, writeFileSync, mkdirSync} from 'fs';
import { parse, print, DocumentNode } from 'graphql';
import { join, dirname } from 'path';

const userDefineSchemaDirectory = 'appsync/graphql';
const userDefineSchemaFiles = readdirSync(userDefineSchemaDirectory).filter((file) => file.endsWith('.gql'));

// Parse the schema files into GraphQL DocumentNodes
const userDefineSchemas: DocumentNode[] = userDefineSchemaFiles.map((file) => {
    const schema = readFileSync(join(userDefineSchemaDirectory, file), 'utf8');
    return parse(schema);
});

const dynamoSchemaDirectory = 'appsync/generated/graphql/';
const dynamoSchemaFiles = readdirSync(dynamoSchemaDirectory).filter((file) => file.endsWith('.gql'));

const dynamoSchemas: DocumentNode[] = dynamoSchemaFiles.map((file) => {
    const schema = readFileSync(join(dynamoSchemaDirectory, file), 'utf8');
    return parse(schema);
});

// Base Schema
const schema = parse(readFileSync(join('prisma/generated/prisma-appsync', 'schema.gql'), 'utf8'));

const schemas = userDefineSchemas.concat(dynamoSchemas).concat(schema);

// Merge the schemas
const mergedSchema: DocumentNode = mergeTypeDefs(schemas);

// Convert the merged schema back into a string
const mergedSchemaString: string = print(mergedSchema);

// Output the merged schema string to a file
const outputFile = 'appsync/generated/schema.gql';
mkdirSync(dirname(outputFile), { recursive: true });
writeFileSync(outputFile, mergedSchemaString);

// Save the merged schema to a new file or use it in your application
console.log(`outputFile: ${outputFile}`);