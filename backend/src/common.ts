import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
export const s3 = new S3Client({});

export const TABLE_NAME = process.env.TABLE_NAME ?? "";
export const BUCKET_NAME = process.env.BUCKET_NAME ?? "";

export function jsonResponse(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
}

export function parsePagination(query: Record<string, string | undefined>) {
  const page = Math.max(parseInt(query.page ?? "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(query.limit ?? "12", 10), 1), 50);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

export interface PhotoItem {
  photoId: string;
  title: string;
  description?: string;
  tags?: string[];
  location?: string;
  shootDate?: string;
  s3Key: string;
  createdAt: string;
  isPublic: boolean;
}

