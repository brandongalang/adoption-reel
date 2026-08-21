# enablement-lab (prototype, Mar 2026)

Clickable mock of two screens:

1. An internal AI enablement hub (onboarding, tool directory, champion stories).
2. An exec “AI pulse” dashboard (adoption, model health, initiative pipeline).

Fictional company (**Meridian**). Fictional tools (**Helix**, **Forge**). Synthetic metrics.

I sketched this while thinking about how a PE / holdco operator would see AI adoption and ROI across teams. The UI itself is one company, not a live multi-portco roll-up. Built as a portfolio prototype, then anonymized.

Not a product. Not maintained. Not affiliated with an employer.

## Run

```sh
bun install
bun dev
```

- Hub: http://localhost:3000
- Dashboard: http://localhost:3000/leadership-dashboard.html

## Stack

Next.js App Router, React 19, TypeScript, Tailwind CSS 4.
