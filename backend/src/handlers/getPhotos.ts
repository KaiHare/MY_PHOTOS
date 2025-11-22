import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { ddb, jsonResponse, parsePagination, TABLE_NAME, PhotoItem } from "../common.js";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!TABLE_NAME) return jsonResponse(500, { message: "TABLE_NAME not set" });

  const { page, limit, offset } = parsePagination(event.queryStringParameters ?? {});

  const scanResult = await ddb.send(
    new ScanCommand({
      TableName: TABLE_NAME,
    })
  );

  const items = (scanResult.Items ?? []) as PhotoItem[];
  const sorted = items.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  const paged = sorted.slice(offset, offset + limit);

  return jsonResponse(200, {
    page,
    limit,
    total: items.length,
    data: paged,
  });
};

