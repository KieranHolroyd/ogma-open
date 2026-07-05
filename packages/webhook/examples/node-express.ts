/**
 * Minimal Express webhook handler for Ogma agentic tools.
 *
 *   npm install express @ogmasupport/webhook
 *   OGMA_SIGNING_SECRET=your-secret npx tsx examples/node-express.ts
 */
import express from 'express';

import { verifyOgmaWebhook, type OgmaWebhookPayload } from '@ogmasupport/webhook';

const secret = process.env.OGMA_SIGNING_SECRET;
if (!secret) {
	throw new Error('OGMA_SIGNING_SECRET is required');
}

const app = express();

app.post(
	'/webhook',
	express.raw({ type: 'application/json' }),
	(req, res) => {
		const rawBody = req.body.toString('utf8');
		const signature = req.header('X-Ogma-Signature');
		const authorization = req.header('Authorization');

		if (
			!verifyOgmaWebhook({
				rawBody,
				signatureHeader: signature,
				authorizationHeader: authorization,
				secret
			})
		) {
			res.status(401).json({ error: 'Invalid signature' });
			return;
		}

		const payload = JSON.parse(rawBody) as OgmaWebhookPayload;
		res.json({
			tool: payload.tool,
			orderId: payload.arguments.orderId,
			status: 'shipped'
		});
	}
);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
	console.log(`listening on http://localhost:${port}/webhook`);
});
