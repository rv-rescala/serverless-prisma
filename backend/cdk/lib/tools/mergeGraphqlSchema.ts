import { mergeTypeDefs } from '@graphql-tools/merge';
import { readFileSync, readdirSync, writeFileSync, mkdirSync} from 'fs';
import { parse, print, DocumentNode } from 'graphql';
import { join, dirname } from 'path';

export function mergeSchema(){
    const generatedSchemaPath = join(process.cwd(), 'prisma/generated/prisma-appsync/schema.gql');
    const generatedSchema = parse(readFileSync(generatedSchemaPath, 'utf8'));

    const amplifySchema = parse(readFileSync(join(process.cwd(), 'cdk/lib/amplify-export-backend/api/backend/amplify-appsync-files/schema.graphql'), 'utf8'));

    // Merge the schemas
    const mergedSchema: DocumentNode = mergeTypeDefs([generatedSchema, amplifySchema]);

    // Convert the merged schema back into a string
    const mergedSchemaString: string = print(mergedSchema);

    // Output the merged schema string to a file
    const outputFile = join(process.cwd(), 'prisma/generated/merged-schema.graphql');
    writeFileSync(outputFile, mergedSchemaString);

    // Save the merged schema to a new file or use it in your application
    console.log(`outputFile: ${outputFile}`);
}