import { JSDOM } from 'jsdom';
import { expect, it } from 'vitest';
import { renderWorkout } from './build-workout';

const url = 'https://example.com/2026_workout_plan/';
const page = (href = url) => new JSDOM(renderWorkout(), { url: href, runScripts: 'dangerously' }).window;
const visibleTab = window => window.document.querySelector('[data-panel]:not([hidden])').dataset.panel;
const visibleDay = window => window.document.querySelector('[data-panel]:not([hidden]) [data-day-panel]:not([hidden])')?.dataset.dayPanel;

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
