# Express + React Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the single static `index.html` workout program into a simple Express + React application with a data-driven server API and a pixel-faithful React UI.

**Architecture:** A single-package monorepo. Express exposes `GET /api/program` and `GET /api/health`, serves the built React client in production, and provides an SPA fallback. All workout content lives in `server/data/program.ts` as typed data. The React client fetches the program once and renders it from components. In dev, Vite (port 5173) proxies `/api` to Express (port 3001).

**Tech Stack:** Node.js, Express 4, React 18, TypeScript, Vite, Vitest, Supertest, React Testing Library.

**Reference source:** The existing `index.html` at the repo root is the source of truth for all content. Keep it untouched during conversion; it is used as the transcription source in Tasks 3–5.

---

## File structure

```
2026-workout-routine/
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── .gitignore
├── server/
│   ├── index.ts            # Express app (API + static + SPA fallback)
│   ├── index.test.ts       # supertest tests
│   ├── types.ts            # shared Program types
│   └── data/
│       └── program.ts      # all workout content as typed data
├── client/
│   ├── index.html          # Vite entry HTML
│   ├── vite.config.ts
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── App.test.tsx    # RTL tests
│       ├── api.ts
│       ├── styles.css      # CSS extracted from index.html
│       └── components/
│           ├── TabNav.tsx
│           ├── DayNav.tsx
│           ├── DayPanel.tsx
│           ├── ExerciseCard.tsx
│           ├── PrimerAccordion.tsx
│           ├── HomeRoutine.tsx
│           └── MetaCard.tsx
└── docs/
    └── superpowers/specs/2026-08-10-express-react-conversion-design.md
```

---

## Task 1: Scaffold the monorepo

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `.gitignore`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "2026-workout-routine",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "concurrently -k \"npm:dev:server\" \"npm:dev:client\"",
    "dev:server": "tsx watch server/index.ts",
    "dev:client": "vite --config client/vite.config.ts",
    "build": "npm run typecheck && vite build --config client/vite.config.ts",
    "start": "tsx server/index.ts",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "express": "^4.19.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@types/express": "^4.17.21",
    "@types/node": "^20.14.10",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "concurrently": "^8.2.2",
    "jsdom": "^24.1.0",
    "supertest": "^7.0.0",
    "@types/supertest": "^6.0.2",
    "tsx": "^4.16.2",
    "typescript": "^5.5.3",
    "vite": "^5.3.4",
    "vitest": "^2.0.3"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noEmit": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["node"]
  },
  "include": ["server", "client/src", "client/vite.config.ts", "vitest.config.ts"]
}
```

- [ ] **Step 3: Write `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['server/**/*.test.ts', 'client/src/**/*.test.tsx'],
    environment: 'node',
  },
});
```

- [ ] **Step 4: Write `.gitignore`**

```
node_modules/
client/dist/
```

- [ ] **Step 5: Install dependencies**

Run: `npm install`
Expected: install completes; a `package-lock.json` is created.

- [ ] **Step 6: Verify typecheck passes on empty project**

Run: `npm run typecheck`
Expected: PASS (exit 0, no output). The `include` paths simply match no files yet.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json tsconfig.json vitest.config.ts .gitignore
git commit -m "chore: scaffold monorepo with express, react, vite, vitest"
```

---

## Task 2: Shared types + Express app with API endpoints (TDD)

**Files:**
- Create: `server/types.ts`
- Create: `server/index.ts`
- Create: `server/index.test.ts`
- Create: `server/data/program.ts` (placeholder with valid structure; full content lands in Tasks 3–5)

- [ ] **Step 1: Write the failing server tests**

`server/index.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './index';

describe('GET /api/health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/program', () => {
  it('returns the program with three tabs', async () => {
    const res = await request(app).get('/api/program');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Lean & Strong — Full Program');
    expect(res.body.tabs).toHaveLength(3);
    expect(res.body.tabs.map((t: { id: string }) => t.id)).toEqual(['p1', 'home', 'p2']);
  });

  it('returns phase days for p1 and p2', async () => {
    const res = await request(app).get('/api/program');
    const p1 = res.body.tabs.find((t: { id: string }) => t.id === 'p1');
    const p2 = res.body.tabs.find((t: { id: string }) => t.id === 'p2');
    expect(p1.kind).toBe('phase');
    expect(p1.days).toHaveLength(4);
    expect(p1.dayTabs).toHaveLength(4);
    expect(p2.kind).toBe('phase');
    expect(p2.days).toHaveLength(4);
    expect(p2.dayTabs).toHaveLength(4);
  });

  it('returns a home tab with home blocks', async () => {
    const res = await request(app).get('/api/program');
    const home = res.body.tabs.find((t: { id: string }) => t.id === 'home');
    expect(home.kind).toBe('home');
    expect(home.home.blocks).toHaveLength(4);
    expect(home.home.blocks[0].title).toBe('Spinal mobility & decompression');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL. Error because `server/index.ts` does not exist (or a build/import error).

- [ ] **Step 3: Write `server/types.ts`**

```ts
export type TagTone = 'green' | 'purple' | 'amber' | 'slate' | 'coral';

export type Tag = { text: string; tone: TagTone };

export type Exercise = {
  num: string;
  name: string;
  detail: string;
  alt?: string;
  why?: string;
  tags?: Tag[];
};

export type PrimerStep = {
  num: string;
  name: string;
  detail: string;
};

export type PrimerMenuItem = {
  name: string;
  dose: string;
  cue: string;
};

export type Primer = {
  recommendedLabel: string;
  steps: PrimerStep[];
  menuLabel: string;
  menuItems: PrimerMenuItem[];
};

export type Section = {
  label?: string;
  station?: string;
  rest?: string;
  info?: string;
  primer?: Primer;
  exercises?: Exercise[];
};

export type Day = {
  id: string;
  eyebrow: string;
  title: string;
  sub: string;
  meta: { label: string; value: string }[];
  sections: Section[];
};

export type HomeExercise = {
  num: number;
  name: string;
  detail: string;
};

export type HomeBlock = {
  num: number;
  title: string;
  time: string;
  exercises: HomeExercise[];
};

export type HomeRoutine = {
  eyebrow: string;
  title: string;
  sub: string;
  infoBars: string[];
  blocks: HomeBlock[];
};

export type PhaseTab = {
  id: string;
  label: string;
  kind: 'phase';
  phaseBar?: string;
  dayTabs: { id: string; label: string }[];
  days: Day[];
};

export type HomeTab = {
  id: string;
  label: string;
  kind: 'home';
  home: HomeRoutine;
};

