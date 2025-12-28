import type { ID, Loggable, TaskType } from '@/types';

import { BaseTask } from '@/tasks/BaseTask';

export abstract class LoggableTask<TPayload>
	extends BaseTask
	implements Loggable
{
	protected constructor(
		requestId: ID,
		type: TaskType,
		protected payload: TPayload,
		private createdAt = new Date(),
	) {
		super(requestId, type, payload);
	}

	public toLogger() {
		return {
			createdAt: this.createdAt.toISOString(),
			logged: new Date().toISOString(),
			payload: this.payload,
			requestId: this.requestId,
			type: this.type,
		};
	}
}
