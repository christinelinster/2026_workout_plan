# GitHub Pages

Build the current React app and workout data:

```sh
npm run build:pages
```

This replaces the root `index.html` and writes its JavaScript and CSS into
`workout-assets/`. It preserves the other repository files. The workout data is
bundled, so the published site needs no API or Express server.

Commit and push the generated `index.html` and `workout-assets/` along with your
source changes and `.nojekyll`. In **Settings > Pages**, select **Deploy from a
branch**, **main**, and **/ (root)**. GitHub Pages will publish the updated site at
<https://christinelinster.github.io/2026_workout_plan/>.

Run the build again whenever you change the workout data or React app. Edit
`server/data/program.ts` and `client/src`, not the generated root HTML or assets.

For a local preview after building, run `npm run preview:pages` and open
<http://localhost:4173/2026_workout_plan/>.

The repository URL prefix is set in `client/vite.config.ts`; change its Pages
`base` if the repository is renamed or the site moves to a custom domain.

[GitHub Pages publishing settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