export type Tab = PhaseTab | HomeTab;

export type Program = {
  title: string;
  sub: string;
  tabs: Tab[];
};
```

- [ ] **Step 4: Write the Express app `server/index.ts`**

```ts
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import express, { type Request, type Response, type NextFunction } from 'express';
import { program } from './data/program';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'client', 'dist');
const indexHtml = path.join(distDir, 'index.html');

export const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/api/program', (_req: Request, res: Response) => {
  res.json(program);
});

if (fs.existsSync(indexHtml)) {
  app.use(express.static(distDir));
  app.get(/^(?!\/api).*/, (_req: Request, res: Response) => {
    res.sendFile(indexHtml);
  });
}

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;
```

Note: the `if (isMain)` guard means importing `app` in tests does not start a listener.

- [ ] **Step 5: Write a placeholder `server/data/program.ts`**

The real content is added in Tasks 3–5. For this task, create the file with the correct top-level structure but minimal content so the API tests pass:

```ts
import type { Program } from '../types';

export const program: Program = {
  title: 'Lean & Strong — Full Program',
  sub: 'Phase 1 · Daily Home Routine · Phase 2 Progression · Mon / Wed / Fri / Sat',
  tabs: [
    {
      id: 'p1',
      label: 'Phase 1 — Gym',
      kind: 'phase',
      dayTabs: [
        { id: 'p1d0', label: 'Day 1 — Pull & Glutes' },
        { id: 'p1d1', label: 'Day 2 — Metabolic Core' },
        { id: 'p1d2', label: 'Day 3 — Strength & Symmetry' },
        { id: 'p1d3', label: 'Day 4 — Flush & Reset' },
      ],
      days: [
        { id: 'p1d0', eyebrow: '', title: '', sub: '', meta: [], sections: [] },
        { id: 'p1d1', eyebrow: '', title: '', sub: '', meta: [], sections: [] },
        { id: 'p1d2', eyebrow: '', title: '', sub: '', meta: [], sections: [] },
        { id: 'p1d3', eyebrow: '', title: '', sub: '', meta: [], sections: [] },
      ],
    },
    {
      id: 'home',
      label: 'Daily Home',
      kind: 'home',
      home: {
        eyebrow: 'Every day — gym days and rest days',
        title: 'Daily home routine',
        sub: '',
        infoBars: [],
        blocks: [
          { num: 1, title: 'Spinal mobility & decompression', time: '', exercises: [] },
          { num: 2, title: 'Hip mobility', time: '', exercises: [] },
          { num: 3, title: 'Activation', time: '', exercises: [] },
          { num: 4, title: 'Balance & posture', time: '', exercises: [] },
        ],
      },
    },
    {
      id: 'p2',
      label: 'Phase 2 — Progression',
      kind: 'phase',
      phaseBar: '',
      dayTabs: [
        { id: 'p2d0', label: 'Day 1 — Pull & Power' },
        { id: 'p2d1', label: 'Day 2 — Metabolic Power' },
        { id: 'p2d2', label: 'Day 3 — Strength & Reactive' },
        { id: 'p2d3', label: 'Day 4 — Athletic Flush' },
      ],
      days: [
        { id: 'p2d0', eyebrow: '', title: '', sub: '', meta: [], sections: [] },
        { id: 'p2d1', eyebrow: '', title: '', sub: '', meta: [], sections: [] },
        { id: 'p2d2', eyebrow: '', title: '', sub: '', meta: [], sections: [] },
        { id: 'p2d3', eyebrow: '', title: '', sub: '', meta: [], sections: [] },
      ],
    },
  ],
};
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all 4 tests green.

