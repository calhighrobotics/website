import { mkdir, readFile, writeFile } from 'node:fs/promises';

// GitHub Pages needs a real entry file for direct visits and reloads of SPA routes.
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const routes = ['teams', '1516a', 'legacy', 'cubs', 'summer-camp', 'contact', 'teams/1516a', 'events', 'camp2024', 'sponsor', 'apply', 'formsubmitted'];
for (const route of routes) {
  const directory = new URL(`../dist/${route}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), html);
}

// An HTML alias avoids case-colliding directories on Windows while preserving the old URL.
await writeFile(new URL('../dist/1516A.html', import.meta.url), '<!doctype html><html lang="en"><meta charset="utf-8"><title>Team 1516A</title><meta http-equiv="refresh" content="0;url=/1516a/"><script>location.replace("/1516a/" + location.search + location.hash)</script><a href="/1516a/">Continue to Team 1516A</a></html>');
