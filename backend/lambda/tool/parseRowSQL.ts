import * as fs from 'fs';
import * as path from 'path';

export function parseRowSql(rowSql: string) {
    // コメントと空白行を削除
    const cleanedContent = rowSql
      .replace(/\/\*[\s\S]*?\*\/|--.*/g, '') // `/* */`スタイルと`--`スタイルのコメントを削除
      .split('\n')
      .filter(line => line.trim() !== '')
      .join('\n');

    const sqls = cleanedContent.split(';').filter((sql) => sql !== '');
    console.log(sqls);
    return sqls;
}