- [ ] **Step 7: Verify typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add server/types.ts server/index.ts server/index.test.ts server/data/program.ts
git commit -m "feat: add express app with health and program API endpoints"
```

---

## Task 3: Transcribe Phase 1 data

**Files:**
- Modify: `server/data/program.ts`

Phase 1 occupies `index.html` lines 444–861. This task replaces the four placeholder `p1` days with full content.

**Transcription rules (applies to all phase days):**
- `eyebrow` — the `.day-eyebrow` text, e.g. `Phase 1 · Day 1 · Monday`.
- `title` — the `.day-title` text.
- `sub` — the `.day-sub` text.
- `meta` — one entry per `.meta-card`: `{ label, value }` from `.meta-label` and `.meta-val`.
- Each `.section-label` starts a new `Section` with `label`.
- A `.station-badge` sets that section's `station`, keeping the full original text verbatim (e.g. `Station: Cable machine` — the component renders it as-is).
- A `.rest-bar` sets `rest`, `.info-bar` sets `info`.
- Each `.exercise` inside the section becomes an `exercises` entry with `num` (from `.ex-num`), `name`, `detail`, and optionally `alt` (concatenate the `.ex-alt` lines joined by `\n`; each line already starts with `Alt A:`/`Alt B:`), `why` (from `.ex-why`), and `tags` (from `.tag` spans, `tone` = the class suffix after `tag-`).
- A `.primer-wrap` becomes `primer` on the section: `recommendedLabel` from `.primer-fixed-label`, `steps` from `.primer-step` items (`num`, `name`, `detail`), `menuLabel` from `.primer-menu-label`, and `menuItems` from `.menu-item` (`name`, `dose`, `cue`).
- Preserve all text verbatim, including em dashes, arrows (`→`), multiplication signs (`×`), and quotes. HTML entities are converted to their literal characters (`&amp;` → `&`, `&nbsp;` → space).

**Worked example — Day 1 (`p1d0`) complete:**

```ts
{
  id: 'p1d0',
  eyebrow: 'Phase 1 · Day 1 · Monday',
  title: 'Pull, glutes & decompression',
  sub: 'Lat pulldown standalone → hip thrust standalone → mat giant set. Three clean blocks, no cross-gym transitions.',
  meta: [
    { label: 'Duration', value: '~60 min' },
    { label: 'Lifting tempo', value: '4-1-1' },
    { label: 'Standalone rest', value: '60 s between sets' },
    { label: 'Giant set rest', value: '45 s after each round' },
  ],
  sections: [
    {
      label: 'Warm-up',
      exercises: [
        {
          num: '1',
          name: 'Incline treadmill walk',
          detail: '10 min — 3.5 mph / 6% incline. Tall posture, no rail grip. Push through the right big toe at every push-off to begin activating the right glute chain.',
        },
      ],
    },
    {
      label: 'Athletic primer',
      info: 'Open floor near the treadmill or stretching area. Full recovery between sets — these are not cardio, they are neurological training.',
      primer: {
        recommendedLabel: 'Recommended — Day 1',
        steps: [
          { num: '1', name: 'Pogo hops', detail: '3 × 20 contacts — Ankles only, minimal knee bend. Land as quietly as possible. Full rest between sets.' },
          { num: '2', name: 'Box jump (onto box)', detail: '3 × 5 reps — Low box (12–18"). Full hip extension at the top. Step down, never jump down. Full reset before each rep.' },
          { num: '3', name: 'Forward & backward hop', detail: '2 × 8 contacts per direction — Two-foot hop forward, stick 1 s, hop back, stick 1 s. Builds Achilles loading in the sagittal plane.' },
        ],
        menuLabel: 'Full primer menu — choose any 2–3',
        menuItems: [
          { name: 'Pogo hops', dose: '3 × 20 contacts', cue: 'Ankles only, minimal knee bend, quiet landings.' },
          { name: 'Skipping', dose: '3 × 30 s', cue: 'Relaxed, rhythmic. Good substitute on reactive days.' },
          { name: 'Box jump (onto box)', dose: '3 × 5 reps', cue: 'Low box. Full hip extension at top. Step down every rep.' },
          { name: 'Depth drop', dose: '3 × 5 reps', cue: 'Step off box, absorb landing with soft knees. No immediate jump yet.' },
          { name: 'Depth drop → vertical jump', dose: '3 × 5 reps', cue: 'Step off, land, immediately jump straight up. Minimal ground contact time.' },
          { name: 'Vertical jump', dose: '3 × 5 reps', cue: 'Standing. Full arm swing. Soft landing, absorb fully before next rep.' },
          { name: 'Lateral hop + stick', dose: '3 × 5 per side', cue: 'Hop laterally, land single-leg, hold 2–3 s still. Right side first.' },
          { name: 'Forward & backward hop', dose: '2 × 8 contacts/dir', cue: 'Two-foot. Hop forward, stick 1 s, hop back, stick 1 s.' },
        ],
      },
    },
    {
      label: 'Cardio block — choose one',
      exercises: [
        {
          num: '2',
          name: 'Sled push & pull',
          detail: '6 rounds × 20 yards out (push) + 20 yards back (pull) — 60 s rest between rounds. Push with high handles, flip, pull back. Same sled, same lane throughout.',
          alt: 'Alt A: Rowing machine — 8 × 1 min hard / 1 min easy. Reach fully forward at the catch to stretch the erectors.\nAlt B: Jump rope — 10 × 45 s active / 15 s rest. Soft knees, balls of feet.',
        },
      ],
    },
    {
      label: 'Strength block A — standalone',
      station: 'Station: Cable machine',
      rest: '4 working sets. 60 s rest between sets. Full attention — no superset here.',
      exercises: [
        {
          num: 'A',
          name: 'Wide-grip lat pulldown',
          detail: '4 × 12–15 reps — Tempo 4-1-1. Depress the scapulae first, then pull. The long eccentric on the way up is what gradually elongates the hypertrophied erectors. Light-to-moderate load — this is structural work, not a strength competition.',
          why: 'Consistent slow eccentrics over 8–12 weeks are the primary driver of reducing the erector-driven wide look. The stretch at the top of each rep matters more than the load.',
          tags: [
            { text: 'Erector elongation', tone: 'green' },
            { text: 'Width reduction', tone: 'green' },
          ],
        },
      ],
    },
    {
      label: 'Strength block B — standalone',
      station: 'Station: Hip thrust machine',
      rest: '4 working sets. 60 s rest between sets. Progressive overload — add load when all reps feel fully controlled.',
      exercises: [
        {
          num: 'B',
          name: 'Hip thrust (machine)',
          detail: '4 × 12 reps — Full range, squeeze hard at the top with a posterior pelvic tilt, hold 1 s. Drive through both feet evenly — watch that the right side matches the left output. No spinal compression involved.',
          why: 'Direct glute max loading through hip extension. The posterior pelvic tilt at the top directly counteracts anterior pelvic tilt and reduces the flared hip appearance. Safe progressive overload with zero erector bracing demand.',
          tags: [
            { text: 'APT correction', tone: 'green' },
            { text: 'Glute max', tone: 'green' },
          ],
        },
      ],
    },
    {
      label: 'Giant set — 3 rounds',
      station: 'Station: Mat area — floor only, no equipment moves',
      rest: 'C → D → E back-to-back with no rest between. Rest 45 s after all three. Repeat 3 rounds.',
      exercises: [
        {
          num: 'C',
          name: 'Dead bug',
          detail: '3 × 10 reps per side — Lower back pinned flat the entire time. Move slowly. Stop the leg before 90° if the back lifts. No breath-holding.',
          tags: [{ text: 'TVA + multifidus', tone: 'purple' }],
        },
        {
          num: 'D',
          name: 'Copenhagen plank',
          detail: '3 × 20–30 s per side — Top foot on a low bench or step. Hold a side plank. Start with the bottom knee lightly touching the floor if needed. Build toward 45 s over weeks.',
          why: 'High combined oblique and adductor activation with zero hip joint compression. Contributes to a leaner waist and inner-thigh silhouette over time.',
          tags: [{ text: 'Oblique + adductor', tone: 'purple' }],
        },
        {
          num: 'E',
          name: 'Bird-dog',
          detail: '3 × 10 reps per side — Opposite arm and leg extend simultaneously. 2 s pause at full extension, maximum length from fingertip to toe.',
          tags: [{ text: 'Multifidus + TVA', tone: 'purple' }],
        },
      ],
    },
    {
      label: 'Finisher',
      exercises: [
        {
          num: '3',
          name: 'Dead hang',
          detail: '4 × 30 s on / 30 s off — Pull-up bar. Shoulders fully passive and relaxed. One of the most consistent habits for reducing the erector-driven wide look over 8–12 weeks.',
          tags: [{ text: 'Spinal decompression', tone: 'slate' }],
        },
      ],
    },
  ],
},
```

- [ ] **Step 1: Transcribe `p1d0` fully (as the worked example above)**

Replace the placeholder `{ id: 'p1d0', ... }` object in `program.ts` with the complete content above.

- [ ] **Step 2: Transcribe `p1d1` (Day 2 — Metabolic Core)**

Source: `index.html` lines 577–686. Eyebrow `Phase 1 · Day 2 · Wednesday`, title `Metabolic core & waist`. Sections: Warm-up, Athletic primer, Cardio block, Metabolic circuit (station `Station: Peck deck + Dumbbell rack + Reverse fly machine — all adjacent`), Waist finisher (station `Station: Cable machine — all exercises at same station`), Tendon care. Follow the transcription rules; the primer `menuItems` for this day are identical to `p1d0`.

- [ ] **Step 3: Transcribe `p1d2` (Day 3 — Strength & Symmetry)**

Source: `index.html` lines 689–801. Eyebrow `Phase 1 · Day 3 · Friday`, title `Unilateral strength & symmetry`. Sections: Warm-up, Athletic primer, Cardio block, Strength block A (station `Station: Dumbbell rack + bench beside it`), Strength block B (station `Station: Cable machine + mat beside it`), Strength block C (station `Station: Leg curl machine`), Finisher. Primer menu identical to `p1d0`.

- [ ] **Step 4: Transcribe `p1d3` (Day 4 — Flush & Reset)**

Source: `index.html` lines 804–860. Eyebrow `Phase 1 · Day 4 · Saturday`, title `Full-body flush & reset`. Sections: Warm-up, "60-second" flush circuit (station `Station: Sled lane OR assault bike + floor immediately beside it`), Core finisher, Finisher & reset.

- [ ] **Step 5: Verify the API returns Phase 1 content**

Run: `npm test`
Expected: PASS (the existing tests still pass; `days` length is still 4).

- [ ] **Step 6: Add a Phase 1 content spot-check to `server/index.test.ts`**

Append this test:

```ts
it('serves Phase 1 day content', async () => {
  const res = await request(app).get('/api/program');
  const p1 = res.body.tabs.find((t: { id: string }) => t.id === 'p1');
  const day1 = p1.days[0];
  expect(day1.title).toBe('Pull, glutes & decompression');
  expect(day1.sections).toHaveLength(7);
  const strengthA = day1.sections.find((s: { label: string }) => s.label === 'Strength block A — standalone');
  expect(strengthA.exercises[0].name).toBe('Wide-grip lat pulldown');
  expect(strengthA.exercises[0].tags[0].tone).toBe('green');
  const primerSection = day1.sections.find((s: { primer?: unknown }) => s.primer);
  expect(primerSection.primer.menuItems).toHaveLength(8);
  const day4 = p1.days[3];
  expect(day4.sections.some((s: { label: string }) => s.label === 'Finisher & reset')).toBe(true);
});
```

- [ ] **Step 7: Run tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 8: Run typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add server/data/program.ts server/index.test.ts
git commit -m "feat: transcribe Phase 1 gym routine into program data"
```

