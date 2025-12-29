import type { ExecuteResult } from '@/types';

import { BaseTask } from '@/tasks/BaseTask';

interface TerminalPayload {
	message: string;
}

export class TerminalTask extends BaseTask<TerminalPayload> {
	constructor(payload: TerminalPayload, parent: BaseTask) {
		super(payload, 'terminal', parent);
	}

	async execute(): Promise<ExecuteResult> {
		return { data: this.payload, type: 'complete' };
	}
}
