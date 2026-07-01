# Thoth Open Source

Open-source SDK and reference implementations for [Thoth](https://thothsupport.dev) [agentic tools](https://thothsupport.dev/docs/dashboard/agentic-tools.html).

**Repository:** [github.com/KieranHolroyd/thoth-open](https://github.com/KieranHolroyd/thoth-open)

| Package | npm | Description |
| --- | --- | --- |
| `@thothsupport/webhook` | [npm](https://www.npmjs.com/package/@thothsupport/webhook) | Verify signed webhook requests from Thoth |
| `@thothsupport/demo-agentic-tools-server` | — | Mock webhook server and dashboard import bundle ([demo.thothsupport.dev](https://demo.thothsupport.dev/)) |

The main Thoth platform (bot, dashboard, API) lives in the private [`thoth`](https://github.com/KieranHolroyd/thoth) repository.

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

### `@thothsupport/webhook`

Node.js helper for verifying HMAC-signed agentic tool webhooks. See [`packages/webhook/README.md`](packages/webhook/README.md).

```bash
pnpm webhook:test
pnpm webhook:build
```

### Demo agentic tools server

Mock API backing [demo.thothsupport.dev](https://demo.thothsupport.dev/) — pizza menu, orders, subscriptions, licenses, accounts, and action tools (`create_order`, `cancel_order`) for testing staff approval. See [`apps/demo-agentic-tools-server/README.md`](apps/demo-agentic-tools-server/README.md).

```bash
cp apps/demo-agentic-tools-server/.env.example apps/demo-agentic-tools-server/.env
pnpm demo:dev
```

Import the bundle from `GET /demo-agentic-tools.json` in the Thoth dashboard.

## Publishing `@thothsupport/webhook`

See [`packages/webhook/README.md`](packages/webhook/README.md#publishing-maintainers). Releases are tagged `webhook-v*` and published to npm via GitHub Actions trusted publishing.

## License

MIT — see [LICENSE](LICENSE).