---

## Task 4: Transcribe Daily Home routine data

**Files:**
- Modify: `server/data/program.ts`

Daily Home occupies `index.html` lines 866–945.

**Transcription rules:**
- `home.eyebrow` — `Every day — gym days and rest days`.
- `home.title` — `Daily home routine`.
- `home.sub` — the full `.day-sub` text.
- `home.infoBars` — array with each `.info-bar` text.
- `home.blocks` — one per `.home-block`: `num` from `.home-block-num`, `title` from `.home-block-title`, `time` from `.home-block-time`, and `exercises` from `.home-ex` items (`num` number from `.home-ex-num`, `name`, `detail`).

- [ ] **Step 1: Transcribe the `home` tab fully**

Replace the placeholder `home` tab in `program.ts` with:

```ts
{
  id: 'home',
  label: 'Daily Home',
  kind: 'home',
  home: {
    eyebrow: 'Every day — gym days and rest days',
    title: 'Daily home routine',
    sub: '~15 minutes. No equipment needed. These exercises compound into major results when done daily — and would waste gym time done there. Order matters: spinal mobility first, hip mobility second, activation third, balance last.',
    infoBars: [
      'If short on time, skip Block 3 before skipping Blocks 1 or 2. The mobility work is the highest-value daily habit for your specific profile. Best done in the morning or before bed.',
    ],
    blocks: [
      {
        num: 1,
        title: 'Spinal mobility & decompression',
        time: '~4 min',
        exercises: [
          { num: 1, name: 'Cat-cow', detail: '2 × 10 reps — Slow, full range. Exhale on the arch, inhale on the hollow. Sets the tone for the whole session.' },
          { num: 2, name: "Child's pose", detail: '2 × 45 s — Arms stretched forward, forehead down. Breathe into the lower back. Passive spinal traction.' },
          { num: 3, name: 'Wall slide (wall angel)', detail: '2 × 10 reps — Back flat against the wall, arms at 90°. Slowly raise arms overhead while keeping every part of the back and arms in contact with the wall throughout. One of the highest-value exercises in this entire program for the aesthetic goal — directly counteracts erector overdevelopment and forward shoulder posture.' },
        ],
      },
      {
        num: 2,
        title: 'Hip mobility',
        time: '~4 min',
        exercises: [
          { num: 4, name: '90/90 hip stretch', detail: '90 s per side — Passive hold, breathe slowly into the hip. Right side 15–20 s longer. Targets the hip capsule directly — the primary restriction driving the impingement symptoms.' },
          { num: 5, name: 'Supine figure-4 (piriformis stretch)', detail: '60 s per side — Ankle crossed over opposite knee, gently pull the thigh toward your chest. Right side priority. Breathe slowly.' },
        ],
      },
      {
        num: 3,
        title: 'Activation',
        time: '~4 min',
        exercises: [
          { num: 6, name: 'Superman hold', detail: '3 × 8 reps × 3 s hold — Face down, arms forward. Lift arms and legs simultaneously, squeeze glutes. Trains the posterior chain in extension — directly opposes the anterior pelvic tilt pattern.' },
          { num: 7, name: 'Side-lying hip abduction', detail: '2 × 15 reps per side — No band needed. Slow, pelvis stacked, 1 s pause at the top. Right side first. Add a light band if available.' },
          { num: 8, name: 'Stomach vacuum', detail: '3 × 20 s hold — Standing or seated. Exhale fully, draw navel in, hold without bracing the outer abs. Resting TVA tone is built through daily frequency — this is why it lives here and not at the gym.' },
        ],
      },
      {
        num: 4,
        title: 'Balance & posture',
        time: '~3 min',
        exercises: [
          { num: 9, name: 'Single-leg balance — right side focus', detail: '3 × 30 s per side — Progress weekly: Weeks 1–2 eyes open flat ground → Weeks 3–4 eyes closed → Weeks 5+ on a folded towel or cushion. Right side always first. Retrains the proprioceptive chain from the Achilles through the meniscus to the hip.' },
          { num: 10, name: 'Seated scapular depression', detail: '2 × 12 reps — Sit in a chair, arms straight, pull shoulders down away from ears, hold 2 s. Trains the lower trap daily. Small habit with outsized postural payoff over weeks.' },
        ],
      },
    ],
  },
},
```

