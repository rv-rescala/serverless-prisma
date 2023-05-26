import { mergeTypeDefs } from '@graphql-tools/merge';
import { readFileSync, readdirSync, writeFileSync, mkdirSync} from 'fs';
import { parse, print, DocumentNode } from 'graphql';
import { join, dirname } from 'path';

export function mergeSchema(path: string, appName: string){
    const generatedSchemaPath = join(process.cwd(), `${path}/prisma/generated/prisma-appsync/schema.gql`);
    console.log("generatedSchemaPath", generatedSchemaPath);
    const generatedSchema = parse(readFileSync(generatedSchemaPath, 'utf8'));

    const amplifySchema = parse(readFileSync(join(process.cwd(), `${path}/cdk/lib/amplify-export-${appName}/api/${appName}/amplify-appsync-files/schema.graphql`), 'utf8'));

    // Merge the schemas
    const mergedSchema: DocumentNode = mergeTypeDefs([generatedSchema, amplifySchema]);

    // Convert the merged schema back into a string
    const mergedSchemaString: string = print(mergedSchema);

    // Output the merged schema string to a file
    //const outputFile = join(process.cwd(), 'prisma/generated/merged-schema.graphql');
    const outputFile = join(process.cwd(), `${path}/cdk/lib/amplify-export-${appName}/api/${appName}/amplify-appsync-files/schema.graphql`);
    writeFileSync(outputFile, mergedSchemaString);

    // Save the merged schema to a new file or use it in your application
    console.log(`outputFile: ${outputFile}`);
}

// コマンドライン引数を取得
const path = process.argv[2];
const appName = process.argv[3];

// 関数を呼び出す
mergeSchema(path, appName);