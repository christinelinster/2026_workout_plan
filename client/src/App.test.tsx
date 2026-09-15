// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { program } from '../../server/data/program';

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
              rest: '60 s',
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
  it('renders the current program through every gym day and the daily home tab', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(program),
    })));
    render(<App />);
    expect(await screen.findByText(program.title)).toBeTruthy();
    expect(screen.getAllByText('Dumbbell bench press')).toHaveLength(1);
    expect(screen.getAllByText('Chest-supported dumbbell row')).toHaveLength(1);
    const pushBlock = screen.getByRole('heading', { name: 'Strength Block A' }).closest('section');
    expect(pushBlock?.querySelectorAll('.exercise')).toHaveLength(3);
    expect(pushBlock?.textContent).toContain('Dumbbell bench press');
    expect(pushBlock?.textContent).not.toContain('Incline push-up');
    expect(screen.queryByText('Incline push-up')).toBeNull();
    expect(pushBlock?.querySelectorAll('.exercise-line')).toHaveLength(3);
    expect(pushBlock?.querySelector('.workout-block .section-label')).toBeNull();
    expect(pushBlock?.querySelector('.block-timing')?.textContent).toBe('2-3 min');
    const benchCopy = screen.getByText('Dumbbell bench press').parentElement;
    expect(benchCopy?.querySelector('.ex-cue')).not.toBeNull();
    expect(benchCopy?.querySelector('.ex-alt')).not.toBeNull();
    const benchDose = screen.getByText('Dumbbell bench press').closest('.exercise')?.querySelector('.ex-dose');
    expect(benchDose?.querySelector('.ex-warmup')?.textContent).toBe('Warm-up2 × 5-8 reps');
    expect(benchDose?.querySelector('.ex-detail')?.textContent).toBe('Working3 × 6-10 reps');
    expect(screen.getByRole('heading', { name: 'Core' })).toBeTruthy();
    const cardioHeader = screen.getByRole('heading', { name: 'Cardio' }).parentElement;
    expect(cardioHeader?.querySelector('.block-timing')?.getAttribute('aria-label')).toBe('Duration: 20 min');
    expect(pushBlock?.querySelector('.block-header .block-timing')?.getAttribute('aria-label')).toBe('Rest: 2-3 min');
    expect(screen.getByText('Upper • Push')).toBeTruthy();
    expect(screen.queryByText('Press and row preparation')).toBeNull();
    for (const tab of program.tabs) {
      fireEvent.click(screen.getByText(tab.label));
      if (tab.kind === 'home') {
        expect(await screen.findByText('90/90 hip switches')).toBeTruthy();
        expect(document.querySelectorAll('.home-block-num')).toHaveLength(5);
        expect(document.querySelector('.home-ex .exercise-line')).toBeNull();
        expect(screen.getAllByText(/1 × 4 reps\/side/)).toHaveLength(2);
      } else {
        for (let i = 0; i < tab.dayTabs.length; i++) {
          fireEvent.click(screen.getByText(tab.dayTabs[i].label));
          expect(await screen.findByText(tab.days[i].title)).toBeTruthy();
          expect(screen.getByText('60 min')).toBeTruthy();
          expect(document.querySelector('.rest-bar')).toBeNull();
          expect(document.querySelector('.workout-note .info-bar')).not.toBeNull();
          expect(document.querySelector('.workout-block .info-bar')).toBeNull();
          expect(document.querySelector('.block-timing')).not.toBeNull();
          expect(document.querySelector('.phase-bar')).not.toBeNull();
          expect(document.querySelector('.ex-why, .tag-row')).toBeNull();
          expect(screen.queryByRole('button', { name: /athletic primer/i })).toBeNull();
        }
      }
    }
  });

  it('loads the program and shows the header title', async () => {
    render(<App />);
    expect(await screen.findByText('Lean & Strong — Full Program')).toBeTruthy();
  });

  it('shows the first phase day with its exercises', async () => {
    render(<App />);
    expect(await screen.findByText('Pull, glutes & decompression')).toBeTruthy();
    expect(screen.getByText('Wide-grip lat pulldown')).toBeTruthy();
    expect(screen.queryByText('Erector elongation')).toBeNull();
    expect(screen.getByText('60 s')).toBeTruthy();
    expect(screen.getByText('A test day.')).toBeTruthy();
  });

  it('shows selected callouts while keeping exercise rows concise', async () => {
    render(<App />);
    await screen.findByText('Pull, glutes & decompression');
    expect(screen.queryAllByText('Athletic primer')).toHaveLength(0);
    expect(screen.getByText('Station: Cable machine')).toBeTruthy();
    fireEvent.click(screen.getByText('Daily Home'));
    expect(await screen.findByText('Cat-cow')).toBeTruthy();
    expect(screen.getByText('2 × 10 reps.')).toBeTruthy();
    expect(screen.getByText('Skip Block 3 first.')).toBeTruthy();
    expect(screen.getByText('~15 minutes.')).toBeTruthy();
    fireEvent.click(screen.getByText('Phase 2 — Progression'));
    expect(screen.getByText('Move to Phase 2 when controlled.')).toBeTruthy();
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
