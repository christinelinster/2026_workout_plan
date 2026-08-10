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
