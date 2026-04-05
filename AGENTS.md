# Mobius Agent Notes

## What This Repo Is

`mobius` is the Mobius XP frontend.

It is the experience-management application in this repo set, focused on:
- experience discovery and CRUD
- journey builder flows
- preview, publishing, and performance views
- CMS-style content management
- local embedded mock preview/designer surfaces

This repo is a Vue/Vite application, not Angular like `orchestrator`.
That distinction matters because state, routing, and component patterns are completely different.

## Tech Summary

Main stack:
- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Quasar
- `@braks/vue-flow`
- Axios
- Sass

Practical implication:
- global state is mostly Pinia-driven
- API calls are often abstracted through `src/wrapper/*`
- feature behavior tends to be split across views, components, stores, and wrappers

## Repo Areas That Matter Most

Core app areas:
- `src/views`
- `src/components`
- `src/stores`
- `src/router`
- `src/wrapper`
- `src/interfaces`
- `src/helpers`

Mock/backend areas:
- `fake-api/server.js`
- `fake-api/mock-data.js`
- `netlify/functions/api.js`

Useful supporting files:
- `package.json`
- `README.md`

## Product Shape

Main user-facing surfaces include:
- experiences list and detail flows
- experience builder with journey, previewer, publisher, and performance sections
- CMS views for templates, dashboards, charts, media, and app-store style content
- designer and mock-surface routes used for local preview flows
- settings

Main routes live in `src/router/index.ts`.

Important route facts:
- `/` and `/experiences` both land on the experiences view
- `/experience-builder` redirects to `journey`
- builder routes depend on store state and may load an experience automatically
- `/mock-surface` is used as a local embedded replacement surface

## State And Data Flow

Typical pattern:
- route/view triggers a store action
- store calls a wrapper module under `src/wrapper/*`
- wrapper talks to the API contract expected by the original backend
- fake API mirrors enough of that contract for local development

If behavior feels inconsistent, inspect all three layers:
- view/component
- store
- wrapper

Do not assume the bug is only in the component.

## Fake API Context

This repo is designed to work locally through the fake API.

Run locally:

```bash
npm run dev:mock
```

Default ports:
- frontend: `http://localhost:5000`
- fake API: `http://localhost:8080`

The fake API currently covers:
- experience CRUD
- engagement creation
- searches across experiences/pages/etc.
- pages, data sources, triggers, queries, groups, contexts
- dashboards, graphs, templates, broadcaster apps
- media listing and uploads
- token-like/auth-adjacent endpoints
- mock preview surfaces

If the UI looks broken locally, inspect `fake-api/server.js` before assuming the frontend changed incorrectly.
A lot of “frontend bugs” in this repo are actually incomplete or mismatched mock responses.

## Current Documentation Status

`README.md` was recently expanded.
It now explains:
- what Mobius XP is
- the stack
- main app areas
- local development
- fake API behavior
- working conventions

Use `README.md` first for onboarding, then this file for operational guidance.

## Known Rough Edges

Expect these areas to be fragile:
- builder flows that depend on preloaded store state
- wrapper modules with legacy backend assumptions
- tenant/user/token hardcoding in some API paths and helpers
- CMS/designer surfaces that rely on mock preview behavior
- naming inconsistency between “experience”, “engagement”, “template”, and “broadcast app” domains

Also note:
- some bugs will present as routing or state issues when they are really mock-data shape issues
- some features still reflect backend-first naming rather than clean frontend domain boundaries

## Verification

Safe checks after changes:

```bash
npm run type-check
npm run build
```

Use `npm run dev:mock` for any feature that needs realistic navigation or API-backed UI behavior.

## Working Guidance For The Next Agent

Use this sequence:
1. identify the view/route involved
2. inspect the matching store
3. inspect the wrapper used by that store
4. confirm the fake API endpoint returns the shape the UI expects
5. only then patch the UI or mock data

Additional guidance:
- prefer targeted changes over broad rewrites
- keep fake API responses aligned with existing frontend expectations
- if embedded previews fail, inspect `MockSurfaceView.vue` and the route usage before changing unrelated code
- when documenting or refactoring, keep the distinction clear between the XP app itself and the local mock infrastructure
