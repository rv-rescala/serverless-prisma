import { Sha256 } from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import fetch, { Request } from 'node-fetch';
import { APIGatewayProxyHandler, APIGatewayEvent, Context } from 'aws-lambda';

const GRAPHQL_ENDPOINT = process.env.APPSYNC_URL as string;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

function handleUser(method: string, event: APIGatewayEvent) {
  switch (method) {
    case 'GET':
      const queryStringParameters = event.queryStringParameters || {};
      console.log("handleUser", method, queryStringParameters);
      if (queryStringParameters && Object.keys(queryStringParameters).length > 0) {
        const key = Object.keys(queryStringParameters)[0];
        const value = queryStringParameters[key];
        return `
        query MyQuery {
          getUser(where: {${key}: "${value}"}) {
            username
            uuid
            email
          }
        }        
        `;
      }
      else {
        return `
        query MyQuery {
          listUsers {
            email
            uuid
            username
          }
        }
      `;
      }
    case 'PUT':
      const body = JSON.parse(event.body || "{}");
      console.log("handleUser", method, body);
      if (body && Object.keys(body).length > 0) {
        return `
        mutation MyMutation {
        createUser(data: ${body}) {
          email
          username
          roles
          uuid
          website
        }
      }    
      `;
      } else{
          throw new Error('PUT method requires a body');
      }
    default:
      throw new Error(`Unsupported method "${method}"`);
  }
}

export const main: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log(`CONTEXT: ${JSON.stringify(_context)}`);

  const pathParameters = event.pathParameters || {};

  let query = ""
  if (pathParameters.proxy === 'user') {
    query = handleUser(event.httpMethod, event);
  }
  console.log("query", query);

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query }),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed as any);

  let statusCode = 200;
  let body: any;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error
        }
      ]
    };
  }

  return {
    statusCode,
    body: JSON.stringify(body)
  };
};
