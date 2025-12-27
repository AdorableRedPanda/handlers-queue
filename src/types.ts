export type BaseTask = Executable & Loggable;

export interface Executable {
	execute: (
		queue: Pushable,
		http: HttpClient,
		onClose: (v: any) => void,
	) => Promise<void>;
}

export interface Loggable {
	toLogger: () => Record<string, any>;
}

export interface Pushable {
	push: (...items: any[]) => void;
}

interface HttpClient {
	get: (url: string, options?: any) => Promise<any>;
}
