# Ogma Open Source

Open-source SDK and reference implementations for [Ogma](https://ogma.gg) [agentic tools](https://ogma.gg/docs/dashboard/agentic-tools.html).

**Repository:** [github.com/KieranHolroyd/ogma-open](https://github.com/KieranHolroyd/ogma-open)

| Package | npm | Description |
| --- | --- | --- |
| `@ogmasupport/webhook` | [npm](https://www.npmjs.com/package/@ogmasupport/webhook) | Verify signed webhook requests from Ogma |
| `@ogmasupport/demo-agentic-tools-server` | — | Mock webhook server and dashboard import bundle ([demo.ogma.gg](https://demo.ogma.gg/)) |

The main Ogma platform (bot, dashboard, API) lives in the private [`ogma`](https://github.com/KieranHolroyd/ogma) repository.

## Prerequisites

- Node.js 20+
- pnpm 10.15+

## Getting started

```bash
pnpm install
pnpm test
pnpm demo:dev
```

## Packages

### `@ogmasupport/webhook`

Node.js helper for verifying HMAC-signed agentic tool webhooks. See [`packages/webhook/README.md`](packages/webhook/README.md).

```bash
pnpm webhook:test
pnpm webhook:build
```

### Demo agentic tools server

Mock API backing [demo.ogma.gg](https://demo.ogma.gg/) — pizza menu, orders, subscriptions, licenses, accounts, and action tools (`create_order`, `cancel_order`) for testing staff approval. See [`apps/demo-agentic-tools-server/README.md`](apps/demo-agentic-tools-server/README.md).

```bash
cp apps/demo-agentic-tools-server/.env.example apps/demo-agentic-tools-server/.env
pnpm demo:dev
```

Import the bundle from `GET /demo-agentic-tools.json` in the Ogma dashboard.

## Publishing `@ogmasupport/webhook`

See [`packages/webhook/README.md`](packages/webhook/README.md#publishing-maintainers). Releases are tagged `webhook-v*` and published to npm via GitHub Actions trusted publishing.

## License

MIT — see [LICENSE](LICENSE).
