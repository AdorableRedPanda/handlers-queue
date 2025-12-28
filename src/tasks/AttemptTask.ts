import type { ID, OnExecute } from '@/types';

import { LoggableTask } from '@/tasks/LoggableTask';
import { TerminalTask } from '@/tasks/TerminalTask';
import { wait } from '@/wait';

interface AttemptPayload {
	attempt: number;
}

export class AttemptTask extends LoggableTask<AttemptPayload> {
	constructor(requestId: ID, payload: AttemptPayload) {
		super(requestId, 'attempt', payload);
	}

	async execute(onExecute: OnExecute) {
		if (this.payload.attempt >= 3) {
			onExecute({
				data: [
					new TerminalTask(this.requestId, {
						message: `Attempt ${this.payload.attempt} reached.`,
					}),
				],
				type: 'enqueue',
			});
			return;
		}
		await wait(500 * this.payload.attempt);
		onExecute({
			data: [
				new AttemptTask(this.requestId, { attempt: this.payload.attempt + 1 }),
			],
			type: 'enqueue',
		});
	}
}
