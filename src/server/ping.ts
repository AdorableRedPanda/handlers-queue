import type { Context } from 'hono';

const format = (d: Date) =>
	d.toLocaleString('en-GB', {
		dateStyle: 'medium',
		timeStyle: 'medium',
	});

const statusRes = {
	AUTH_HEADER: Bun.env.AUTH_HEADER,
	buildTime: format(new Date()),
	CHROME_PATH: Bun.env.CHROME_PATH,
	PORT: Bun.env.PORT,
	TARGET_HOST: Bun.env.TARGET_HOST,
};

export const ping = (c: Context) => c.json(statusRes);
