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

  it('serves the home routine content', async () => {
    const res = await request(app).get('/api/program');
    const home = res.body.tabs.find((t: { id: string }) => t.id === 'home');
    expect(home.home.sub).toContain('~15 minutes');
    expect(home.home.infoBars).toHaveLength(1);
    expect(home.home.blocks).toHaveLength(4);
    expect(home.home.blocks[3].exercises).toHaveLength(2);
    expect(home.home.blocks[0].exercises[2].name).toBe('Wall slide (wall angel)');
  });

  it('returns a home tab with home blocks', async () => {
    const res = await request(app).get('/api/program');
    const home = res.body.tabs.find((t: { id: string }) => t.id === 'home');
    expect(home.kind).toBe('home');
    expect(home.home.blocks).toHaveLength(4);
    expect(home.home.blocks[0].title).toBe('Spinal mobility & decompression');
  });

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
});
