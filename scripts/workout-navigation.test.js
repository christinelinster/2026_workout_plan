import { JSDOM } from 'jsdom';
import { expect, it } from 'vitest';
import { renderWorkout } from './build-workout';

const url = 'https://example.com/2026_workout_plan/';
const page = (href = url) => new JSDOM(renderWorkout(), { url: href, runScripts: 'dangerously' }).window;
const visibleTab = window => window.document.querySelector('[data-panel]:not([hidden])').dataset.panel;
const visibleDay = window => window.document.querySelector('[data-panel]:not([hidden]) [data-day-panel]:not([hidden])')?.dataset.dayPanel;

it('opens an exercise progression with ordered rungs, doses, and advancement targets', () => {
  const window = page(url + '#tab=calisthenics&day=training-pull');
  const pullDay = window.document.querySelector('[data-day-panel="training-pull"]');
  const lSit = [...pullDay.querySelectorAll('.exercise')].find(card => card.querySelector('.ex-name').textContent === 'L-sit hold');
  const details = lSit.querySelector('details');
  expect(details.open).toBe(false);
  details.querySelector('summary').click();
  expect(details.open).toBe(true);
  const rungs = [...details.querySelectorAll('li')].map(rung => rung.textContent);
  expect(rungs[0]).toMatch(/Both heels supported.*3 × 8-15 sec.*3 × 15 sec/s);
  expect(rungs.at(-1)).toMatch(/Floor L-sit/);
  expect(lSit.querySelector('.ex-alt')).toBeNull();
  const allRungs = window.document.querySelectorAll('[data-panel="calisthenics"] .ex-progression li');
  expect(allRungs.length).toBeGreaterThan(0);
  for (const rung of allRungs) {
    const link = rung.querySelector('a.ex-demo');
    expect(new URL(link.href).protocol).toBe('https:');
    expect(link.getAttribute('aria-label')).toContain(rung.querySelector('strong').textContent);
  }
  for (const link of window.document.querySelectorAll('a.ex-demo')) {
    expect(link.target).toBe('_blank');
    expect(link.relList.contains('noopener')).toBe(true);
  }
  expect(window.document.querySelector('[aria-label="Demo: Tucked hollow hold"]').href).toBe('https://coreboundfit.com/technique/hollow-hold/');
  window.close();
});

it('restores the selected workout tab and day when its URL is reloaded', () => {
  const first = page();
  first.document.querySelector('[data-tab="p2"]').click();
  first.document.querySelector('[data-day="p2d2"]').click();
  const refreshed = page(first.location.href);
  expect(visibleTab(refreshed)).toBe('p2');
  expect(visibleDay(refreshed)).toBe('p2d2');
  first.close();
  refreshed.close();
});

it('remembers each plan’s day and falls back to a valid view for an unknown route', () => {
  const first = page();
  first.document.querySelector('[data-day="training-vertical"]').click();
  first.document.querySelector('[data-tab="home"]').click();
  expect(visibleTab(first)).toBe('home');
  first.document.querySelector('[data-tab="calisthenics"]').click();
  expect(visibleDay(first)).toBe('training-vertical');

  const fallback = page(url + '#tab=unknown&day=missing');
  expect(visibleTab(fallback)).toBe('calisthenics');
  expect(visibleDay(fallback)).toBe('training-push');
  first.close();
  fallback.close();
});

it('restores the last viewed tab and day when reopening the base URL in the same browser', () => {
  const first = page();
  first.document.querySelector('[data-tab="p1"]').click();
  first.document.querySelector('[data-day="p1d1"]').click();
  const reopened = new JSDOM(renderWorkout(), {
    url,
    runScripts: 'dangerously',
    beforeParse(window) {
      const key = 'lean-and-strong.workout-view';
      window.localStorage.setItem(key, first.localStorage.getItem(key));
    },
  }).window;
  expect(visibleTab(reopened)).toBe('p1');
  expect(visibleDay(reopened)).toBe('p1d1');
  first.close();
  reopened.close();
});

it('restores the selected day when opening the downloaded HTML directly', () => {
  const first = page('file:///lean-and-strong.html');
  first.document.querySelector('[data-day="training-pull"]').click();
  const refreshed = page(first.location.href);
  expect(visibleTab(refreshed)).toBe('calisthenics');
  expect(visibleDay(refreshed)).toBe('training-pull');
  first.close();
  refreshed.close();
});
