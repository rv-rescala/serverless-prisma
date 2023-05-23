"use strict";
exports.__esModule = true;
exports.createMigrateSQL = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
function createMigrateSQL(targetFolder, schenaName, isInit) {
    var migrateSQLPath = (0, path_1.join)(process.cwd(), "".concat(targetFolder, "/migration.sql"));
    var migrateSQL = (0, fs_1.readFileSync)(migrateSQLPath, 'utf8');
    var sql;
    if (isInit) {
        sql = "DROP SCHEMA IF EXISTS \"".concat(schenaName, "\" CASCADE;\nCREATE SCHEMA \"").concat(schenaName, "\";\nSET search_path TO \"").concat(schenaName, "\";\n").concat(migrateSQL);
    }
    else {
        sql = "SET search_path TO \"".concat(schenaName, "\";\n").concat(migrateSQL);
    }
    var outputFile = (0, path_1.join)(process.cwd(), "prisma/migration.sql");
    (0, fs_1.writeFileSync)(outputFile, sql);
    // Save the merged schema to a new file or use it in your application
    console.log("outputFile: ".concat(outputFile));
}
exports.createMigrateSQL = createMigrateSQL;
var targetFolder = process.argv[2];
var schenaName = process.argv[3];
var isInit = process.argv[4];
createMigrateSQL(targetFolder, schenaName, isInit);
