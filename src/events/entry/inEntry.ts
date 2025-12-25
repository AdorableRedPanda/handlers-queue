import { BaseEvent, EntryEvent } from "@/types";

export const inEntry = (ev: BaseEvent): ev is EntryEvent =>
    ev.type === 'entry' && 'payload' in ev && typeof ev.payload === 'string';