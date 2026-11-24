# CoatDynamics

Multi-tenant B2B SaaS for painting enterprises.

## Structure
- `apps/web` — Vite + React + Tailwind PWA
- `apps/mobile` — Capacitor wrapper (requires Node >= 22)
- `apps/desktop` — Tauri wrapper (requires Rust)
- `packages/*` — shared libs
- `supabase/` — DB migrations & edge functions

## Dev
```bash
pnpm install
pnpm dev
```

## Build
```bash
pnpm build          # web
pnpm build:mobile   # web + capacitor sync (Node >= 22)
pnpm build:desktop  # tauri (Rust required)
pnpm test           # vitest
pnpm typecheck      # tsc
```

## Environment
Copy `apps/web/.env.example` to `apps/web/.env` and set Supabase keys.
