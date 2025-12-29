import type { BaseTask } from '@/tasks/BaseTask';
import type { LogDto } from '@/types';

import { createQueue, stringifyTask, validateTimeout } from '@/helpers';

export const execute = async (
	entry: BaseTask,
	onLog: (t: LogDto) => Promise<void>,
) => {
	const queue = createQueue<BaseTask>([entry]);
	const start = new Date();

	for await (const task of queue) {
		await onLog(stringifyTask(task));
		validateTimeout(start);

		const result = await task.execute();

		if (result.type === 'enqueue') {
			queue.push(...result.data);
		}

		if (result.type === 'complete') {
			return result.data;
		}
	}

	console.info('All tasks done');

	throw new Error('No complete result found');
};
