import type { ID, OnExecute } from '@/types';

import { AttemptTask } from './AttemptTask';
import { LoggableTask } from './LoggableTask';

export class EntryTask extends LoggableTask<string> {
	constructor(input: string, requestId: ID) {
		super(requestId, 'entry', input);
	}

	async execute(onExecute: OnExecute) {
		onExecute({
			data: [new AttemptTask(this.requestId, { attempt: 1 })],
			type: 'enqueue',
		});
	}
}
