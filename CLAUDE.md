@AGENTS.md

# Ekta Admin — POMS (Port Operations Management System)

Web admin panel for an Inland Container Depot / Port logistics terminal. Real-time
SLA, machine, rail, yard, EXIM/Domestic, ITV, survey, and FMS dashboards backed by
a Node.js REST API. Field data is entered via a sibling Flutter mobile app and
pushed to this panel over WebSockets (Socket.IO). See `docs/SRS.pdf`
(source: POMS_SRS V2.0).

> **Stack note**: The backend is **Node.js** (the SRS originally named Laravel —
> that is superseded). Realtime is a **native Socket.IO server**, not Pusher/Echo.
> Background jobs (alert engine, schedulers) run on a Redis-backed queue
> (e.g. BullMQ). API docs are **OpenAPI/Swagger**. Primary DB remains MySQL.

---

## 1. Project Overview

- **Product**: POMS Admin Panel (web). Replaces an Excel-based SLA tracker covering
  8 departments: Equipment, Utility (DG Sets), Rail, Yard, Survey, EXIM, Domestic,
  ITV, FMS, General/HR.
- **Primary users**: Super Admin, Admin, Department Manager, Field Supervisor,
  Viewer/Auditor. (Operators use the mobile app, not this panel.)
- **Core jobs**: Real-time dashboards, alert configuration, user/role/RBAC
  management, machine + SLA masters, report generation/export, audit log review.
- **Non-goals for this repo**: Mobile data entry, backend business logic, push
  notification dispatch. We consume APIs and WebSocket events only.

## 2. Tech Stack (locked)

- **Framework**: Next.js 16 (App Router, React 19, React Compiler enabled)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 + `tw-animate-css`
- **UI primitives**: shadcn/ui on top of Base UI (`@base-ui/react`)
- **Icons**: lucide-react
- **Data fetching**: TanStack Query v5 + axios
- **Tables**: TanStack Table v8
- **Forms**: react-hook-form + zod (via `@hookform/resolvers`)
- **Client state**: zustand
- **Charts**: recharts
- **Realtime**: socket.io-client (connects to the Node.js Socket.IO gateway)
- **Toasts**: sonner
- **Theming**: next-themes (light/dark)

> ⚠️ Next.js 16 has breaking changes vs. older docs. Before touching routing,
> caching, server actions, or `fetch` semantics, read the relevant doc in
> `node_modules/next/dist/docs/`. Do not assume Next 13/14 behavior.

## 3. Folder Structure (authoritative)

```
src/
  app/                          # App Router. Route groups segregate auth + shell.
    (auth)/                     #   login, forgot-password, reset
    (dashboard)/                #   authenticated shell w/ sidebar + topbar
      layout.tsx                #   guards session, mounts realtime provider
      dashboard/                #   master dashboard (home)
      equipment/                #   RST/ECH/Skid/Forklift
      utility/                  #   DG Sets
      rail/
      yard/
      survey/
      exim/
      domestic/
      itv/
      fms/
      alerts/                   #   active alerts + alert config
      reports/                  #   standard + custom report builder
      users/                    #   users, roles, permissions
      config/                   #   masters: dept, machine, SLA, thresholds, fuel
      audit/
      settings/                 #   profile, notifications, theme
    api/                        # Route handlers ONLY for BFF concerns (uploads,
                                #   server-only proxies). Business APIs live in Laravel.
  components/
    ui/                         # shadcn primitives. Do not hand-edit; regen via CLI.
    layout/                     # AppShell, Sidebar, Topbar, Breadcrumbs
    charts/                     # Recharts wrappers w/ design tokens applied
    data-table/                 # Generic TanStack Table + filters/pagination/search
    forms/                      # Field wrappers bound to RHF + zod
    feedback/                   # EmptyState, ErrorState, LoadingState, AlertBanner
  features/                     # Feature-first. Each feature is self-contained.
    <feature>/
      api/                      #   typed API client + zod schemas + RQ hooks
      components/               #   feature-only components
      hooks/
      store.ts                  #   zustand slice (only if needed)
      types.ts
      index.ts                  #   public surface
  hooks/                        # Shared hooks (useDebounce, useMediaQuery, etc.)
  lib/                          # Pure utilities (fetcher, http, env, cn, formatters)
  providers/                    # QueryClientProvider, ThemeProvider, RealtimeProvider
  schemas/                      # Shared zod schemas (auth, pagination, common enums)
  services/                     # Cross-feature service clients (auth, realtime, FCM)
  store/                        # Global zustand stores (auth session, ui shell)
  stores/                       # ⚠️ duplicate of /store — consolidate into /store.
  constants/                    # Route paths, role keys, alert severities, SLA defaults
  types/                        # Cross-cutting TS types
  utils/                        # Domain-agnostic helpers
  styles/                       # globals.css, tailwind layer extensions
```

