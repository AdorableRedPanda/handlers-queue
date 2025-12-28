import type { Executable, OnExecute, TaskType } from '@/types';

export abstract class BaseTask<TPayload> implements Executable {
	protected constructor(
		protected requestId: string,
		protected type: TaskType,
		protected payload: TPayload,
	) {}

	abstract execute(cb: OnExecute): Promise<void>;
}
