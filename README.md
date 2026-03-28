# TaskRabbit AI Enablement — portfolio prototype

Next.js prototype for an internal **AI enablement hub** (employee-facing) and narrative walkthrough of a **bottom-up + leadership visibility** (“barbell”) adoption model. Built as a take-home / interview portfolio piece.

## What’s in the repo

- **Main app** — `src/app/page.tsx`: hub UI, walkthrough, and mock data for adoption health, champions, and leadership-style summaries.
- **Static leadership dashboard** — `public/leadership-dashboard.html`: single-file HTML/CSS/JS dashboard (open directly in a browser or via `/leadership-dashboard.html` when running Next).

## Run locally

```bash
bun install   # or npm install
bun dev       # or npm run dev
```

- App: [http://localhost:3000](http://localhost:3000)
- Static dashboard: [http://localhost:3000/leadership-dashboard.html](http://localhost:3000/leadership-dashboard.html)

## Build

```bash
bun run build && bun run start
```

## Stack

Next.js (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn-style UI primitives.
