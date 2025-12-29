const TIMEOUT = 10 * 1000;

export const validateTimeout = (start: Date) => {
	const now = Date.now();

	if (now - start.getTime() >= TIMEOUT) {
		throw new Error('Execution timeout');
	}
};
