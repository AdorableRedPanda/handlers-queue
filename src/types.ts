export interface Executable {
	execute: (onExecute: OnExecute) => Promise<void>;
}

export interface GeneralResponse {
	message: string;
}

export type ID = string;

export interface Loggable {
	toLogger: () => Record<string, any>;
}

export type TasksQueueItem = Executable & Loggable;

export type TaskType = 'attempt' | 'entry' | 'terminal';

export type OnExecute = (arg: ExecuteResult) => void;

type ExecuteResult =
	| { data: GeneralResponse; type: 'complete' }
	| { data: TasksQueueItem[]; type: 'enqueue' };
