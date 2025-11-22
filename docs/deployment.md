# Deployment & Local Development

## Local Frontend
1. Install deps: `cd frontend && npm install`.
2. Run dev server: `npm run dev` (default http://localhost:5173).
3. Build for production: `npm run build` (output in `dist/`).
4. Upload `dist/` contents to the static website S3 bucket (`photo-portfolio-<stage>-web`).

## Local Backend
1. Install deps: `cd backend && npm install`.
2. Build TypeScript: `npm run build` (emits to `dist/`).
3. Package each handler: `npm run package:all` (creates zip files under `dist/`). Upload zips to your artifacts bucket referenced in CloudFormation template (`your-artifacts-bucket`).

## Deploy Infrastructure (CloudFormation)
1. Package & upload Lambda zips as above.
2. Deploy stack:
   ```bash
   aws cloudformation deploy \
     --template-file infra/template.yaml \
     --stack-name photo-portfolio-dev \
     --capabilities CAPABILITY_NAMED_IAM \
     --parameter-overrides ProjectPrefix=photo-portfolio Stage=dev
   ```
3. Note outputs: `ApiUrl`, `WebsiteBucketName`, `ImagesBucketName`, `CloudFrontDomain`.

## Configure CloudFront + Frontend
- CloudFront in the template already points to the website bucket for default behavior and `/api/*` to API Gateway.
- Set `VITE_API_BASE=https://<cloudfront-domain>/api` and `VITE_CDN_IMAGES=https://<cloudfront-domain>` in `frontend/.env.production` before building. Example:
  ```bash
  VITE_API_BASE=https://dxxxxx.cloudfront.net/api
  VITE_CDN_IMAGES=https://dxxxxx.cloudfront.net
  ```
- Rebuild frontend (`npm run build`) and sync `dist/` to the website bucket:
  ```bash
  aws s3 sync dist/ s3://photo-portfolio-dev-web --delete
  ```

## Image Bucket Notes
- Uploads go to `original/` prefix via pre-signed URL. You can generate thumbnails and place them under `thumb/` with the same filename if needed (e.g., a separate resize Lambda triggered by S3).

## Testing API locally
- Use AWS SAM CLI or `npm run build` + `sam local invoke` with env vars (`TABLE_NAME`, `BUCKET_NAME`) pointed to localstack or AWS resources.

