import type {BaseTask, Loggable} from '@/types';
import { createQueue } from "@/createQueue";

import { EntryTask } from '@/tasks';

export const execute = async (
    input: string,
    onLog: (t: Loggable) => void,
) => {
	const queue = createQueue<BaseTask>([new EntryTask(input)]);

    let resolve;

    const promise = new Promise((r) => {resolve = r;})

	for await (const task of queue) {
        onLog(task);

		await task.execute(queue, { get: () => null }, resolve);
	}

	console.log('All tasks done');

    return promise;
};