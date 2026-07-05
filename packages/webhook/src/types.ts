export type OgmaWebhookPayload = {
	tool: string;
	guildId: string;
	ticketId?: number;
	discordUserId?: string;
	channelId?: string;
	arguments: Record<string, unknown>;
	timestamp: number;
};

/** @deprecated Use {@link OgmaWebhookPayload} */
export type CustomToolWebhookPayload = OgmaWebhookPayload;
