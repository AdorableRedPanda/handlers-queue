import type { ID, OnExecute } from '@/types';

import { LoggableTask } from './LoggableTask';

interface TerminalPayload {
	message: string;
}

export class TerminalTask extends LoggableTask<TerminalPayload> {
	constructor(requestId: ID, payload: TerminalPayload) {
		super(requestId, 'terminal', payload);
	}

	async execute(onExecute: OnExecute) {
		onExecute({ data: this.payload, type: 'complete' });
	}
}
