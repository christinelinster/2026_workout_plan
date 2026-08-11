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

  it('exposes the primer accordion toggle as an accessible button', async () => {
    render(<App />);
    await screen.findByText('Pull, glutes & decompression');
    const toggle = screen.getByRole('button', { name: /athletic primer/i });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-controls')).toBe('primer-menu');
    fireEvent.click(toggle);
    await waitFor(() => expect(toggle.getAttribute('aria-expanded')).toBe('true'));
    const menu = document.getElementById('primer-menu');
    expect(menu).not.toBeNull();
    expect(menu?.getAttribute('aria-labelledby')).toBe('primer-menu-label');
    fireEvent.click(toggle);
    await waitFor(() => expect(toggle.getAttribute('aria-expanded')).toBe('false'));
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
