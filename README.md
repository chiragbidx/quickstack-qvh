# Next.js App Router Boilerplate — Operational Guide

This repository is a minimal Next.js 16 (App Router) starter with React 19, TypeScript, Tailwind-ready PostCSS, and no backend/auth/billing. Use this document as the single operational reference. If anything is unclear: **STOP AND ASK** before proceeding.

---

## 1. Current Scope
- Purpose: baseline UI scaffold for future SaaS features.
- No authentication, database, or API layer is present.
- AI integration default: OpenAI with model `gpt-4o-mini` (override via `OPENAI_MODEL`).
- Env vars: `env.example` now lists `OPENAI_API_KEY` (required for AI calls) and optional `OPENAI_MODEL`.
- Current landing: Panda-themed orange palette, responsive layout with wrapping buttons, and constrained center width (up to ~1600px) while remaining mobile-friendly.
- Client interactivity is isolated to small islands (e.g., `AgentActionPanel`) so the page can stay server-rendered overall.

## First Request Rule
- Ship the first feature directly in `app/page.tsx` before adding new routes or structure.
- Build the requested feature end to end with production-ready integration (AI/dataflow/API/UX). Keep the client island (e.g., `ContractAIDemo` with `"use client"`) handling interactivity while the rest of the landing stays server-rendered and performant.
- Once the production-grade feature works, rebrand the entire page — header, hero, body, footer — to match the feature; polish visuals after functionality is solid.

## 2. Technology Stack
- Next.js 16 App Router (server-first, file-based routing).
- React 19, TypeScript 5 (strict).
- Styling: Tailwind via `@tailwindcss/postcss` pipeline; global CSS in `app/globals.css`.
- Tooling note: `@prisma/client` and `prisma` are pre-added for future data layer work (unused until a schema exists).
- Tooling: ESLint 9 (`eslint-config-next`), PostCSS, Next font loader (Geist).

## 3. Project Structure
```
app/
  layout.tsx        # Root layout, loads fonts, applies globals
  page.tsx          # Public landing page (server component)
  globals.css       # Global styles; Tailwind entrypoint
public/             # Static assets (logos/icons)
scripts/            # Ops helpers (minimal placeholders)
  dev-supervisor.js # Runs Next dev server
  db-init.js        # No-op (no DB)
  git-poll.js       # Polls git origin for branch updates
  error-reporter.ts # Client-safe error forwarder (imported via components/ErrorReporter)
Dockerfile          # Container definition (npm ci, runs dev-supervisor)
eslint.config.mjs   # ESLint configuration
next.config.ts      # Next.js config (minimal)
postcss.config.mjs  # PostCSS plugins (Tailwind-ready)
tsconfig.json       # TypeScript config
package.json        # Scripts and dependencies
package-lock.json   # Locked dependency tree
FILES.md            # Structural index
RULES.md            # Change boundaries (boilerplate)
```

## 4. Install & Run
```bash
npm install
npm run dev   # starts Next.js on localhost:3000
npm run lint  # ESLint
npm run build # production build
```

## 5. Routing & Components
- Public landing page: `app/page.tsx`.
- No route groups exist yet. When adding authenticated/dashboard areas, create `app/(dashboard)/...` and reuse shared layouts there (see RULES.md).
- Keep components server-side by default; add `"use client"` only when required by client hooks/state.

## 6. Styling
- Tailwind is enabled via `app/globals.css` (`@import "tailwindcss";`). There is no standalone `tailwind.config` yet; add one only if needed.
- Limit global styles; prefer component- or route-scoped styles.
- Fonts are loaded through `next/font` (Geist). Keep overrides minimal.
- Landing page uses Panda orange (#FB7232) accents, card-based feature highlights, a gradient hero, and a client-island note panel; buttons and menus wrap on small viewports.

## 7. Environment & Secrets
- Required for AI: set `OPENAI_API_KEY` in `.env.local` (copy from `env.example`).
- Optional: set `OPENAI_MODEL` to override the default `gpt-4o-mini` used by server helpers.
- Add additional env vars by updating `env.example` first; never commit secrets.

## 8. Data & Backend (Absent)
- No Prisma/ORM, no API routes, no database connections. When introducing data access, place server-only helpers under `lib/` and add API routes or server actions within `app/`. Document new contracts in FILES.md and RULES.md.
- Once Prisma is configured (schema + DB envs), add a `postinstall` script of `"prisma generate"` to `package.json` so every install builds the client automatically; keep it disabled until the schema exists to avoid breaking installs.

## 9. Testing (Not Present)
- No tests are included. If adding tests, prefer:
  - Unit: `__tests__/` or co-located `*.test.tsx`
  - E2E: Playwright under `e2e/`
  - Provide lightweight stubs/utilities

## 10. Change Guidelines
- Default to minimal diffs; avoid rewrites.
- Do not move files across route groups without coordination.
- Avoid new Markdown explainer files unless explicitly requested; update existing docs instead.
- Do not introduce time- or randomness-dependent values directly in React render (`Date.now()`, `Math.random()`). Precompute in server components, constants, or `useEffect` if client-only.
- If adding auth, billing, or DB: update RULES.md and FILES.md first, then implement.
- Only `scripts/error-reporter.ts` may be imported into runtime UI (via `components/ErrorReporter.tsx`); keep other scripts server-only.

## 11. Hard Stops
- Unclear requirements or missing context.
- Requests to alter session/cookie behavior (not present) without approval.
- Hand-editing generated migration SQL (when Prisma is added).
- Storing or logging secrets in code or assets.

## 12. Deployment
- Default target: Next.js on Vercel or any Node 18+ host.
- Docker support is not configured. Add a `Dockerfile` only with explicit need and document it.

---

Operate cautiously, keep changes small, and align new features with the documented structure. When uncertain: **STOP AND ASK**.
