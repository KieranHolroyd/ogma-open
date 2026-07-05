# @ogmasupport/webhook

Verify signed webhook requests from [Ogma](https://ogma.gg) agentic tools.

Source: [ogma-open](https://github.com/KieranHolroyd/ogma-open) (`packages/webhook`)

## Install

```bash
npm install @ogmasupport/webhook
```

In this monorepo:

```bash
pnpm add @ogmasupport/webhook --workspace
```

## Usage

Ogma signs each webhook with HMAC-SHA256 over `timestamp + "." + raw JSON body`. Verify the signature before handling the request.

```typescript
import { verifyOgmaWebhook, type OgmaWebhookPayload } from '@ogmasupport/webhook';

const secret = process.env.OGMA_SIGNING_SECRET!;

export async function handleWebhook(request: Request): Promise<Response> {
	const rawBody = await request.text();
	const signature = request.headers.get('X-Ogma-Signature') ?? undefined;
	const authorization = request.headers.get('Authorization') ?? undefined;

	if (
		!verifyOgmaWebhook({
			rawBody,
			signatureHeader: signature,
			authorizationHeader: authorization,
			secret
		})
	) {
		return Response.json({ error: 'Invalid signature' }, { status: 401 });
	}

	const payload = JSON.parse(rawBody) as OgmaWebhookPayload;
	// Look up data and return JSON
	return Response.json({ status: 'ok', tool: payload.tool });
}
```

Use the **raw request body string** when verifying. Do not re-serialize parsed JSON.

### Options

| Option | Required | Description |
| --- | --- | --- |
| `rawBody` | yes | Raw request body string |
| `signatureHeader` | yes | Value of `X-Ogma-Signature` |
| `authorizationHeader` | no | Value of `Authorization`; bearer token must match `secret` when present |
| `secret` | yes | Signing secret from the Ogma dashboard |
| `maxAgeSeconds` | no | Max age for timestamp (default: 300) |

## Examples

See [`examples/node-express.ts`](./examples/node-express.ts) for a minimal Express handler.

## License

MIT

## Publishing (maintainers)

This package is published to npm via **trusted publishing** (OIDC) — no long-lived `NPM_TOKEN` in GitHub secrets.

### One-time npm setup

1. Sign in at [npmjs.com](https://www.npmjs.com/) and ensure the `@ogmasupport` scope exists (create an npm org if needed).
2. Open **@ogmasupport/webhook** → **Settings** → **Publishing access** → **Add GitHub Actions trusted publisher**:
   - **Organization or user:** `KieranHolroyd`
   - **Repository:** `ogma-open`
   - **Workflow filename:** `publish-webhook.yml`
   - **Environment:** leave empty
3. Save. npm will accept publishes only from that workflow on this repo.

### Release a version

1. Bump `version` in `packages/webhook/package.json`.
2. Commit and push to `main`.
3. Tag and push (tag must match the package version):

```bash
git tag webhook-v0.1.0
git push origin webhook-v0.1.0
```

GitHub Actions runs [`.github/workflows/publish-webhook.yml`](../../.github/workflows/publish-webhook.yml), verifies the tag matches `package.json`, runs tests, builds, and publishes with `--provenance` (provenance only works in CI, not from your laptop).

For a one-off local publish (no provenance badge):

```bash
pnpm build
npm publish --access public
```
