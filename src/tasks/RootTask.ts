import type { TaskDto, TaskType } from '@/types';

export class RootTask<TPayload> implements TaskDto<TPayload> {
	constructor(
		public type: TaskType,
		public requestId: string,
		public projectId: string,
		public payload: TPayload,
		public createdAt = new Date().toISOString(),
	) {}
}
