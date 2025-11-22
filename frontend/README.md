# Frontend (Vue 3 + Vite + TypeScript)

## Commands
```bash
npm install
npm run dev      # local dev
npm run build    # production build to dist/
```

## Env
- `VITE_API_BASE`: base URL for API Gateway (e.g., `https://dxxx.cloudfront.net/api`)
- `VITE_CDN_IMAGES`: base URL for CloudFront that fronts the image bucket (optional; defaults to empty string).

## Pages
- `/` home grid (uses `Home.vue`)
- `/photo/:id` detail page
- `/admin` upload form with simple password gate
