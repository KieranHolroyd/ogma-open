# Thoth demo agentic tools server

Mock webhook API for Thoth agentic tool demos ([demo.thothsupport.dev](https://demo.thothsupport.dev/)).

Part of the [thoth-open](https://github.com/KieranHolroyd/thoth-open) repository.

## Local development

From the **repository root**:

```bash
cp apps/demo-agentic-tools-server/.env.example apps/demo-agentic-tools-server/.env
pnpm demo:dev
```

Or from this directory after `pnpm install` at the repo root:

```bash
cp .env.example .env
pnpm dev
```

## Deploy on Railway

Use **one** of these setups:

### Option A — app directory (recommended for existing projects)

| Setting | Value |
| --- | --- |
| **Root Directory** | `apps/demo-agentic-tools-server` |
| **Config file path** | `apps/demo-agentic-tools-server/railway.toml` |

The demo app depends on `@thothsupport/webhook` from npm, so it does not need the monorepo workspace at deploy time.

### Option B — repository root

| Setting | Value |
| --- | --- |
| **Root Directory** | `.` |
| **Config file path** | `railway.toml` |

Set `THOTH_SIGNING_SECRET` in the service environment. Railway health-checks `GET /health`.

### Optional: Docker (local)

From the repository root:

```bash
docker build -f apps/demo-agentic-tools-server/docker/Dockerfile .
```

## Deploy on Vercel

Create a Vercel project with:

| Setting | Value |
| --- | --- |
| Root Directory | `apps/demo-agentic-tools-server` |
| Include source files outside Root Directory | **enabled** |

Set `THOTH_SIGNING_SECRET` in the Vercel project environment.

`vercel.json` installs and builds from the monorepo root so the demo app can depend on `@thothsupport/webhook`.

## Endpoints

- `GET /health`
- `GET /demo` — tool index
- `GET /demo-agentic-tools.json` — dashboard import bundle
- REST routes for menu, orders, subscriptions, licenses, accounts, store
- `POST /` — Thoth signed webhook (routes by `tool` name)
- `POST /FINI50` — Thoth signed webhook for the 50% off promo demo tool

The import bundle includes two **action** tools (`create_order`, `cancel_order`) that mutate demo order state — use them to test Thoth's staff approval flow. Read tools run immediately; action tools create a pending approval on live tickets.

Import `src/data/demo-agentic-tools.json` in the dashboard to create all demo tools pointing at your deployed URL.
