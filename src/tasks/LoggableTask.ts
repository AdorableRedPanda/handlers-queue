import type { Loggable } from '@/types';

export class LoggableTask<TPayload> implements Loggable {
	constructor(
		protected payload: TPayload,
		private type: string,
		private createdAt = new Date(),
        private id = crypto.randomUUID().slice(0, 6)
	) {}

	public toLogger() {
		return {
			createdAt: this.createdAt.toISOString(),
			logged: new Date().toISOString(),
			type: this.type,
            id: this.id,
		};
	}
}
