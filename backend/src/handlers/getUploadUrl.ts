import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { BUCKET_NAME, jsonResponse, s3 } from "../common.js";
import { v4 as uuidv4 } from "uuid";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!BUCKET_NAME) return jsonResponse(500, { message: "BUCKET_NAME not set" });

  const body = event.body ? JSON.parse(event.body) : {};
  const { fileName, fileType } = body;
  if (!fileName || !fileType) {
    return jsonResponse(400, { message: "fileName and fileType are required" });
  }

  const photoId = uuidv4();
  const s3Key = `original/${photoId}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: s3Key,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 900 });

  return jsonResponse(200, { uploadUrl, s3Key, photoId });
};

