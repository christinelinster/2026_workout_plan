import { cpSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const fromRoot = (path) => fileURLToPath(new URL(`../${path}`, import.meta.url));

// Build in isolation, then copy only published files. Never empty the repo root.
// Copy assets first so index.html only changes after its dependencies exist.
cpSync(fromRoot('client/dist-pages/workout-assets'), fromRoot('workout-assets'), {
  recursive: true,
});
cpSync(fromRoot('client/dist-pages/index.html'), fromRoot('index.html'));
writeFileSync(fromRoot('.nojekyll'), '');
console.log('GitHub Pages files generated: index.html, workout-assets/, .nojekyll');