Rules:
- Anything tied to one domain (rail, yard, etc.) lives under `features/<x>`.
- Anything reused by ≥2 features moves up to `components/` or `lib/`.
- Pages in `app/` stay thin — compose `features/*` and `components/*`, no business logic.

## 4. Naming Conventions

- **Files**: kebab-case for routes (`equipment/[machineId]/page.tsx`),
  PascalCase for component files (`MachineHealthCard.tsx`),
  camelCase for hooks (`useMachineHours.ts`) and utilities.
- **Components**: PascalCase. One default export per file.
- **Hooks**: `useXxx`. Query hooks `useXxxQuery`, mutations `useXxxMutation`.
- **Types**: PascalCase, suffixed when ambiguous (`MachineDTO`, `MachineRow`,
  `MachineFormValues`).
- **Zod schemas**: `xxxSchema` + inferred `Xxx` type.
- **Constants**: `SCREAMING_SNAKE_CASE` for true constants, `PascalCase` enums
  preferred over string unions only when iteration is needed.
- **Routes**: defined once in `constants/routes.ts`. Never hard-code paths in components.

## 5. Component Architecture

- **Server Components by default**. Add `"use client"` only when the file needs
  state, effects, event handlers, browser APIs, or realtime sockets.
- **Composition over props explosion**: prefer `children` + slot props over 10+
  boolean flags. Variant systems use `class-variance-authority`.
- **Three-tier component model**:
  1. `components/ui` — primitives, no business logic, no fetches.
  2. `components/<group>` (data-table, charts, forms) — generic reusable patterns.
  3. `features/<x>/components` — domain-aware, can fetch and dispatch.
- **No prop drilling > 2 levels** — lift to a feature store, context, or compose differently.
- **Loading / empty / error states are mandatory** for every data view.

## 6. State Management Rules

- **Server state** → TanStack Query. Never mirror it into zustand.
- **UI state** (modals, drawers, filters, sidebar collapsed) → local `useState`
  or a feature-scoped zustand slice.
- **Cross-page global state** (auth session, current user, theme, active alert
  count) → `store/` zustand. Keep slices small and selector-friendly.
- **URL state** for anything shareable/bookmarkable (filters, date ranges,
  pagination, tab). Use `nuqs` pattern or `useSearchParams` + a typed helper.
- **Realtime updates** invalidate or patch RQ caches via `queryClient` inside
  `RealtimeProvider`. Components never subscribe to sockets directly.

## 7. API Handling Standards

- A single axios instance in `lib/http.ts` with: base URL from env, bearer
  token interceptor, 401 → logout + redirect, network error toast hook.
- The Node.js API is REST + OpenAPI-documented. Generate or hand-write types
  from the OpenAPI spec; still re-validate with zod at the boundary.
- Every endpoint has a typed wrapper: `getMachines(params): Promise<Machine[]>`.
- Every response is parsed through a zod schema at the boundary. Never trust
  the wire.
- One RQ hook per endpoint: `useMachinesQuery`, `useCreateMachineMutation`.
- Query keys are arrays starting with the feature: `['equipment','machines',params]`.
- Mutations invalidate the minimum scope (`['equipment','machines']`) — never
  `queryClient.invalidateQueries()` with no key.
- Optimistic updates only where the SRS demands instant feedback (alert ack,
  threshold edits). Otherwise refetch-on-success.
- WebSocket events use the same query keys to keep cache coherent.

## 8. UI / UX Consistency Rules

- One **design token source**: Tailwind theme + CSS variables in `globals.css`.
  No ad-hoc hex codes in components.
- Severity palette is fixed and used everywhere alerts are visualized:
  - `info` = blue, `warning` = amber, `critical` = red, `sos` = red w/ pulse.
  - Encoded as a single CVA variant; do not re-roll per feature.
- All tables share the `components/data-table` shell (search, column filters,
  pagination, density toggle, export).
