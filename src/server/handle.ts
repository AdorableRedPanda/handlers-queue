import type { Context } from 'hono';

import type { LogDto } from '@/types';

import { execute } from '@/execute';
import { buildId, wait } from '@/helpers';
import { EntryTask } from '@/tasks';

export const handle = async (c: Context) => {
	const input = c.req.query('input') || 'not specified';
	const attempts = Number.parseInt(c.req.query('attempts') || '10');

	const projectId = buildId();
	const requestId = buildId();

	const entry = new EntryTask({ input, attempts }, requestId, projectId);

	const onLog = async (log: LogDto) => {
		await wait(1);
		console.info('[log]', log);
	};

	try {
		const result = await execute(entry, onLog);

		return c.json(result);
	} catch (error) {
		const message = (error as Error).message || 'Unknown error';
		console.error(
			`Error during execution: ${message}, requestId: ${requestId}`,
		);
		return c.json({ message, requestId }, 500);
	}
};
