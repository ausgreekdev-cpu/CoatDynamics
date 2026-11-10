# Painter Contracting SaaS

Multi-tenant B2B SaaS for painting enterprises. See plan in `~/.opencode/plan/painter-saas-architecture.md`.

## Structure
- `apps/web` — Vite + React + Tailwind PWA
- `apps/mobile` — Capacitor wrapper (TODO)
- `apps/desktop` — Tauri wrapper (TODO)
- `packages/*` — shared libs (TODO)
- `supabase/` — DB migrations & edge functions (TODO)

## Dev
```
pnpm install
pnpm dev
```
