import type {
	GeneralResponse,
	Loggable,
	OnExecute,
	TasksQueueItem,
} from '@/types';

import { createQueue } from '@/createQueue';

const TIMEOUT = 2 * 60 * 1000;

export const execute = async (
	entry: TasksQueueItem,
	onLog: (t: Loggable) => Promise<void>,
) => {
	const queue = createQueue<TasksQueueItem>([entry]);
	const startTime = Date.now();

	let resolve: (data: GeneralResponse) => void;
	const promise = new Promise((r) => {
		resolve = r;
	});

	const onExecute: OnExecute = (result) => {
		switch (result.type) {
			case 'complete':
				resolve(result.data);
				return;

			case 'enqueue':
				queue.push(...result.data);
				return;
		}
	};

	for await (const task of queue) {
		await onLog(task);
		const now = Date.now();

		if (now - startTime > TIMEOUT) {
			throw new Error('Execution timeout');
		}

		await task.execute(onExecute);
	}

	console.log('All tasks done');

	return promise;
};
