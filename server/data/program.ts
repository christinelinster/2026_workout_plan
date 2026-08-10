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
