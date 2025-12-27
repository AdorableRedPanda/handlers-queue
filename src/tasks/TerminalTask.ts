import type { Executable } from '@/types';

import { LoggableTask } from './LoggableTask';

interface TerminalPayload {
	message: string;
}

export class TerminalTask
	extends LoggableTask<TerminalPayload>
	implements Executable
{
	constructor(payload: TerminalPayload) {
		super(payload, 'terminal');
	}

	async execute(_, __, onClose ) {
        onClose(this.payload);
	}
}
