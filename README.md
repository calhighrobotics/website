# Cal High Robotics

An interactive website draft for California High School Robotics in San Ramon. Built with SolidJS, TypeScript, Vite, and Three.js. School colors come from the club's supplied vector logo.

## Run locally

Use Node.js 24 LTS (minimum 22.12) and npm. The npm lockfile is authoritative.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Open http://127.0.0.1:3000. For a production preview:

```sh
npm run typecheck
npm run build
npm run serve -- --host 127.0.0.1
```

## Pages

- `/` — students, club overview, programs, and competition teams
- `/teams` — 1516A and 1516X, with incoming 1516Y, 1516Z, and 1516V
- `/1516a` — team identity, a pre-rendered Push Back robot film, optional design model, engineering details, and 13 dated awards
- `/legacy` — FRC 1516's 2005–2012 history, transition to VEX, season-specific media, and 31 sourced award records
- `/cubs` — Cal High's high-school novice robotics program
- `/summer-camp` — the completed 2026 camp and future-session contact information
- `/contact` — join, mentor, and sponsorship email links

Existing `/apply`, `/sponsor`, `/events`, `/camp2024`, and `/formsubmitted` paths lead to relevant current pages. `/1516A` and `/teams/1516a` resolve to the team showcase. The static GitHub Pages fallback retains deep links.

## Content and assets

Research was checked on October 15, 2026. Public source links are recorded in `docs/content-sources.txt`.

- The Push Back robot represents the 2025–26 game; 2026–27 is Override. Award records are dated, and Team X's VEX Worlds appearance is not attributed to Team A.
- Y, Z, and V are introduced as upcoming teams based on club-provided information. No rosters, nicknames, or achievements were invented.
- Cubs is an in-school novice program. Summer camp serves a separate audience. The 2026 camp has ended; no future dates or open registration are claimed.
- Club photographs and the logo were supplied by the club. Summer-camp images are labeled as 2026 camp images, not Cubs or current competition rosters.
- Archival FRC photographs are credited to NASA / Dominic Hart (2007) and NASA (2010). See the credits on the Legacy page and `docs/content-sources.txt`.
- Cubs includes photographs of the actual program from the 2022–23 club archive and its December 2025 competition. School-newspaper photographs retain publisher credits; public availability does not itself establish republication permission.
- The robot model and render derivatives come from the club's existing completed Blender scene. Originals were preserved. New renders correct the Brain screen orientation; only the displayed UI orientation changed. The browser model uses a measured, simplified mesh, not manufacturing geometry.
- Fonts are self-hosted; their licenses are in `static/fonts`. The Draco decoder license is in `static/draco`.
- Photographs receive restrained display-only tone and color adjustments through `PhotoColor.tsx`/CSS. The underexposed Worlds group photo has its own shadow/midtone adjustment. Logos, published posters, CAD wireframes, and controlled-light robot renders are excluded. Original photo files, faces, lettering, and image geometry are unchanged.

The old browser-side SMTP credential was removed from the implementation. Contact buttons open an email draft; there is no hidden submission service. Previously exposed credentials should be rotated by the account owner before any future reuse.

The unused bundled PDF.js 3.7.107 viewer was removed from the served files. The sponsorship PDF remains available directly through the browser's own PDF reader. See Mozilla's advisory: https://github.com/mozilla/pdf.js/security/advisories/GHSA-wgrm-67xf-hhpq.

## Motion and compatibility

The Legacy page keeps the current season's media pinned on the left while the 23 season stories scroll down the right. An orange-and-black, scroll-linked chapter transition marks the shift from FRC to VEX and reverses when scrolling back. Year controls jump directly to a season; mobile uses stacked stories with their own media and a season selector. Reduced motion retains a static, readable chapter boundary.

Photography, season transitions, and page motion preserve normal document order. On 1516A only, a silent pre-rendered film loops subtly behind the hero with a Pause/Play control. Three four-second shots move the camera at a constant angular speed around the stationary robot, cutting directly between viewpoints and back to the start. There is no camera easing, reverse playback, or passive cursor tracking. Robot posters and the team-directory image remain still.

The film pauses when hidden/offscreen and defaults to a static poster for reduced-motion and data-saving preferences. The optional design-model explorer supports deliberate mouse dragging, touch dragging, and keyboard/button controls, and loads only after activation. Failed WebGL and loading failures retain usable images and content. GPU resources and listeners belong to their view and are released when it unmounts. Three.js is split from the ordinary page bundle; the organization homepage does not load a robot scene.

Check the real published pages on target phones and Safari before release; desktop Chromium emulation does not establish physical-device GPU performance or screen-reader conformance.

## Deployment boundary

This draft has not been pushed or deployed. CI runs `npm ci`, type checking, and the production build on pull requests. Only a push to `main` can run the separate publishing job. Root and static `CNAME` files consistently use `calhighrobotics.org`; no DNS or custom-domain settings were changed.