- All forms share the `components/forms` field wrappers — labels, hints, error
  text, required asterisks must match across the app.
- Empty / error / loading states use the shared components from `components/feedback`.
- Charts share `components/charts` wrappers so legends, tooltips, axis colors,
  and number formatting stay identical.
- Spacing scale: only Tailwind's default + theme extensions. No magic `mt-[13px]`.

## 9. Responsive Design Guidelines

- Mobile-first. Default styles target ≤640px; layer up at `md:` (≥768px) and
  `lg:` (≥1024px). Admin power-use is `xl:` and `2xl:`.
- Sidebar collapses to a sheet (Base UI dialog) below `lg`.
- Data tables get horizontal scroll + sticky first column below `md`; never
  hide critical columns silently.
- Charts shrink to compact variants below `md` (smaller legend, abbreviated axis).
- Touch targets ≥ 40px; alert acknowledge buttons ≥ 44px.

## 10. Git Commit Conventions (Conventional Commits)

```
<type>(<scope>): <subject>

<body — what & why, not how>
```

Types: `feat`, `fix`, `refactor`, `perf`, `chore`, `docs`, `test`, `build`, `ci`, `style`.
Scopes: `equipment`, `rail`, `yard`, `exim`, `itv`, `alerts`, `auth`, `rbac`,
`dashboard`, `reports`, `config`, `ui`, `infra`.

Examples:
- `feat(equipment): machine health grid with realtime status`
- `fix(alerts): SOS overlay was dismissable without ack`
- `refactor(data-table): extract column filter primitives`

Branches: `feat/<scope>-<short>`, `fix/<scope>-<short>`. One PR ≈ one phase
deliverable; squash-merge to `main`.

## 11. Development Workflow

1. Pick the next task from the active phase (§ Implementation Roadmap).
2. Write/extend the zod schema and types FIRST (`features/<x>/api/schemas.ts`).
3. Add the API client wrapper + RQ hook.
4. Build the feature components against the hook.
5. Wire the page in `app/(dashboard)/<route>/page.tsx` — keep it thin.
6. Verify on desktop AND a narrow viewport (≤640) before declaring done.
7. `pnpm lint` + `pnpm build` must pass. Commit. Open PR.
8. Update the feature README in `features/<x>/README.md` if the public surface changed.

## 12. Reusable Component Strategy

- New component proposal must answer: "Is this used in ≥2 features?"
  - Yes → `components/<group>`.
  - No → `features/<x>/components`.
- A primitive moves into `components/ui` only after being adopted in 3+ places
  AND wrapped consistently.
- Document props with JSDoc on the component's TS interface; the IDE is the
  spec.

## 13. Performance Rules

- Keep server components server. Push `"use client"` to the leaves.
- Lazy-load chart-heavy pages and the report builder with `next/dynamic`
  (`{ ssr: false }` where appropriate).
- Use `react-window` / TanStack Table virtualization for any table > 200 rows.
- Stable RQ keys; set sensible `staleTime` per resource (30s for dashboards,
  5min for masters, `Infinity` for enums).
- Never invalidate the entire cache; target keys.
- Images via `next/image`. SVG icons via lucide.
- Avoid client-side date libs on the server; use `Intl.DateTimeFormat`.

## 14. Security Best Practices

- All auth tokens stored as **httpOnly secure cookies** via a Next route
  handler proxy. Never put JWTs in `localStorage`.
- Every authenticated page is gated by the `(dashboard)/layout.tsx` session
  check + a per-route RBAC guard reading from `useAuthStore`.
- RBAC is enforced **server-side too** — the UI gate is convenience, not
  security. The Node.js API re-checks permissions on every request.
- Zod-validate every form payload before send AND every API response after receive.
- CSP, X-Frame-Options, Referrer-Policy set in `next.config.ts` headers.
- No `dangerouslySetInnerHTML` without DOMPurify. Sanitize report HTML before
  PDF export.
- File uploads: type + size check on client, re-check server-side.
- Log only sanitized request metadata; never log tokens, passwords, OTPs.

## 15. Environment Variables

- All env vars validated at boot via `lib/env.ts` (zod-parsed). App refuses to
  start if anything required is missing.