- [ ] **Step 2: Add a Home content spot-check to `server/index.test.ts`**

Append this test:

```ts
it('serves the home routine content', async () => {
  const res = await request(app).get('/api/program');
  const home = res.body.tabs.find((t: { id: string }) => t.id === 'home');
  expect(home.home.sub).toContain('~15 minutes');
  expect(home.home.infoBars).toHaveLength(1);
  expect(home.home.blocks).toHaveLength(4);
  expect(home.home.blocks[3].exercises).toHaveLength(2);
  expect(home.home.blocks[0].exercises[2].name).toBe('Wall slide (wall angel)');
});
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 4: Run typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add server/data/program.ts server/index.test.ts
git commit -m "feat: transcribe daily home routine into program data"
```

---

## Task 5: Transcribe Phase 2 data

**Files:**
- Modify: `server/data/program.ts`

Phase 2 occupies `index.html` lines 950–1310. This task replaces the four placeholder `p2` days with full content, and sets the `phaseBar`.

- [ ] **Step 1: Set the `p2` tab `phaseBar`**

```ts
phaseBar: 'Move to Phase 2 when all Phase 1 sessions feel controlled with no joint irritation, the primers feel confident and controlled, and the RFESS and single-leg RDL feel strong and balanced side-to-side. Typically 8–12 weeks.',
```

- [ ] **Step 2: Transcribe `p2d0` (Day 1 — Pull & Power)**

Source: `index.html` lines 961–1065. Eyebrow `Phase 2 · Day 1 · Monday`, title `Pull, glutes & vertical power`. Sections: Warm-up, Athletic primer — upgraded (primer with the Phase 2 menu below), Cardio block, Strength block A (station `Station: Cable machine`), Strength block B (station `Station: Hip thrust machine`), Giant set (station `Station: Mat area`), Finisher.

The Phase 2 primer menu (used in `p2d0` and `p2d2`) is:

```ts
menuItems: [
  { name: 'Pogo hops', dose: '3 × 25 contacts', cue: 'Increase contacts from Phase 1. Maintain quiet landings.' },
  { name: 'Box jump (higher box)', dose: '4 × 5 reps', cue: 'Progress box height. Still step down every rep.' },
  { name: 'Depth drop → vertical jump', dose: '4 × 5 reps', cue: 'Minimal ground contact. This is the key SSC drill.' },
  { name: 'Vertical jump — approach', dose: '3 × 5 reps', cue: 'Two-step approach before jump. More power than standing.' },
  { name: 'Lateral hop — continuous', dose: '3 × 8 per side', cue: 'Remove the stick. Continuous lateral hops, soft and fast.' },
  { name: 'Forward & backward hop — continuous', dose: '3 × 10 contacts/dir', cue: 'No pause between hops. Reactive forward-back pattern.' },
  { name: 'Skipping — high knees', dose: '3 × 30 s', cue: 'Increase knee drive vs. Phase 1 skipping.' },
],
```

- [ ] **Step 3: Transcribe `p2d1` (Day 2 — Metabolic Power)**

Source: `index.html` lines 1068–1136. Eyebrow `Phase 2 · Day 2 · Wednesday`, title `Metabolic power & rotation`. Note: this day's primer is a single exercise (`Warm-up + Athletic primer` section with one exercise, no `.primer-wrap`). Sections: Warm-up + Athletic primer, Cardio block, Metabolic circuit (station `Station: Peck deck + Reverse fly machine + Dumbbell rack — all adjacent`), Waist finisher (station `Station: Cable machine — all exercises at same station`), Tendon care.

- [ ] **Step 4: Transcribe `p2d2` (Day 3 — Strength & Reactive)**

Source: `index.html` lines 1139–1250. Eyebrow `Phase 2 · Day 3 · Friday`, title `Strength & reactive power`. Sections: Warm-up, Athletic primer — upgraded (Phase 2 menu), Cardio block, Strength block A (station `Station: Dumbbell rack + bench`), Strength block B (station `Station: Cable machine + mat`), Strength block C (station `Station: Leg curl machine`), Finisher.

- [ ] **Step 5: Transcribe `p2d3` (Day 4 — Athletic Flush)**

Source: `index.html` lines 1253–1309. Eyebrow `Phase 2 · Day 4 · Saturday`, title `Athletic flush & reset`. Sections: Warm-up, "60-second" flush circuit (station `Station: Sled lane or assault bike + floor beside it`), Core finisher, Movement flow — cool-down (info bar `Placed after the flush deliberately — not before...`), Full reset.

- [ ] **Step 6: Add a Phase 2 content spot-check to `server/index.test.ts`**

Append this test:

```ts
it('serves Phase 2 day content and phase bar', async () => {
  const res = await request(app).get('/api/program');
  const p2 = res.body.tabs.find((t: { id: string }) => t.id === 'p2');
  expect(p2.phaseBar).toContain('Move to Phase 2 when all Phase 1 sessions feel controlled');
  expect(p2.days).toHaveLength(4);
  const day2 = p2.days[1];
  expect(day2.title).toBe('Metabolic power & rotation');
  const movementFlow = p2.days[3].sections.find((s: { label: string }) => s.label === 'Movement flow — cool-down (Phase 2 addition)');
  expect(movementFlow.info).toContain('Placed after the flush deliberately');
});
```

- [ ] **Step 7: Run tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 8: Run typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add server/data/program.ts server/index.test.ts
git commit -m "feat: transcribe Phase 2 progression routine into program data"
```

---

## Task 6: Vite client scaffold + CSS

**Files:**
- Create: `client/index.html`
- Create: `client/vite.config.ts`
- Create: `client/src/main.tsx`
- Create: `client/src/styles.css`
- Create: `client/src/api.ts`

- [ ] **Step 1: Write `client/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lean &amp; Strong — Full Program</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

- [ ] **Step 2: Write `client/vite.config.ts`**

```ts
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  build: {
    outDir: 'dist',
  },
});
```

- [ ] **Step 3: Extract CSS into `client/src/styles.css`**

Copy the entire contents of the `<style>` block from `index.html` (from `:root {` through the final `}` before `</style>`, i.e. lines 11–423) verbatim into `client/src/styles.css`. Do not alter any selector or value. This includes all component classes: `.page-header`, `.main-nav`, `.main-tab`, `.day-nav`, `.day-tab`, `.meta-card`, `.section-label`, `.station-badge`, `.rest-bar`, `.info-bar`, `.phase-bar`, `.exercise`, `.primer-wrap`, `.home-block`, and the `@media` query.

