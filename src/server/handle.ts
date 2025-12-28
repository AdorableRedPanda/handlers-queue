import type { Context } from 'hono';

import type { Loggable } from '@/types';

import { buildId } from '@/buildId';
import { execute } from '@/execute';
import { EntryTask } from '@/tasks';
import { wait } from '@/wait';

export const handle = async (c: Context) => {
	const input = c.req.query('input') || 'not specified';
	const requestId = buildId();

	const entry = new EntryTask(input, requestId);

	const onLog = async (task: Loggable) => {
		await wait(1);
		console.log(task.toLogger());
	};

	try {
		const result = await execute(entry, onLog);

		return c.json(result);
	} catch (error) {
		return c.json({ error: (error as Error).message }, 500);
	}
};
