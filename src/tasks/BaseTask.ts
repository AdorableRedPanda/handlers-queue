import type { Executable, ExecuteResult, TaskType } from '@/types';

import { RootTask } from '@/tasks/RootTask';

export abstract class BaseTask<TPayload extends object = object>
	extends RootTask<unknown>
	implements Executable
{
	protected constructor(
		public payload: TPayload,
		public type: TaskType,
		parent: RootTask<unknown>,
	) {
		super(type, parent.requestId, parent.projectId, payload);
	}

	abstract execute(): Promise<ExecuteResult>;
}
