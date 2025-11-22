import { GetCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { ddb, jsonResponse, TABLE_NAME } from "../common.js";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!TABLE_NAME) return jsonResponse(500, { message: "TABLE_NAME not set" });

  const photoId = event.pathParameters?.id;
  if (!photoId) return jsonResponse(400, { message: "photoId is required" });

  const res = await ddb.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { photoId },
    })
  );

  if (!res.Item) return jsonResponse(404, { message: "Not found" });

  return jsonResponse(200, res.Item);
};

