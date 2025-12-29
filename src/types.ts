import type { BaseTask } from '@/tasks/BaseTask';

export type DateString = string;

export interface Executable {
	execute: () => Promise<ExecuteResult>;
}

export type ExecuteResult<TPayload extends object = object> =
	| { data: BaseTask<TPayload>[]; type: 'enqueue' }
	| { data: GeneralResponse; type: 'complete' };
export interface GeneralResponse {
	message: string;
}

export type ID = string;

export type LogDto = string;

export interface TaskDto<TPayload> {
	createdAt: DateString;
	payload: TPayload;
	projectId: ID;
	requestId: ID;
	type: TaskType;
}

export type TaskType = 'attempt' | 'entry' | 'terminal';
