# Desktop (Microsoft Store)

Tauri wrapper (planned). Requires:
- Rust toolchain (`rustup`)
- System C toolchain (`cc`/`gcc`) — not available in this environment
- Node.js (for frontend build)

Build flow (on a machine with prerequisites):
```bash
pnpm --filter web build
cd apps/desktop
cargo install tauri-cli
cargo tauri init   # first time
cargo tauri build  # produces MSIX
```

Current scaffold: `tauri.conf.json` only. Full `src-tauri/` to be generated via `cargo tauri init`.
