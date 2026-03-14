# PESU Minecraft Server — Season 2 (Official Website)

**Purpose**

Official landing page for the student-run PESU Minecraft Server — Season 2. This site presents server information, join instructions, launch countdown, community showcases, and media (trailer & gallery).


# Key Features

* Full-screen hero with server icon + CTAs (Trailer, Server Contents)
* Loading screen that preloads hero background and server icon
* Real-time server status (polls `api.mcsrvstat.us`) every 30s
* Countdown banner to Season 2 launch with confetti celebration
* Features grid with scroll-triggered fade-in animations
* Gallery carousel with swipe + thumbnails
* Trailer popup (YouTube) in a `Framer Motion` modal
* Server Contents modal with plugin/command/spec breakdown


# Tech Stack

| Layer         | Technology                                |
| ------------- | ----------------------------------------- |
| Framework     | React 18 + TypeScript                     |
| Build Tool    | Vite 5 (SWC)                              |
| Styling       | Tailwind CSS 3 + custom design tokens     |
| UI Components | shadcn/ui (Radix primitives)              |
| Animations    | Framer Motion                             |
| Smooth Scroll | Lenis (desktop only)                      |
| Routing       | React Router DOM v6                       |
| State         | React hooks (useState, useEffect, useRef) |


# Design System

* Dark theme only — deep blacks (`hsl(0 0% 5%)`) with white foreground
* Glassmorphism: `backdrop-filter: blur(24px)` cards/buttons with subtle white borders
* Font: **Poppins** (weights 300–800)
* Brand tokens: `--color-discord`, `--color-emerald`, `--color-orange`
* Hidden scrollbars globally with a `scrollbar-custom` utility class


# Getting Started (Developer)

> The project uses Vite + TypeScript. Node 18+ recommended.

```bash
# install
npm ci

# dev server (hot reload)
npm run dev

# build for production
npm run build

# preview production build locally
npm run preview
```

**Common scripts** (example `package.json`):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint --ext .ts,.tsx src/",
    "format": "prettier --write ."
  }
}
```


# Environment Variables

Create a `.env` file (Vite requires `VITE_` prefix):

```
VITE_API_BASE=https://api.mcsrvstat.us/v2
VITE_DISCORD_INVITE=https://discord.gg/your-invite
VITE_LAUNCH_DATE=2026-05-01T18:00:00.000Z
VITE_YT_VIDEO_ID=your_youtube_video_id
```

* `VITE_API_BASE` — used for polling server status (no auth required for `mcsrvstat`).
* `VITE_LAUNCH_DATE` — ISO timestamp used by the countdown banner.

---

# Implementation Notes

### Loading screen

* Preload hero image + server icon before swapping into the main UI.
* Use `AnimatePresence` to transition the loader out.

### Hero & CTA

* CTA buttons open trailer modal or server-contents modal.
* Trailer uses YouTube embed inside a Framer Motion modal rendered to a portal.

### Features grid

* Use `IntersectionObserver` to add `visible` class for fade-in.
* Stagger reveal delays (100ms–500ms) using data attributes.

### Gallery

* Carousel with thumbnail nav and swipe support (mobile friendly).

### Countdown & Confetti

* Countdown calculates remaining time from `VITE_LAUNCH_DATE`.
* When zero, fire the custom confetti particle system and reveal celebration UI.

### Server Status

* Poll `GET ${VITE_API_BASE}/status?ip=<server-ip-or-host>` every 30 seconds.
* Gracefully handle network failures and show offline UI state.

Example poll logic:

```ts
setInterval(async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/status?ip=play.pesu.example`);
  const data = await res.json();
  // update state: online/offline, playerCount, motd
}, 30_000);
```


# Accessibility & Responsiveness

* Mobile-first responsive layout; Lenis smooth scroll disabled on touch devices.
* Keyboard-accessible modals and focus trapping via Radix primitives.
* Alt text for all media and aria labels for interactive controls.


# Styling / Tailwind tokens

Add custom tokens to `tailwind.config.js` or CSS variables for the brand colors and glassmorphism utilities.


# Deployment

Any static host supporting SPA fallback will work (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

* Ensure `VITE_*` env vars are set in the host's dashboard.
* Use proper cache headers for images (hero, gallery) to speed up repeat visits.


# Contributing

1. Fork the repo
2. Create a feature branch (`feat/your-feature`)
3. Open a PR with a concise description and screenshots

Please follow the existing code style (Prettier + ESLint). Keep animations performant and mobile-friendly.


# Acknowledgements

* `mcsrvstat` for server status API
* `Framer Motion`, `shadcn/ui`, `Lenis`

