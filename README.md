# Mobius XP

Mobius XP is the experience management frontend in the Mobius product suite.

It is a Vue 3 application for building and operating engagement experiences, including:
- experience listing, search, and CRUD
- journey design and builder flows
- preview, publishing, and performance views
- CMS-style pages, media, templates, charts, and dashboards
- embedded local preview surfaces for development

The project is set up to run fully locally with a fake API, so the frontend can be explored without depending on deployed HGR/Gaian services.

## Stack

Core frontend stack:
- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Quasar
- Vue Flow
- Axios
- Sass

The codebase mixes view-level pages, Pinia stores, and API wrapper modules under `src/wrapper`. A lot of product behavior still reflects the original backend contract, so local development is easiest when the fake API is running.

## Main App Areas

High-level app surfaces:
- `Experiences`: list, search, create, edit, delete, and select experiences
- `Experience Builder`: journey, previewer, publisher, and performance tabs
- `CMS`: templates, dashboards, charts, media, and related content management flows
- `Designer`: local preview/designer-oriented view
- `Settings`: app-level configuration surface
- `Mock Surface`: embedded local replacement for remote preview iframes

Main routes are defined in [src/router/index.ts](/home/eyub/projects/mobius-products/mobius/src/router/index.ts).

## Project Structure

Important directories:
- `src/views`: top-level screens such as experiences, CMS, designer, and settings
- `src/components`: reusable UI and feature components
- `src/stores`: Pinia stores for experience, pages, data sources, triggers, and related state
- `src/wrapper`: API wrapper modules grouped by backend domain
- `src/interfaces`: shared TypeScript interfaces and DTOs
- `src/assets`: fonts, images, SVGs, and visual assets
- `fake-api`: local mock backend and seed data
- `netlify/functions/api.js`: Netlify wrapper for the same fake API

## Local Development

Install dependencies:

```bash
npm install
```

Run the frontend only:

```bash
npm run dev
```

Run the frontend together with the local fake backend:

```bash
npm run dev:mock
```

This starts:
- frontend on `http://localhost:5000`
- fake API on `http://localhost:8080`

Run only the fake API:

```bash
npm run fake-api
```

Build for production:

```bash
npm run build
```

Type-check only:

```bash
npm run type-check
```

## Fake API

The local mock backend is intended to cover the main product flows used by the frontend.

Important files:
- [fake-api/server.js](/home/eyub/projects/mobius-products/mobius/fake-api/server.js)
- [fake-api/mock-data.js](/home/eyub/projects/mobius-products/mobius/fake-api/mock-data.js)

It currently provides local behavior for:
- experience list, detail, create, update, and delete
- engagement creation
- journey builder supporting data such as pages, data sources, triggers, queries, groups, and contexts
- CMS templates, broadcaster apps, dashboards, graphs, and media files
- upload and token-style endpoints used by the UI
- embedded preview/designer/dashboard mock surfaces

A Netlify function entrypoint also proxies to the same fake API implementation for hosted/local parity.

## Development Notes

A few practical details matter when working here:
- Many frontend wrappers still assume the original backend shape, naming, and tenant-driven URLs.
- The fake API mirrors those contracts rather than trying to simplify them.
- Embedded preview routes intentionally use `MockSurfaceView.vue` instead of remote iframes.
- Some wrappers still contain legacy hardcoded token/tenant assumptions, so backend-looking bugs may still be local-data issues.

## Recommended Workflow

For most frontend work:
1. run `npm run dev:mock`
2. confirm the view is using mock data rather than waiting on a remote dependency
3. make the smallest change in the relevant view/component/store/wrapper
4. run `npm run build` or `npm run type-check`

If something looks broken in the builder or CMS flows, inspect the matching wrapper in `src/wrapper` and the corresponding endpoint in `fake-api/server.js` before assuming the UI is wrong.
