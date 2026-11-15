import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { program } from '../server/data/program';
import type { Day, Exercise, HomeRoutine, Section, Tab } from '../server/types';

const fromRoot = (path: string) => new URL(`../${path}`, import.meta.url);
const escape = (value: string | number) => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function renderExercise(exercise: Exercise) {
  const { num, name, cue, alt, warmup, detail } = exercise;
  return `
    <div class="exercise">
      <div class="ex-row">
        <div class="ex-num">${escape(num)}</div>
        <div class="ex-body">
          <div class="exercise-line">
            <div class="ex-copy">
              <div class="ex-name">${escape(name)}</div>
              ${cue ? `<div class="ex-cue">${escape(cue)}</div>` : ''}
              ${alt ? `<div class="ex-alt">${alt.split('\n').map(escape).join('<br>')}</div>` : ''}
            </div>
            <div class="ex-dose">
              ${warmup ? `<div class="ex-warmup"><span class="dose-label">Warm-up</span>${escape(warmup)}</div>` : ''}
              <div class="ex-detail">${warmup ? '<span class="dose-label">Working</span>' : ''}${escape(detail)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function renderSection({ label, station, rest, duration, info, exercises }: Section) {
  if (!exercises?.length && !info && !rest) return '';
  const hasExercises = Boolean(exercises?.length);
  const timing = rest ?? duration;
  return `
    <section class="${hasExercises ? 'workout-section' : 'workout-note'}">
      <div class="block-header">
        ${label ? `<h2 class="section-label">${escape(label)}</h2>` : ''}
        ${timing ? `<span class="block-timing" aria-label="${rest ? 'Rest' : 'Duration'}: ${escape(timing)}">${escape(timing)}</span>` : ''}
      </div>
      <div${hasExercises ? ' class="workout-block"' : ''}>
        ${station ? `<div class="station-badge">${escape(station)}</div>` : ''}
        ${info ? `<p class="${hasExercises ? 'block-note' : 'info-bar'}">${escape(info)}</p>` : ''}
        ${exercises?.map(renderExercise).join('') ?? ''}
      </div>
    </section>`;
}

function renderDay(day: Day, index: number) {
  return `
    <div data-day-panel="${escape(day.id)}"${index ? ' hidden' : ''}>
      <header class="day-header">
        <h2 class="day-title">${escape(day.title)}</h2>
        <p class="day-sub">${escape(day.sub)}</p>
      </header>
      <div class="meta-row">
        ${day.meta.map(({ label, value }) => `<div class="meta-card">
          <div class="meta-label">${escape(label)}</div><div class="meta-val">${escape(value)}</div>
        </div>`).join('')}
      </div>
      ${day.sections.map(renderSection).join('')}
    </div>`;
}

function renderHome(home: HomeRoutine) {
  return `
    <header class="day-header">
      <h2 class="day-title">${escape(home.title)}</h2>
      <p class="day-sub">${escape(home.sub)}</p>
    </header>
    ${home.infoBars.map(info => `<p class="info-bar">${escape(info)}</p>`).join('')}
    ${home.blocks.map(block => `
      <section class="home-block">
        <div class="home-block-header">
          <div class="home-block-num">${escape(block.num)}</div>
          <h3 class="home-block-title">${escape(block.title)}</h3>
          <div class="home-block-time">${escape(block.time)}</div>
        </div>
        ${block.exercises.map(exercise => `
          <div class="home-ex">
            <div class="home-ex-num">${escape(exercise.num)}</div>
            <div class="home-ex-copy">
              <div class="home-ex-name">${escape(exercise.name)}</div>
              <div class="home-ex-detail">${escape(exercise.detail)}${exercise.cue ? ` - ${escape(exercise.cue)}` : ''}</div>
            </div>
          </div>`).join('')}
      </section>`).join('')}`;
}

function renderTab(tab: Tab, index: number) {
  const content = tab.kind === 'home' ? renderHome(tab.home) : `
    ${tab.phaseBar ? `<div class="phase-bar">${escape(tab.phaseBar)}</div>` : ''}
    <nav class="day-nav" aria-label="Workout day">
      ${tab.dayTabs.map((day, i) => `<button type="button" class="day-tab${i ? '' : ' active'}" aria-pressed="${!i}" data-day="${escape(day.id)}">${escape(day.label)}</button>`).join('')}
    </nav>
    ${tab.days.map(renderDay).join('')}`;
  return `<div data-panel="${escape(tab.id)}"${index ? ' hidden' : ''}>${content}</div>`;
}

export function renderWorkout() {
  const styles = readFileSync(fromRoot('client/src/styles.css'), 'utf8');
  const navigation = readFileSync(fromRoot('scripts/workout-navigation.js'), 'utf8');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(program.title)}</title>
  <style>
${styles}
    [hidden] { display: none !important; }
  </style>
</head>
<body>
  <header class="page-header"><h1 class="page-title">${escape(program.title)}</h1></header>
  <nav class="main-nav" aria-label="Workout plan">
    ${program.tabs.map((tab, i) => `<button type="button" class="main-tab${i ? '' : ' active'}" aria-pressed="${!i}" data-tab="${escape(tab.id)}">${escape(tab.label)}</button>`).join('')}
  </nav>
  <main class="content-area">${program.tabs.map(renderTab).join('')}</main>
  <script>
${navigation}
  </script>
</body>
</html>
`.replace(/[ \t]+$/gm, '');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const html = renderWorkout();
  writeFileSync(fromRoot('index.html'), html);
  mkdirSync(fromRoot('client/dist/'), { recursive: true });
  writeFileSync(fromRoot('client/dist/index.html'), html);
}