- Prefixes: `NEXT_PUBLIC_` only for values safe to ship to the browser.
- Required:
  - `NEXT_PUBLIC_API_BASE_URL` — Node.js REST API root
  - `NEXT_PUBLIC_WS_URL` — Socket.IO server endpoint
  - `NEXT_PUBLIC_APP_ENV` — `local | staging | production`
  - `SESSION_SECRET` — server-only, signs the auth cookie
  - `INTERNAL_API_TOKEN` — server-only, used by Next route handlers
- Files: `.env.local` (dev, gitignored), `.env.example` (committed, no secrets).
- Never reference `process.env.X` outside `lib/env.ts`. Import from `env`.

## 16. Deployment Notes

- Build: `pnpm build`. Output: standalone Next 16 server.
- Target: Node 20 LTS behind nginx on the production server (Phase 6 deliverable).
- SSL via the platform/nginx — app assumes HTTPS-terminated upstream.
- Health endpoint: `GET /api/health` returns commit SHA + env.
- Cache: Redis-backed in front of the Node.js API for dashboard reads (not our
  concern, but RQ `staleTime` should be tuned with the cache TTL in mind).
- Static assets to S3/CDN; `next.config.ts` `images.remotePatterns` updated to
  match.
- Zero-downtime deploys: build new container, health-check, swap.
- Sentry (or chosen APM) wired before go-live.

## 17. API Conventions (client expectations of the Node.js API)

- REST, versioned under `/api/v1`. Resource-oriented, plural nouns:
  `/machines`, `/machines/:id`, `/machines/:id/hours`.
- Standard verbs: `GET` (read), `POST` (create), `PATCH` (partial update),
  `PUT` (replace, rare), `DELETE` (archive/soft-delete preferred).
- Envelope: `{ data, meta }` on success; `{ error: { code, message, details } }`
  on failure. The axios response interceptor unwraps `data`.
- Pagination: `?page=&pageSize=` → `meta: { page, pageSize, total }`. Cursor
  pagination for the live activity feed.
- Filtering/sorting via query params: `?dept=rail&status=critical&sort=-createdAt`.
- All times are ISO-8601 UTC on the wire; format to IST in the UI layer only.
- Every list endpoint accepts the same filter contract the `DataTable` emits.
- Socket.IO events are namespaced `<entity>.<action>` (e.g. `machine.updated`,
  `alert.created`, `alert.sos`). Payloads carry the full resource + `entityId`.

## 18. Error Handling Conventions

- One axios response interceptor maps HTTP status → typed `AppError`:
  401 → silent refresh then logout; 403 → permission-denied toast; 422 →
  field-level form errors (zod-shaped); 5xx → ErrorState + retry.
- Every route segment has an `error.tsx` boundary; the shell has a global one.
- Mutations surface errors via sonner toast + inline form messages; never
  swallow. Query errors render `<ErrorState onRetry>`.
- Never `catch` and ignore. If recovery is impossible, rethrow to the boundary.
- WebSocket disconnect → show a non-blocking "reconnecting" badge; RQ keeps
  serving last-known cache until reconnect + invalidate.

## 19. Logging Conventions

- Browser: no `console.log` in committed code. Use a thin `lib/logger.ts`
  (`debug|info|warn|error`) gated by `NEXT_PUBLIC_APP_ENV`.
- Forward `warn`/`error` to Sentry with breadcrumbs; scrub tokens, OTPs, PII.
- Next route handlers log structured JSON (request id, route, status, duration);
  never log auth cookies or bodies containing credentials.
- Correlate with backend via an `x-request-id` header generated client-side and
  echoed by the API.

## 20. Testing Standards

- **Unit** (Vitest): pure utils, zod schemas, formatters, RBAC `useCan` logic.
- **Component** (Testing Library): every shared `components/*` primitive +
  feature components with branching states (loading/empty/error/data).
- **Integration** (MSW): feature flows against mocked API contracts — this is
  what unblocks frontend before the Node API is ready.
- **E2E** (Playwright): the critical paths — login, RBAC redirect, ack an SOS
  alert, generate+export a report. Run in CI on PR.
- Coverage gate: 80% on `lib/`, `features/*/api`, and `components/`.
- Contract tests: validate live API responses against zod schemas in a nightly
  job so backend drift is caught early.

## 21. Git Workflow & Branch Strategy

- Trunk-based with short-lived branches off `main`.
- `main` is always deployable; protected (PR + green CI + 1 review to merge).
- Branch names: `feat/<scope>-<short>`, `fix/<scope>-<short>`,
  `chore/<scope>-<short>`. Scope = the § 10 scope list.
