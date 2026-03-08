# RULES.md — Change Boundaries & Placement (Boilerplate)

No auth, dashboard, or data layer exists yet. These guardrails keep changes predictable. Update this file first if scope expands.

## 1) Routing & Placement
- Public/marketing pages live directly under `app/` (e.g., `app/page.tsx`, `app/about/page.tsx`).
- When a dashboard is added, place authenticated pages under `app/(dashboard)/dashboard/` and reuse the shared dashboard layout there.
- Auth flows (when added) belong in `app/(login)/` with their server actions in the same segment.
- New feature areas should use `app/(dashboard)/<feature>/` once the dashboard shell exists.
- Navigation/sidebar definitions should reside in `app/(dashboard)/dashboard/layout.tsx` once created; add nav entries in the same change as the new page.

## 2) Dashboard Page Pattern (Future)
- Use `app/(dashboard)/dashboard/general/page.tsx` as the reference once it exists (spacing, heading, card wrapper, forms).
- Keep dashboard pages as Server Components; add `'use client'` only when client hooks are needed.
- Do not import Client Components (or hooks like `useState`, `useEffect`, `useActionState`) into Server Components. If a file needs these, add `"use client"` at the top and keep server-only code out of it. Prefer small client islands (e.g., `components/AgentActionPanel.tsx`) that are imported into server pages.
- Preserve the shared sidebar/main shell in `dashboard/layout.tsx`; do not reimplement sidebars per page.

## 3) Backend & Data
- Backend/data layer is absent. When adding data access, centralize helpers in `lib/db/queries.ts` instead of ad-hoc queries.
- Stripe/billing (if introduced) goes in `lib/payments/*`; update server actions and route handlers together.
- Prisma (future): edit `prisma/schema.prisma`; generate migrations via `npx prisma migrate dev --name <feature>` for validation; never hand-edit migration SQL.
- Avoid time- or randomness-dependent values inside React render (`new Date()`, `Date.now()`, `Math.random()`). Precompute in server components, shared constants, or `useEffect` for client-only needs.

## 4) Auth & Security (Future)
- Session/cookie semantics (`lib/auth/session.ts`, `middleware.ts`) require explicit approval once they exist.
- Guard mutations with validated wrappers (`validatedAction*`, `withTeam`) when available; do not bypass them.

## 5) Infrastructure & Scripts
- Treat `scripts/` as infrastructure; adjust only with intent (currently minimal placeholders).
- Respect existing path structure; avoid moving files across route groups without agreement.
- Runtime UI may import only `scripts/error-reporter.ts` (via `components/ErrorReporter.tsx`); keep other scripts server-only.

## 6) Coordination
- Keep shared UI primitives backward compatible or update all consumers.
- For cross-cutting changes, document affected routes/actions in PR/commit notes.
- Avoid creating new `*.md` explainer files unless explicitly requested; prefer updating existing docs.
- Never use double quotes (`"`) in any BuildArtifact title.

# Next.js Server / Client Component Rules (App Router)

## Server vs Client Components
1. Default: files under `app/` are Server Components.
2. Use `"use client"` only when the file needs hooks (`useState`, `useEffect`, etc.), browser APIs (`window`, `document`, `localStorage`), event handlers, or other interactive UI.
3. Keep Server Components for data fetching, API calls, DB access, env vars, and static rendering.

## Server Actions
- Never place `"use server"` inside a Client Component.
- Put all server actions under `app/actions/` and start each file with `"use server"`.
- Return only serializable data (strings, numbers, booleans, objects, arrays); never return JSX.

**Pattern**
```
app/actions/generateDocs.ts
"use server";
export async function generateDocs(formData: FormData) { /* server logic */ }

components/generate-form.tsx
"use client";
import { generateDocs } from "@/app/actions/generateDocs";
export default function GenerateForm() {
  return <form action={generateDocs}>{/* ... */}</form>;
}

app/page.tsx
import GenerateForm from "@/components/generate-form";
export default function Page() { return <GenerateForm />; }
```

## Hydration Safety
- Do not call `new Date()`, `Date.now()`, or `Math.random()` directly in render. Precompute on the server, inside `useEffect`, or as constants.

## Environment Variables
- Access `process.env` only in Server Components or Server Actions. Never expose secrets in Client Components.

## File Structure (target)
```
app/
  actions/
  ai/
  data/
components/
  forms/
  ui/
lib/
  openai.ts
  db.ts
```

## Quick checks before coding
1) Does it need hooks? → mark `"use client"`.
2) Does it touch env vars/APIs/DB? → keep on server.
3) Creating a server action? → place in `app/actions/`, start with `"use server"`.

Never mix client and server logic in the same file.
