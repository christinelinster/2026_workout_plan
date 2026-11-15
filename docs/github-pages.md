# GitHub Pages

Open the root `index.html` directly in a browser to use the workout program.
The page contains its styles and navigation script and works without React or
a running server. The URL records the selected plan and day. Browser storage
also remembers the last view when you open the base URL again.

Update the workout data in `server/data/`, the stylesheet in
`client/src/styles.css`, or the navigation in `scripts/workout-navigation.js`.
Then regenerate the page:

```sh
npm run build:pages
```

Commit `index.html` with your source changes. In **Settings > Pages**, select
**Deploy from a branch**, **main**, and **/ (root)**. The site is published at
<https://christinelinster.github.io/2026_workout_plan/>.

For an HTTP preview, run `npm run preview:pages` and open
<http://localhost:3001/>.
