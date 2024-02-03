import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "todo-list";

function extractAccessTokenFromUrl (url) {
  return url.split('#')[1]
    .split('&')
    .find(el => el.includes("access_token"))
    .split("=")[1];
}

const validateAttributes = (attributes) => {
  const validAttributes = ['title', 'description', 'status'];
  const invalidAttributes = Object.keys(attributes).filter(attr => !validAttributes.includes(attr));

  if (invalidAttributes.length > 0) {
    throw new Error(`Invalid attributes: ${invalidAttributes.join(', ')}`);
  }
};

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      case "GET /token":
        body = {
          // token: extractAccessTokenFromUrl()
          event, context
          };
        break;
      case "DELETE /todos/{id}":
        await dynamo.send(new DeleteCommand({
          TableName: tableName,
          Key: {
            id: parseInt(event.pathParameters.id),
          },
        }));
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /todos/{id}":
        const getResult = await dynamo.send(new GetCommand({
          TableName: tableName,
          Key: {
            id: parseInt(event.pathParameters.id),
          },
        }));
        body = getResult.Item;
        break;
      case "GET /todos":
        const scanResult = await dynamo.send(new ScanCommand({
          TableName: tableName,
        }));
        body = scanResult.Items;
        break;
      case "POST /todos":
        const uniqueId = parseInt(Date.now() + Math.random().toString(36).substr(2, 5));
        const requestJSON = JSON.parse(event.body);
        validateAttributes(requestJSON);
        await dynamo.send(new PutCommand({
          TableName: tableName,
          Item: {
            id: uniqueId,
            title: requestJSON.title,
            description: requestJSON.description,
            status: requestJSON.status,
          },
        }));
        body = `Post item ${uniqueId}`;
        break;
      case "PUT /todos/{id}":
        const updateRequestJSON = JSON.parse(event.body);
        validateAttributes(updateRequestJSON);
        await dynamo.send(new PutCommand({
          TableName: tableName,
          Item: {
            id: parseInt(event.pathParameters.id),
            title: updateRequestJSON.title,
            description: updateRequestJSON.description,
            status: updateRequestJSON.status,
          },
        }));
        body = `Updated item ${event.pathParameters.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};

