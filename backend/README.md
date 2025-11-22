# Backend (AWS Lambda, TypeScript)

## Structure
```
backend/
  package.json
  tsconfig.json
  src/
    common.ts
    handlers/
      getPhotos.ts
      getPhotoById.ts
      getUploadUrl.ts
      savePhotoMeta.ts
```

## Local build
```bash
npm install
npm run build
npm run package:all # produces dist/*.zip to upload to artifact bucket
```

## Environment variables
- `TABLE_NAME`: DynamoDB table name
- `BUCKET_NAME`: image bucket (needed for upload URL generation)

Handlers match the API Gateway routes defined in `infra/template.yaml`.
