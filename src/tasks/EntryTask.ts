import type { ExecuteResult, ID } from '@/types';

import { AttemptTask } from './AttemptTask';
import { BaseTask } from './BaseTask';
import { RootTask } from './RootTask';

interface EntryPayload {
	attempts: number;
	input: string;
}

export class EntryTask extends BaseTask<EntryPayload> {
	constructor(payload: EntryPayload, requestId: ID, projectId: ID) {
		const root = new RootTask<EntryPayload>(
			'entry',
			requestId,
			projectId,
			payload,
		);
		super(payload, 'entry', root);
	}

	async execute(): Promise<ExecuteResult> {
		const next = new AttemptTask(
			{ attempt: 1, max: this.payload.attempts },
			this,
		);
		return Promise.resolve({
			data: [next],
			type: 'enqueue',
		});
	}
}
