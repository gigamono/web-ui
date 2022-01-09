import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { ContextMenu } from '$application/types';

type OpenAppEvent = { event: Event; name: string };

const createEvent = <T>() => {
	const _event: Writable<T | null> = writable(null);
	const event = derived(_event, ($val) => $val);
	const emitter = (args: T): void => {
		_event.set(args);
	};

	return {
		event,
		emitter
	};
};

// Open App Event
const { event: openAppEvent, emitter: emitOpenAppEvent } = createEvent<OpenAppEvent>();

// Close Project Modal Event
const { event: closeProjectModalEvent, emitter: emitCloseProjectModalEvent } =
	createEvent<Record<string, never>>();

// Open Context MenuEvent
const { event: openContextMenuEvent, emitter: emitOpenContextMenuEvent } =
	createEvent<ContextMenu<unknown, unknown>>();

// Close Context MenuEvent
const { event: closeContextMenuEvent, emitter: emitCloseContextMenuEvent } =
	createEvent<Record<string, never>>();

export {
	openAppEvent,
	emitOpenAppEvent,
	closeProjectModalEvent,
	emitCloseProjectModalEvent,
	openContextMenuEvent,
	emitOpenContextMenuEvent,
	closeContextMenuEvent,
	emitCloseContextMenuEvent
};