- One PR ≈ one phase task. Squash-merge. PR body links the SRS section + phase.
- No direct pushes to `main`. No force-push to shared branches.
- Tag releases `vMAJOR.MINOR.PATCH`; Phase milestones cut a release tag.

## 22. Dynamic RBAC & Permission Architecture

> **Core rule**: Ship every feature fully wired to the permission system from day one,
> even though all roles start with full access. Never hard-code visibility by role name.

### Starting state
During early development every role and department is granted **all permissions** so
every screen is reachable and testable. This is the default seed — not a permanent
design decision.

### How to implement (mandatory pattern)

Every protected UI element, route, and API call must pass through the permission
layer even when that layer currently returns `true` for everyone:

```ts
// ✅ Correct — gate through useCan, even if today it always returns true
const can = useCan()
if (!can('alerts.config.write')) return null

// ❌ Wrong — hard-coded role name, impossible to adjust later
if (currentUser.role === 'super_admin') return <ConfigButton />
```

- **`useCan(permission: string): boolean`** reads the current user's permission set
  from `useAuthStore`. The store is populated from the API response on login — the
  server already knows which permissions apply to this user.
- Permissions are **strings** in `module.resource.action` format, e.g.
  `equipment.hours.write`, `alerts.threshold.edit`, `reports.export`.
- The full permission list lives in `constants/permissions.ts` (single source of
  truth for both the gate component and the sidebar filter).
- **`<RoleGate require="permission.string">`** wraps any UI element that should
  conditionally show/hide. Renders `null` by default when denied; accepts a
  `fallback` prop for alternative content.
- **Server-side**: the Node.js API checks the same permission strings on every
  request via middleware. The UI gate is UX, not security.
- **Sidebar** renders nav items by filtering against the user's permission set — no
  `if role === …` branches.

### How to add a restriction later (zero-code-change pattern)
1. In the database, remove the permission from the role's permission set.
2. The API stops returning that permission in `/auth/me`.
3. `useCan()` returns `false` → the element disappears on the next login.
4. The API middleware also blocks the request.

**No frontend code changes needed.** This is the goal. Any implementation that
requires touching component code to add a permission restriction is wrong.

### Department-scoped access
The same pattern extends to departments. `useCan('rail.dashboard.view')` combined
with `useAuthStore().departments` determines both visibility and which data the API
returns. The API filters by `user_department` FK — the frontend never needs a
`dept === 'rail'` branch.

## 23. Progress & Memory Updates

After completing or updating **any** task, feature, or functionality:

1. **Update `C:\Users\Muskan\.claude\projects\D--\memory\`** — write or update the
   relevant memory file (project progress, feedback, decisions made). Use the
   `project` memory type for phase/feature status.
2. **Update `MEMORY.md`** index if a new memory file was created.
3. The memory entry must record:
   - What was completed (feature name, file paths).
   - Current phase status (e.g. "Phase 1 complete — shell, auth, RBAC live").
   - Any decisions made during the task that are not obvious from the code.
   - What is blocked or next.
4. If a feature is partially done, write a `project` memory entry with status
   `in-progress` so the next session starts with full context.
5. Do this **before** the end-of-turn summary — not as an afterthought.

## 24. Testing Protocol (no screenshots)

When asked to test, verify, or check any feature or change:

### Do this
1. **`pnpm lint`** — must exit 0. Fix any lint errors before reporting pass.
2. **TypeScript** — `pnpm exec tsc --noEmit`. No type errors.
3. **`pnpm build`** — must complete without errors. A passing build is the
   primary definition of "it works" for this project.
4. **Code review** — read the changed files and verify: correct imports, no
   hardcoded values, no `any` casts, no `console.log`, no skipped error handling,
   permission gate present where required, loading/empty/error states present for
   any data view.
5. **Link check** — verify route constants are used (no hard-coded path strings),
   `href` values match `constants/routes.ts` entries.

### Never do this
- Do not take or attach screenshots to prove something works.
- Do not run the dev server and describe what you see visually as a test result.
- Do not report "tested successfully" if lint, tsc, or build has not been run.

### What "test passed" means in this project
> `pnpm lint` exits 0 + `pnpm exec tsc --noEmit` exits 0 + `pnpm build` exits 0
> + code review shows no structural/quality issues.

If any of the three commands fail, fix the issue before declaring the task done.
Report the exact command output (last 20 lines) when surfacing a build result.
