import type { Executable, Pushable } from '@/types';

import { LoggableTask } from '@/tasks/LoggableTask';
import { TerminalTask } from '@/tasks/TerminalTask';
import { wait } from '@/wait';

interface AttemptPayload {
	attempt: number;
}

export class AttemptTask
	extends LoggableTask<AttemptPayload>
	implements Executable
{
	constructor(payload: AttemptPayload) {
		super(payload, 'attempt');
	}

	async execute(queue: Pushable) {
		if (this.payload.attempt >= 3) {
			queue.push(
				new TerminalTask({
					message: `Attempt ${this.payload.attempt} reached.`,
				}),
			);
            return;
		}
		await wait(500 * this.payload.attempt);
		queue.push(new AttemptTask({ attempt: this.payload.attempt + 1 }));
	}
}
