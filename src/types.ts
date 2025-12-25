type EventType = 'entry' | 'terminal';

export interface BaseEvent {
	type: EventType;
}

export interface EntryEvent extends BaseEvent {
	type: 'entry';
	payload: string;
}
