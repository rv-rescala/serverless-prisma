import * as fs from "fs";

type DynamoDBSource = {
  tableName: string;
  schemaName: string,
  customeResolverPath?: string;
  customeGqlPath?: string;
};

type LambdaSource = {
  functionName?: string;
  resolvers?: Array<{
    typeName: string;
    fieldName: string;
  }>;
};

type DatasourceResolverType = {
  name: string;
  dynamodbSource?: DynamoDBSource;
  lambdaSource?: LambdaSource;
};

type NameSourcePair = {
  name: string;
  source: string;
}

export class DatasourceResolver {
  public readonly datasourceResolver: DatasourceResolverType[];
  public readonly dynamodbTables: NameSourcePair[]
  public readonly lambdaFunctions: NameSourcePair[]

  constructor(private readonly filePath: string) {
    this.datasourceResolver = this.getDatasourceResolver(this.filePath);

    this.dynamodbTables = this.datasourceResolver.map((dr) => {
      return {
        name: dr.name,
        source: dr.dynamodbSource?.tableName || ""
      }
    }).filter((dr) => dr.source !== "");

    this.lambdaFunctions = this.datasourceResolver.map((dr) => {
      return {
        name: dr.name,
        source: dr.lambdaSource?.functionName || ""
      }
    }).filter((dr) => dr.source !== "");
  }

  getDatasourceResolver(filePath: string): DatasourceResolverType[] {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      const jsonData: DatasourceResolverType[] = JSON.parse(data);
      return jsonData;
    } catch (err) {
      console.error("Error reading JSON file:", err);
      return [];
    }
  }
}

/*
//const dr: datasourceResolver[] = readJsonFile("./appsync/datasourceResolver.json");
//console.log(JSON.stringify(dr));

const datasourceResolver = new DatasourceResolver("./appsync/datasourceResolver.json");
//console.log(JSON.stringify(datasourceResolver.datasourceResolver));
console.log(JSON.stringify(datasourceResolver.dynamodbTables));
//console.log(JSON.stringify(datasourceResolver.lambdaFunctions));
*/