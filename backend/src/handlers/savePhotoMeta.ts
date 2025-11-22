import { PutCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { ddb, jsonResponse, TABLE_NAME } from "../common.js";
import { v4 as uuidv4 } from "uuid";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!TABLE_NAME) return jsonResponse(500, { message: "TABLE_NAME not set" });
  const body = event.body ? JSON.parse(event.body) : {};

  const {
    photoId = uuidv4(),
    title,
    description,
    tags = [],
    location,
    shootDate,
    s3Key,
    isPublic = true,
  } = body;

  if (!title || !s3Key) {
    return jsonResponse(400, { message: "title and s3Key are required" });
  }

  const item = {
    photoId,
    title,
    description,
    tags,
    location,
    shootDate,
    s3Key,
    isPublic,
    createdAt: new Date().toISOString(),
  };

  await ddb.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    })
  );

  return jsonResponse(200, { message: "saved", item });
};

