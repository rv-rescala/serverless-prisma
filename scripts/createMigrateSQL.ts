
import { mergeTypeDefs } from '@graphql-tools/merge';
import { readFileSync, readdirSync, writeFileSync, mkdirSync} from 'fs';
import { parse, print, DocumentNode } from 'graphql';
import { join, dirname } from 'path';

export function createMigrateSQL(targetFolder: string, schenaName: string, isInit?: string){
    const migrateSQLPath = join(process.cwd(), `${targetFolder}/migration.sql`);
    const migrateSQL = readFileSync(migrateSQLPath, 'utf8');
    let sql: string
    if(isInit) {
        sql = `DROP SCHEMA IF EXISTS "${schenaName}" CASCADE;
CREATE SCHEMA "${schenaName}";
SET search_path TO "${schenaName}";
${migrateSQL}`
    }
    else {
        sql = `SET search_path TO "${schenaName}";
${migrateSQL}`
    }

    const outputFile = join(process.cwd(), `prisma/migration.sql`);
    writeFileSync(outputFile, sql);
    // Save the merged schema to a new file or use it in your application
    console.log(`outputFile: ${outputFile}`);
}

const targetFolder = process.argv[2];
const schenaName = process.argv[3];
const isInit = process.argv[4];
createMigrateSQL(targetFolder, schenaName, isInit);