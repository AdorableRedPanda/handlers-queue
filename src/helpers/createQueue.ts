export function createQueue<TItem>(initial: TItem[]) {
	const queue: TItem[] = [...initial];

	function* iterator() {
		while (queue.length > 0) {
			yield queue.shift() as TItem;
		}
	}

	const push = (...items: TItem[]) => queue.push(...items);

	return {
		push,
		[Symbol.iterator]: iterator,
	};
}
