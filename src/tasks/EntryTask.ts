import type { Executable, Pushable } from '@/types';

import { AttemptTask } from './AttemptTask';
import { LoggableTask } from './LoggableTask';

export class EntryTask extends LoggableTask<string> implements Executable {
	constructor(input: string) {
		super(input, 'entry');
	}

	async execute(queue: Pushable) {
		queue.push(new AttemptTask({ attempt: 1 }));
	}
}
