import type { Context } from 'hono';

const format = (d: Date) =>
	d.toLocaleString('en-GB', {
		dateStyle: 'medium',
		timeStyle: 'medium',
	});

const statusRes = {
	TARGET_HOST: Bun.env.TARGET_HOST,
	PORT: Bun.env.PORT,
	AUTH_HEADER: Bun.env.AUTH_HEADER,
	CHROME_PATH: Bun.env.CHROME_PATH,
	buildTime: format(new Date()),
};

export const ping = (c: Context) => c.json(statusRes);
