import type { Context } from 'hono';
import { verifyOgmaWebhook, type OgmaWebhookPayload } from '@ogma/webhook';

type VerifyFailure = {
	ok: false;
	status: 400 | 401 | 500;
	error: string;
};

type VerifySuccess = {
	ok: true;
	payload: OgmaWebhookPayload;
};

export type VerifiedOgmaWebhook = VerifySuccess | VerifyFailure;

export async function readVerifiedOgmaWebhook(c: Context): Promise<VerifiedOgmaWebhook> {
	const rawBody = await c.req.text();
	const signature = c.req.header('X-Ogma-Signature');
	const authorization = c.req.header('Authorization');
	const secret = process.env.OGMA_SIGNING_SECRET;

	if (!secret) {
		return { ok: false, status: 500, error: 'OGMA_SIGNING_SECRET is not configured' };
	}

	if (
		!verifyOgmaWebhook({
			rawBody,
			signatureHeader: signature,
			authorizationHeader: authorization,
			secret
		})
	) {
		return { ok: false, status: 401, error: 'Invalid signature' };
	}

	try {
		return { ok: true, payload: JSON.parse(rawBody) as OgmaWebhookPayload };
	} catch {
		return { ok: false, status: 400, error: 'Invalid JSON body' };
	}
}

export function verifiedWebhookErrorResponse(
	c: Context,
	result: VerifyFailure
) {
	return c.json({ error: result.error }, result.status);
}
