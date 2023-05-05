import * as fs from "fs";
import prettier from "prettier";

const baseScript = `
    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
    
    type Mutation {
        create{{schemaName}}(input: Create{{schemaName}}Input!): {{schemaName}}
        delete{{schemaName}}(input: Delete{{schemaName}}Input!): {{schemaName}}
        update{{schemaName}}(input: Update{{schemaName}}Input!): {{schemaName}}
    }

    type Query {
        get{{schemaName}}(id: ID!): {{schemaName}}
        list{{schemaName}}(filter: Table{{schemaName}}FilterInput, limit: Int, nextToken: String): {{schemaName}}Connection
    }
  
    type Subscription {
        onCreate{{schemaName}}(id: ID, {{columns}}): {{schemaName}} @aws_subscribe(mutations : ["create{{schemaName}}"])
        onDelete{{schemaName}}(id: ID, {{columns}}): {{schemaName}} @aws_subscribe(mutations : ["delete{{schemaName}}"])
        onUpdate{{schemaName}}(id: ID, {{columns}}): {{schemaName}} @aws_subscribe(mutations : ["update{{schemaName}}"])
    }
  
    type {{schemaName}} {
        id: ID!
        {{columns}}
    }
  
    type {{schemaName}}Connection {
        items: [{{schemaName}}]
        nextToken: String
    }
  
    input Create{{schemaName}}Input {
        {{columns}}
    }
  
    input Delete{{schemaName}}Input {
        id: ID!
    }

    input TableBooleanFilterInput {
        eq: Boolean
        ne: Boolean
    }
      
    input TableFloatFilterInput {
        between: [Float]
        contains: Float
        eq: Float
        ge: Float
        gt: Float
        le: Float
        lt: Float
        ne: Float
        notContains: Float
    }
      
    input TableIDFilterInput {
        beginsWith: ID
        between: [ID]
        contains: ID
        eq: ID
        ge: ID
        gt: ID
        le: ID
        lt: ID
        ne: ID
        notContains: ID
      }
      
    input TableIntFilterInput {
        between: [Int]
        contains: Int
        eq: Int
        ge: Int
        gt: Int
        le: Int
        lt: Int
        ne: Int
        notContains: Int
      }
      
    input TableStringFilterInput {
        beginsWith: String
        between: [String]
        contains: String
        eq: String
        ge: String
        gt: String
        le: String
        lt: String
        ne: String
        notContains: String
      }
  
    input Table{{schemaName}}FilterInput {
        id: TableIDFilterInput
        {{columnsWithFilter}}
    }

    input Update{{schemaName}}Input {
        id: ID!
        {{columns}}
    }
`;

type Column = {
    name: string;
    type: string;
};

function formatSchema(schema: string): string {
    const formattedSchema = prettier.format(schema, { parser: "graphql" });
    return formattedSchema;
}

function convertToPascalCase(input: string): string {
    return input
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
}
  
function createSchemaFile(fileName: string, columns: Column[]): void {
    const schemaTemplate = baseScript;
    const schemaName = convertToPascalCase(fileName);

    const columnDefinitions = columns
        .map((column) => `${column.name}: ${column.type}`)
        .join("\n  ");

    const columnsWithFilter = columns
        .map((column) => `${column.name}: Table${column.type}FilterInput`)
        .join("\n\n");

    const schema = schemaTemplate
        .replace(/{{schemaName}}/g, schemaName)
        .replace(/{{columns}}/g, columnDefinitions)
        .replace("{{columnsWithFilter}}", columnsWithFilter)

    const formattedSchema = formatSchema(schema);

    fs.writeFileSync(`./appsync/generated/graphql/${fileName}.gql`, formattedSchema);
}

/*
const fileName = "transaction-history";
const columns: Column[] = [
    { name: "comment", type: "String" },
];

const schema = createSchemaFile(fileName, columns);
console.log(schema);
*/