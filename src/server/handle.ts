import type { Context } from 'hono';

export const handle = (c: Context) => c.json({ message: 'Handle endpoint' });