- [ ] **Step 4: Write `client/src/api.ts`**

```ts
import type { Program } from '../../server/types';

export async function fetchProgram(): Promise<Program> {
  const res = await fetch('/api/program');
  if (!res.ok) {
    throw new Error(`Failed to load program: ${res.status}`);
  }
  return res.json();
}
```

- [ ] **Step 5: Write `client/src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 6: Verify the dev server starts (App not yet created, so expect a temporary error)**

Run: `npm run dev:client`
Expected: Vite starts and reports the unresolved `./App` import. This is fine — `App.tsx` arrives in Task 7. Stop the process (Ctrl-C).

- [ ] **Step 7: Commit**

```bash
git add client/index.html client/vite.config.ts client/src/styles.css client/src/api.ts client/src/main.tsx
git commit -m "chore: scaffold vite client with extracted styles"
```

---

## Task 7: React components (TDD)

**Files:**
- Create: `client/src/components/TabNav.tsx`
- Create: `client/src/components/DayNav.tsx`
- Create: `client/src/components/MetaCard.tsx`
- Create: `client/src/components/ExerciseCard.tsx`
- Create: `client/src/components/PrimerAccordion.tsx`
- Create: `client/src/components/HomeRoutine.tsx`
- Create: `client/src/components/DayPanel.tsx`
- Create: `client/src/App.tsx`
- Create: `client/src/App.test.tsx`

- [ ] **Step 1: Write the failing client test `client/src/App.test.tsx`**

```tsx
// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

