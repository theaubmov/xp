# Mobius XP Project

This project now runs against a fully local mock backend and local mock preview surfaces so you can explore the frontend without deployed Gaian services.

## Run

Install dependencies:

```bash
npm install
```

Start the local mock API and the Vite frontend together:

```bash
npm run dev:mock
```

This starts:

- Frontend on `http://localhost:5000`
- Mock API on `http://localhost:8080`

## What Is Mocked

- Experience listing, search, create, update, delete
- Journey builder pages, data sources, triggers, and engagement creation
- CMS apps, templates, dashboards, charts, and media library
- Uploader and token endpoints
- Designer, runtime preview, and dashboard preview surfaces

## Notes

- The mock API is seeded from `fake-api/mock-data.js`.
- Embedded preview routes use `src/views/MockSurfaceView.vue` instead of remote iframes.
