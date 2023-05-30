"use strict";
exports.__esModule = true;
exports.mergeSchema = void 0;
var merge_1 = require("@graphql-tools/merge");
var fs_1 = require("fs");
var graphql_1 = require("graphql");
var path_1 = require("path");
function mergeSchema(path, appName) {
    var generatedSchemaPath = (0, path_1.join)(process.cwd(), "prisma/generated/prisma-appsync/schema.gql");
    console.log("generatedSchemaPath", generatedSchemaPath);
    var generatedSchema = (0, graphql_1.parse)((0, fs_1.readFileSync)(generatedSchemaPath, 'utf8'));
    var amplifySchema = (0, graphql_1.parse)((0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), "".concat(path, "/cdk/lib/amplify-export-").concat(appName, "/api/").concat(appName, "/amplify-appsync-files/schema.graphql")), 'utf8'));
    // Merge the schemas
    var mergedSchema = (0, merge_1.mergeTypeDefs)([generatedSchema, amplifySchema]);
    // Convert the merged schema back into a string
    var mergedSchemaString = (0, graphql_1.print)(mergedSchema);
    // Output the merged schema string to a file
    //const outputFile = join(process.cwd(), 'prisma/generated/merged-schema.graphql');
    var outputFile = (0, path_1.join)(process.cwd(), "".concat(path, "/cdk/lib/amplify-export-").concat(appName, "/api/").concat(appName, "/amplify-appsync-files/schema.graphql"));
    (0, fs_1.writeFileSync)(outputFile, mergedSchemaString);
    // Save the merged schema to a new file or use it in your application
    console.log("outputFile: ".concat(outputFile));
}
exports.mergeSchema = mergeSchema;
// コマンドライン引数を取得
var path = process.argv[2];
var appName = process.argv[3];
// 関数を呼び出す
mergeSchema(path, appName);