const programFixture = {
  title: 'Lean & Strong — Full Program',
  sub: 'Phase 1 · Daily Home Routine · Phase 2 Progression · Mon / Wed / Fri / Sat',
  tabs: [
    {
      id: 'p1',
      label: 'Phase 1 — Gym',
      kind: 'phase',
      dayTabs: [
        { id: 'p1d0', label: 'Day 1 — Pull & Glutes' },
        { id: 'p1d1', label: 'Day 2 — Metabolic Core' },
        { id: 'p1d2', label: 'Day 3 — Strength & Symmetry' },
        { id: 'p1d3', label: 'Day 4 — Flush & Reset' },
      ],
      days: [
        {
          id: 'p1d0',
          eyebrow: 'Phase 1 · Day 1 · Monday',
          title: 'Pull, glutes & decompression',
          sub: 'A test day.',
          meta: [{ label: 'Duration', value: '~60 min' }],
          sections: [
            {
              label: 'Strength block A — standalone',
              station: 'Station: Cable machine',
              rest: '60 s rest.',
              exercises: [
                {
                  num: 'A',
                  name: 'Wide-grip lat pulldown',
                  detail: '4 × 12–15 reps.',
                  tags: [{ text: 'Erector elongation', tone: 'green' }],
                },
              ],
            },
            {
              label: 'Athletic primer',
              primer: {
                recommendedLabel: 'Recommended — Day 1',
                steps: [{ num: '1', name: 'Pogo hops', detail: '3 × 20 contacts.' }],
                menuLabel: 'Full primer menu — choose any 2–3',
                menuItems: [{ name: 'Skipping', dose: '3 × 30 s', cue: 'Rhythmic.' }],
              },
            },
          ],
        },
        { id: 'p1d1', eyebrow: '', title: 'Day two', sub: '', meta: [], sections: [] },
        { id: 'p1d2', eyebrow: '', title: 'Day three', sub: '', meta: [], sections: [] },
        { id: 'p1d3', eyebrow: '', title: 'Day four', sub: '', meta: [], sections: [] },
      ],
    },
    {
      id: 'home',
      label: 'Daily Home',
      kind: 'home',
      home: {
        eyebrow: 'Every day',
        title: 'Daily home routine',
        sub: '~15 minutes.',
        infoBars: ['Skip Block 3 first.'],
        blocks: [
          {
            num: 1,
            title: 'Spinal mobility & decompression',
            time: '~4 min',
            exercises: [{ num: 1, name: 'Cat-cow', detail: '2 × 10 reps.' }],
          },
        ],
      },
    },
    {
      id: 'p2',
      label: 'Phase 2 — Progression',
      kind: 'phase',
      phaseBar: 'Move to Phase 2 when controlled.',
      dayTabs: [
        { id: 'p2d0', label: 'Day 1 — Pull & Power' },
        { id: 'p2d1', label: 'Day 2 — Metabolic Power' },
        { id: 'p2d2', label: 'Day 3 — Strength & Reactive' },
        { id: 'p2d3', label: 'Day 4 — Athletic Flush' },
      ],
      days: [
        { id: 'p2d0', eyebrow: '', title: 'Pull, glutes & vertical power', sub: '', meta: [], sections: [] },
        { id: 'p2d1', eyebrow: '', title: 'Day two P2', sub: '', meta: [], sections: [] },
        { id: 'p2d2', eyebrow: '', title: 'Day three P2', sub: '', meta: [], sections: [] },
        { id: 'p2d3', eyebrow: '', title: 'Day four P2', sub: '', meta: [], sections: [] },
      ],
    },
  ],
};

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(programFixture),
    })
  ));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('App', () => {
  it('loads the program and shows the header title', async () => {
    render(<App />);
    expect(await screen.findByText('Lean & Strong — Full Program')).toBeTruthy();
  });

  it('shows the first phase day with its exercises', async () => {
    render(<App />);
    expect(await screen.findByText('Pull, glutes & decompression')).toBeTruthy();
    expect(screen.getByText('Wide-grip lat pulldown')).toBeTruthy();
    expect(screen.getByText('Erector elongation')).toBeTruthy();
  });

  it('toggles the primer accordion', async () => {
    render(<App />);
    await screen.findByText('Pull, glutes & decompression');
    expect(screen.queryByText('Skipping')).toBeNull();
    fireEvent.click(screen.getByText('Athletic primer', { selector: '.primer-title' }));
    await waitFor(() => expect(screen.getByText('Skipping')).toBeTruthy());
    fireEvent.click(screen.getByText('Athletic primer', { selector: '.primer-title' }));
    await waitFor(() => expect(screen.queryByText('Skipping')).toBeNull());
  });

  it('switches between the three main tabs', async () => {
    render(<App />);
    await screen.findByText('Pull, glutes & decompression');
    fireEvent.click(screen.getByText('Daily Home'));
    await waitFor(() => expect(screen.getByText('Cat-cow')).toBeTruthy());
    fireEvent.click(screen.getByText('Phase 2 — Progression'));
    await waitFor(() => expect(screen.getByText('Pull, glutes & vertical power')).toBeTruthy());
    fireEvent.click(screen.getByText('Phase 1 — Gym'));
    await waitFor(() => expect(screen.getByText('Wide-grip lat pulldown')).toBeTruthy());
  });

  it('switches phase days', async () => {
    render(<App />);
    await screen.findByText('Pull, glutes & decompression');
    fireEvent.click(screen.getByText('Day 2 — Metabolic Core'));
    await waitFor(() => expect(screen.getByText('Day two')).toBeTruthy());
  });

  it('shows an error state when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: false, status: 500 })));
    render(<App />);
    expect(await screen.findByText(/Failed to load program/)).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run client/src/App.test.tsx`
Expected: FAIL with "Failed to resolve import './App'".

- [ ] **Step 3: Write the components**

`client/src/components/TabNav.tsx`:

```tsx
import type { Tab } from '../../../server/types';

type TabNavProps = {
  tabs: Tab[];
  activeTabId: string;
  onSelect: (id: string) => void;
};

export default function TabNav({ tabs, activeTabId, onSelect }: TabNavProps) {
  return (
    <nav className="main-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={tab.id === activeTabId ? 'main-tab active' : 'main-tab'}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
```

`client/src/components/DayNav.tsx`:

```tsx
type DayNavProps = {
  dayTabs: { id: string; label: string }[];
  activeDayId: string;
  onSelect: (id: string) => void;
};

export default function DayNav({ dayTabs, activeDayId, onSelect }: DayNavProps) {
  return (
    <div className="day-nav">
      {dayTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={tab.id === activeDayId ? 'day-tab active' : 'day-tab'}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
```

`client/src/components/MetaCard.tsx`:

```tsx
type MetaCardProps = {
  label: string;
  value: string;
};

export default function MetaCard({ label, value }: MetaCardProps) {
  return (
    <div className="meta-card">
      <div className="meta-label">{label}</div>
      <div className="meta-val">{value}</div>
    </div>
  );
}
```

`client/src/components/ExerciseCard.tsx`:

```tsx
import type { Exercise } from '../../../server/types';

type ExerciseCardProps = {
  exercise: Exercise;
};

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <div className="exercise">
      <div className="ex-row">
        <div className="ex-num">{exercise.num}</div>
        <div className="ex-body">
          <div className="ex-name">{exercise.name}</div>
          <div className="ex-detail">{exercise.detail}</div>
          {exercise.alt && (
            <div className="ex-alt">
              {exercise.alt.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </div>
          )}
          {exercise.why && <div className="ex-why">{exercise.why}</div>}
          {exercise.tags && exercise.tags.length > 0 && (
            <div className="tag-row">
              {exercise.tags.map((tag) => (
                <span key={tag.text} className={`tag tag-${tag.tone}`}>
                  {tag.text}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

`client/src/components/PrimerAccordion.tsx`:

```tsx
import { useState } from 'react';
import type { Primer } from '../../../server/types';

type PrimerAccordionProps = {
  primer: Primer;
};

export default function PrimerAccordion({ primer }: PrimerAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="primer-wrap">
      <div className="primer-header" onClick={() => setOpen((prev) => !prev)}>
        <div className="primer-header-left">
          <div className="primer-icon">&#9889;</div>
          <div>
            <div className="primer-title">Athletic primer</div>
            <div className="primer-subtitle">Fixed recommendation shown &nbsp;·&nbsp; tap to see full menu</div>
          </div>
        </div>
        <div className={open ? 'primer-chevron open' : 'primer-chevron'}>&#9660;</div>
      </div>
      <div className="primer-fixed">
        <div className="primer-fixed-label">{primer.recommendedLabel}</div>
        {primer.steps.map((step) => (
          <div className="primer-step" key={step.num}>
            <div className="primer-step-num">{step.num}</div>
            <div>
              <div className="primer-step-name">{step.name}</div>
              <div className="primer-step-detail">{step.detail}</div>
            </div>
          </div>
        ))}
      </div>
      {open && (
        <div className="primer-menu open">
          <div className="primer-menu-label">{primer.menuLabel}</div>
          {primer.menuItems.map((item) => (
            <div className="menu-item" key={item.name}>
              <div className="menu-item-name">{item.name}</div>
              <div className="menu-item-dose">{item.dose}</div>
              <div className="menu-item-cue">{item.cue}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

`client/src/components/HomeRoutine.tsx`:

```tsx
import type { HomeRoutine as HomeRoutineData } from '../../../server/types';

type HomeRoutineProps = {
  routine: HomeRoutineData;
};

export default function HomeRoutine({ routine }: HomeRoutineProps) {
  return (
    <div>
      <div className="day-header">
        <div className="day-eyebrow">{routine.eyebrow}</div>
        <div className="day-title">{routine.title}</div>
        <div className="day-sub">{routine.sub}</div>
      </div>
      {routine.infoBars.map((info, i) => (
        <div className="info-bar" key={i}>
          {info}
        </div>
      ))}
      {routine.blocks.map((block) => (
        <div className="home-block" key={block.num}>
          <div className="home-block-header">
            <div className="home-block-num">{block.num}</div>
            <div className="home-block-title">{block.title}</div>
            <div className="home-block-time">{block.time}</div>
          </div>
          {block.exercises.map((ex) => (
            <div className="home-ex" key={ex.num}>
              <div className="home-ex-num">{ex.num}</div>
              <div>
                <div className="home-ex-name">{ex.name}</div>
                <div className="home-ex-detail">{ex.detail}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

`client/src/components/DayPanel.tsx`:

```tsx
import type { Day } from '../../../server/types';
import MetaCard from './MetaCard';
import ExerciseCard from './ExerciseCard';
import PrimerAccordion from './PrimerAccordion';

type DayPanelProps = {
  day: Day;
};

export default function DayPanel({ day }: DayPanelProps) {
  return (
    <div>
      <div className="day-header">
        <div className="day-eyebrow">{day.eyebrow}</div>
        <div className="day-title">{day.title}</div>
        <div className="day-sub">{day.sub}</div>
      </div>
      <div className="meta-row">
        {day.meta.map((m) => (
          <MetaCard key={m.label} label={m.label} value={m.value} />
        ))}
      </div>
      {day.sections.map((section, i) => (
        <div key={i}>
          {section.label && <div className="section-label">{section.label}</div>}
          {section.station && <div className="station-badge">{section.station}</div>}
          {section.rest && <div className="rest-bar">{section.rest}</div>}
          {section.info && <div className="info-bar">{section.info}</div>}
          {section.primer && <PrimerAccordion primer={section.primer} />}
          {section.exercises?.map((exercise) => (
            <ExerciseCard key={exercise.num} exercise={exercise} />
          ))}
        </div>
      ))}
    </div>
  );
}
```

`client/src/App.tsx`:

```tsx
import { useEffect, useState } from 'react';
import type { Program, Tab } from '../../server/types';
import { fetchProgram } from './api';
import TabNav from './components/TabNav';
import DayNav from './components/DayNav';
import DayPanel from './components/DayPanel';
import HomeRoutine from './components/HomeRoutine';

export default function App() {
  const [program, setProgram] = useState<Program | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTabId, setActiveTabId] = useState('p1');
  const [activeDays, setActiveDays] = useState<Record<string, string>>({});

  const load = () => {
    setError(null);
    setProgram(null);
    fetchProgram()
      .then(setProgram)
      .catch((err: Error) => setError(err.message));
  };

  useEffect(() => {
    load();
  }, []);

  if (error) {
    return (
      <div className="content-area">
        <div className="page-header">
          <div className="page-title">Lean &amp; Strong — Full Program</div>
        </div>
        <div className="info-bar">{error}</div>
        <button type="button" className="main-tab" onClick={load}>
          Retry
        </button>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="content-area">
        <div className="info-bar">Loading…</div>
      </div>
    );
  }

  const activeTab: Tab = program.tabs.find((t) => t.id === activeTabId) ?? program.tabs[0];

  const renderContent = () => {
    if (activeTab.kind === 'home') {
      return <HomeRoutine routine={activeTab.home} />;
    }

    const activeDayId = activeDays[activeTab.id] ?? activeTab.dayTabs[0].id;
    const day = activeTab.days.find((d) => d.id === activeDayId) ?? activeTab.days[0];

    const handleDaySelect = (id: string) => {
      setActiveDays((prev) => ({ ...prev, [activeTab.id]: id }));
    };

    return (
      <div>
        {activeTab.phaseBar && <div className="phase-bar">{activeTab.phaseBar}</div>}
        <DayNav dayTabs={activeTab.dayTabs} activeDayId={activeDayId} onSelect={handleDaySelect} />
        {day && <DayPanel day={day} />}
      </div>
    );
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">{program.title}</div>
        <div className="page-sub">{program.sub}</div>
      </div>
      <TabNav tabs={program.tabs} activeTabId={activeTab.id} onSelect={setActiveTabId} />
      <div className="content-area">{renderContent()}</div>
    </div>
  );
}
```

Note: `App.tsx` references `activeTab.kind` so TypeScript narrows `Tab` to `PhaseTab`/`HomeTab`. When `kind === 'home'` the `home` property is available; otherwise `dayTabs`/`days`/`phaseBar` are.

- [ ] **Step 4: Run the client tests**

Run: `npx vitest run client/src/App.test.tsx`
Expected: PASS — all 6 tests green.

- [ ] **Step 5: Run the full test suite and typecheck**

Run: `npm test && npm run typecheck`
Expected: PASS for both.

- [ ] **Step 6: Commit**

```bash
git add client/src
git commit -m "feat: add react components and app with tab, day, and primer interactions"
```

---

## Task 8: Production build, serving, and final verification

**Files:**
- Modify: none (verification only), unless tests reveal issues.

- [ ] **Step 1: Build the client**

Run: `npm run build`
Expected: `tsc --noEmit` passes; Vite emits the bundle to `client/dist/`.

- [ ] **Step 2: Verify the built files exist**

Run: `ls client/dist`
Expected: `index.html` plus `assets/` present.

- [ ] **Step 3: Start the production server**

Run: `npm start`
Expected: logs `Server running at http://localhost:3001`.

- [ ] **Step 4: Verify the API**

Run: `curl http://localhost:3001/api/health`
Expected: `{"status":"ok"}`

- [ ] **Step 5: Verify the API program payload**

Run: `curl http://localhost:3001/api/program`
Expected: JSON starting with `{"title":"Lean & Strong — Full Program","sub":"Phase 1 · Daily Home Routine · Phase 2 Progression · Mon / Wed / Fri / Sat","tabs":[...`

- [ ] **Step 6: Verify the SPA is served**

Run: `curl -s http://localhost:3001/ | grep -o '<div id="root">'`
Expected: `<div id="root">`

- [ ] **Step 7: Verify a deep link falls back to the SPA**

Run: `curl -s http://localhost:3001/some/deep/link | grep -o '<div id="root">'`
Expected: `<div id="root">` (SPA fallback works).

- [ ] **Step 8: Verify 404 JSON for unknown API routes**

Run: `curl -s http://localhost:3001/api/nope`
Expected: `{"error":"Not found"}`

- [ ] **Step 9: Stop the server (Ctrl-C) and run the full test suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 10: Final typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 11: Verify `npm run dev` starts both processes**

Run: `npm run dev`
Expected: Vite prints the local URL on :5173 and Express logs on :3001. Open http://localhost:5173 and confirm the app renders with tabs, day navigation, and working primer accordions. Stop both (Ctrl-C).

- [ ] **Step 12: Commit any final fixes, if present**

If tests or typecheck surfaced issues, fix them, re-run `npm test && npm run typecheck`, then:

```bash
git add -A
git commit -m "fix: address verification issues in express-react conversion"
```

If no issues: no commit needed.

---

## Self-review notes

- **Spec coverage:** Express API (Task 2), structured data on server (Tasks 3–5), React rendering with same design (Tasks 6–7), error/loading states and SPA fallback (Task 7/8), server + client tests (Tasks 2–7). The `styles.css` is the verbatim CSS from the original, so the design is pixel-identical.
- **Type consistency:** `TagTone` matches the CSS tag classes (`tag-green`, etc.); `Section` optional fields mirror the render logic in `DayPanel`; `alt` is stored as a `\n`-joined string and split in `ExerciseCard` (matching the `<br>` rendering in the original).
- **Deviations from spec:** The `HomeRoutine` type includes `eyebrow`/`title`/`sub` (the original home tab also has a `.day-header` that must be preserved). The `Section` type includes an optional `phase`? No — `phaseBar` lives on the phase `Tab`, and `DayPanel` renders it before `DayNav`, matching the original layout.
