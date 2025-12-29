import type { ExecuteResult } from '@/types';

import { wait } from '@/helpers';

import { BaseTask } from './BaseTask';
import { TerminalTask } from './TerminalTask';

interface AttemptPayload {
	attempt: number;
	max: number;
}

export class AttemptTask extends BaseTask<AttemptPayload> {
	constructor(payload: AttemptPayload, parent: BaseTask) {
		super(payload, 'attempt', parent);
	}

	async execute(): Promise<ExecuteResult> {
		const { attempt, max } = this.payload;
		const last = attempt >= max;

		const terminalTask = new TerminalTask(
			{
				message: `Max attempts reached: ${max}`,
			},
			this,
		);

		const attemptTask = new AttemptTask({ attempt: attempt + 1, max }, this);

		const next = last ? terminalTask : attemptTask;

		await wait(500 * attempt);
		return {
			data: [next],
			type: 'enqueue',
		};
	}
}
