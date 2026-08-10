# Express + React Conversion — Design

**Date:** 2026-08-10

## Purpose

Convert the current single static `index.html` (Lean & Strong — Full Program, ~1340 lines) into a simple Express + React application. The conversion is a **faithful port**: identical content, identical visual design, identical interactive behavior (tabs, day nav, primer accordion). No new features.

## Decisions

- **Express role:** Serves a small REST API returning the workout program as JSON, plus the built React app in production.
- **Tooling:** Vite + React (client), TypeScript throughout.
- **Repo layout:** Monorepo with a single `package.json`.
- **Language:** TypeScript for server and client.
- **Data:** All workout content lives in a structured, typed data file on the server. React renders it.
- **Design fidelity:** Same CSS, same layout, pixel-identical look.

## Architecture

### Project structure

```
2026-workout-routine/
├── package.json            # single package; scripts run both server & client
├── tsconfig.json           # shared compiler options
├── server/
│   ├── index.ts            # Express app
│   ├── data/
│   │   └── program.ts      # ALL workout content as typed data
│   └── types.ts            # Program types (shared shape)
└── client/
    ├── index.html
    ├── vite.config.ts      # proxy /api → Express during dev
    ├── tsconfig.json
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── api.ts          # fetch wrapper
        ├── styles.css      # existing CSS, converted to a file
        └── components/
            ├── TabNav.tsx
            ├── DayNav.tsx
            ├── DayPanel.tsx
            ├── ExerciseCard.tsx
            ├── PrimerAccordion.tsx
            ├── HomeRoutine.tsx
            └── MetaCard.tsx
```

### Scripts

- `npm run dev` — runs Vite (client on :5173) + Express (server on :3001) concurrently; Vite proxies `/api` → :3001.
- `npm run build` — `tsc` typecheck + Vite production build to `client/dist`.
- `npm start` — Express serves `client/dist` statically + the API.

### Migration of index.html

- CSS → `client/src/styles.css` (verbatim, including `:root` variables, component classes, media queries).
- Markup → structured data in `server/data/program.ts` + React components.
- Inline JS (tab/day/primer toggles) → React state.

## Data model

All content lives in `server/data/program.ts`. Types in `server/types.ts`, consumed by both server and client.

```ts
type Program = {
  title: string;
  sub: string;
  tabs: Tab[];
}

type Tab = {
  id: string;                  // 'p1' | 'home' | 'p2'
  label: string;               // nav label
  kind: 'phase' | 'home';
  phaseBar?: string;           // Phase 2 intro bar
  dayTabs?: { id: string; label: string }[];   // 4 days for phases
  days?: Day[];
  home?: HomeRoutine;          // only for 'home' tab
}

type Day = {
  id: string;                  // 'p1d0' ...
  eyebrow: string;             // "Phase 1 · Day 1 · Monday"
  title: string;
  sub: string;
  meta: { label: string; value: string }[];   // duration/tempo/rest cards
  sections: Section[];
}

type Section = {               // one labeled block per day
  label?: string;              // e.g. "Warm-up", "Strength block A"
  station?: string;            // station badge
  rest?: string;               // rest bar (green)
  info?: string;               // info bar (blue)
  primer?: Primer;             // accordion component
  exercises?: Exercise[];
}

type Exercise = {
  num: string;                 // "1", "A", "B" ...
  name: string;
  detail: string;
  alt?: string;                // Alt A/B lines (rendered with <br>)
  why?: string;                // green "why" callout
  tags?: { text: string; tone: 'green'|'purple'|'amber'|'slate'|'coral' }[];
}

type Primer = {
  recommendedLabel: string;    // "Recommended — Day 1"
  steps: { num: string; name: string; detail: string }[];
  menuLabel: string;           // "Full primer menu — choose any 2–3"
  menuItems: { name: string; dose: string; cue: string }[];
}

type HomeRoutine = {
  infoBars: string[];
  blocks: { num: number; title: string; time: string;
            exercises: { num: number; name: string; detail: string }[] }[];
}
```

Notes:

- Each `Section` renders its optional elements in order (station badge, rest/info bar, primer, exercises) — matching how the HTML groups them. A section may include multiple (e.g. station + rest + exercises).
- All current content is transcribed 1:1: every exercise, tag, primer step, note, and alt.
- Type safety flows end-to-end: React consumes the same `types.ts` as the server.

## Components & rendering

```
App
├── <header>  page title + sub (from Program)
├── TabNav         → active tab state (p1 / home / p2)
└── content
    ├── PhasePanel        (kind === 'phase')
    │   ├── DayNav        → active day state
    │   └── DayPanel
    │       ├── DayHeader (eyebrow / title / sub)
    │       ├── MetaRow   → MetaCard[]
    │       └── Section[] → render each section:
    │           ├── SectionLabel
    │           ├── StationBadge (if station)
    │           ├── RestBar / InfoBar / PhaseBar (if present)
    │           ├── PrimerAccordion (if primer)
    │           └── ExerciseCard[] (if exercises)
    └── HomePanel         (kind === 'home')
        ├── InfoBar
        └── HomeBlock[]   → numbered header + HomeExercise[]
```

Behavior preserved from the original JS:

- **TabNav** — clicking switches the active tab (was `showTab`).
- **DayNav** — clicking switches the active day within its phase (was `showDay`).
- **PrimerAccordion** — click header toggles the "full menu" open/closed, chevron rotates (was `togglePrimer`); per-instance open state via local `useState`.

Data flow:

- `App` fetches `GET /api/program` once on mount → stores in state → passes down.
- Loading spinner while fetching; error message with retry button on fetch failure.
- No client-side persistence; state is purely in-memory like the current page.

## API & error handling

### API

- `GET /api/program` — returns the full `Program` JSON (imported from `server/data/program.ts`).
- `GET /api/health` — returns `{ status: 'ok' }`.
- Express imports the data module directly (in-memory, no DB).

### Error handling

- Client: fetch fails → render error state with a "Retry" button that re-runs the fetch.
- Server: JSON content-type middleware; 404 handler for unknown routes (except SPA fallback); catch-all error handler returning `{ error }` JSON.

### Production serving

- Express serves `client/dist` statically.
- SPA fallback: unknown non-API GET routes return `index.html` so deep links work.
- In dev, Vite handles the client and proxies `/api` → :3001.

## Testing

- **Server:** Vitest + Supertest — test that `GET /api/program` returns 200 with expected structure (3 tabs, 4 phase days each, home blocks present).
- **Client:** Vitest + React Testing Library — test that the app loads the program, shows "Lean & Strong — Full Program", and switches tabs.

Minimal but real — enough to verify the conversion is faithful.
