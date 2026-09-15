import { describe, it, expect } from 'vitest';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import request from 'supertest';
import app from './index';
import type { Program } from './types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexHtml = path.join(__dirname, '..', 'client', 'dist', 'index.html');
const distExists = fs.existsSync(indexHtml);

describe('GET /api/health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/program', () => {
  it('serves the upper/lower program with foundation, home and progression tabs', async () => {
    const res = await request(app).get('/api/program');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Lean & Strong - Upper / Lower');
    expect(res.body.tabs.map((tab: { id: string }) => tab.id)).toEqual(['p1', 'home', 'p2']);
  });

  it('keeps four upper/lower days navigable in each phase with a 60-minute cap', async () => {
    const res = await request(app).get('/api/program');
    for (const phase of res.body.tabs.filter((tab: { kind: string }) => tab.kind === 'phase')) {
      expect(phase.days).toHaveLength(4);
      expect(phase.dayTabs.map((day: { id: string }) => day.id))
        .toEqual(phase.days.map((day: { id: string }) => day.id));
      expect(phase.days.map((day: { eyebrow: string }) => day.eyebrow))
        .toEqual(['Monday | Upper Push', 'Wednesday | Lower Quads', 'Friday | Upper Pull', 'Saturday | Lower Hamstrings & Glutes']);
      for (const day of phase.days) {
        expect(day.meta).toContainEqual({ label: 'Session cap', value: '60 min' });
        expect(day.sections.some((section: { primer?: unknown }) => section.primer)).toBe(false);
      }
    }
  });

  it('serves concise doses, preferred cardio and lower-body exercises in both phases', async () => {
    const res = await request(app).get('/api/program');
    const program: Program = res.body;
    const dose = /^\d+ × \d+(?:-\d+)? (?:reps|sec|min|slow breaths|ankle pumps)(?:\/side)?$/;
    for (const tab of program.tabs) {
      if (tab.kind === 'home') {
        expect(tab.home.blocks.flatMap((block) => block.exercises)).toHaveLength(12);
        for (const exercise of tab.home.blocks.flatMap((block) => block.exercises)) {
          expect(exercise.detail).toMatch(dose);
        }
        continue;
      }
      for (const day of tab.days) {
        for (const section of day.sections) {
          for (const exercise of section.exercises ?? []) {
            expect(exercise.detail).toMatch(dose);
            expect(exercise.num).not.toMatch(/^W/);
            if (exercise.warmup) expect(exercise.warmup).toMatch(dose);
          }
        }
      }
      for (const index of [0, 2]) {
        const sections = tab.days[index].sections;
        expect(sections.flatMap((section) => section.exercises ?? []).filter((exercise) => /^C[12]$/.test(exercise.num))).toHaveLength(2);
        const cardio = sections.find((section) => section.label === 'Cardio')?.exercises?.[0];
        expect(cardio?.name).toBe('Treadmill walking');
        expect(cardio?.detail).toBe('1 × 20 min');
        expect(cardio?.alt).toContain('1 × 20 min');
        expect(cardio?.alt).toContain('low-incline treadmill');
        expect(cardio?.alt).toContain('rowing');
      }
      const lowerA = tab.days[1].sections.flatMap((section) => section.exercises ?? []);
      const lowerB = tab.days[3].sections.flatMap((section) => section.exercises ?? []);
      expect(lowerA.map((exercise) => exercise.name)).toEqual(expect.arrayContaining([
        'Hack squat', 'Supported Bulgarian split squat', 'Seated hamstring curl (Single-leg)', 'Leg extension (Single-leg)',
        'Supported calf raise (Single-leg)',
      ]));
      expect(lowerB.map((exercise) => exercise.name)).toEqual(expect.arrayContaining([
        'Hip thrust machine', 'Dumbbell Romanian deadlift', 'Seated hamstring curl (Single-leg)',
        'Seated calf raise (Single-leg)', 'Hip abductor machine',
      ]));
    }
    expect(JSON.stringify(program)).not.toMatch(/bike|cycling|jump rope|stairmaster/i);
  });

  it('groups exercises in equipment order without returning to an earlier area', async () => {
    const res = await request(app).get('/api/program');
    const program: Program = res.body;
    for (const tab of program.tabs) {
      if (tab.kind !== 'phase') continue;
      for (const day of tab.days) {
        const blocks = day.sections.filter((section) => section.exercises?.length);
        const areas = blocks.map((section) => section.station);
        expect(areas.every(Boolean)).toBe(true);
        const transitions = areas.filter((area, index) => area !== areas[index - 1]);
        expect(new Set(transitions).size).toBe(transitions.length);
      }
      const bench = tab.days[0].sections.find((section) => section.station === 'Dumbbells + adjustable bench');
      expect(bench?.exercises?.map((exercise) => exercise.num)).toEqual(['A', 'D', 'B']);
      expect(bench?.exercises?.every((exercise) => Boolean(exercise.warmup))).toBe(true);
      expect(bench?.exercises?.some((exercise) => exercise.name === 'Incline push-up')).toBe(false);
      const cables = tab.days[2].sections.find((section) => section.station === 'Cable area');
      expect(cables?.exercises?.map((exercise) => exercise.name)).toEqual([
        'Neutral-grip lat pulldown', 'Seated cable row', 'Face pull', 'Pallof press',
      ]);
    }
  });

  it('uses explicit working doses and a distinct progression without altering cardio', async () => {
    const res = await request(app).get('/api/program');
    const program: Program = res.body;
    const phases = program.tabs.filter((tab) => tab.kind === 'phase');
    expect(phases).toHaveLength(2);
    const [base, progression] = phases;
    const exercises = (day: typeof base.days[number]) => day.sections.flatMap((section) => section.exercises ?? []);
    for (const phase of phases) {
      for (const index of [0, 2]) {
        const strength = exercises(phase.days[index]).filter((exercise) => /^[ABC]$/.test(exercise.num));
        expect(strength.find((exercise) => exercise.num === 'A')?.detail).toMatch(/^3 ×/);
        expect(strength.filter((exercise) => exercise.num !== 'A').every((exercise) => exercise.detail.startsWith('2 ×'))).toBe(true);
      }
      const squat = exercises(phase.days[1]).find((exercise) => exercise.name === 'Hack squat');
      expect(squat?.detail).toBe(phase.id === 'p1' ? '3 × 8-10 reps' : '3 × 6-8 reps');
      expect(squat?.warmup).toBe('2 × 5-8 reps');
      expect(squat?.alt).toContain(squat?.detail);
      expect(phase.phaseBar).toContain('Week');
    }
    for (let index = 0; index < 4; index++) {
      expect(progression.days[index].sections.find((section) => section.label === 'Cardio'))
        .toEqual(base.days[index].sections.find((section) => section.label === 'Cardio'));
    }
    expect(exercises(base.days[0]).find((exercise) => exercise.num === 'A')?.detail).toBe('3 × 6-10 reps');
    expect(exercises(progression.days[0]).find((exercise) => exercise.num === 'A')?.detail).toBe('3 × 5-8 reps');
    expect(exercises(base.days[0]).some((exercise) => exercise.name === 'Side plank from knees')).toBe(true);
    expect(exercises(progression.days[0]).some((exercise) => exercise.name === 'Side plank')).toBe(true);
    expect(exercises(progression.days[2]).some((exercise) => exercise.name === 'Push-up')).toBe(true);
    expect(progression.phaseBar).toContain('Week 4');
    expect(progression.phaseBar).toContain('3 sets to 2');
  });
});

describe('static file serving', () => {
  it.skipIf(!distExists)('serves index.html at the root path', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/html/);
    expect(res.text).toContain('<!DOCTYPE html>');
  });

  it.skipIf(!distExists)('serves built static assets', async () => {
    const html = fs.readFileSync(indexHtml, 'utf8');
    const asset = html.match(/src="([^"]+\.js)"/)?.[1];
    expect(asset).toBeDefined();
    const res = await request(app).get(asset as string);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/javascript/);
  });
});

describe('SPA fallback', () => {
  it.skipIf(!distExists)('serves index.html for deep links', async () => {
    const res = await request(app).get('/p1/day/2');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/html/);
    expect(res.text).toContain('<!DOCTYPE html>');
  });
});

describe('JSON error responses', () => {
  it('returns a JSON 404 for unknown API routes', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Not found' });
  });

  it('returns a JSON 500 when a request throws', async () => {
    const res = await request(app)
      .post('/api/health')
      .set('Content-Type', 'application/json')
      .send('{"malformed": ');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal server error' });
  });
});
