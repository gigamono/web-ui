import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { ContextMenu } from '$application/types';

type launchAppEvent = { name: string };

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


// Event for when an app needs to be launched.
const { event: launchAppEvent, emitter: emitLaunchAppEvent } = createEvent<launchAppEvent>();

// Event for notifiying that an app has been launched.
const { event: appLaunchedEvent, emitter: emitAppLaunchedEvent } =
	createEvent<Record<string, never>>();

// Event for when project modal needs to be closed.
const { event: closeProjectModalEvent, emitter: emitCloseProjectModalEvent } =
	createEvent<Record<string, never>>();

// Event for when a context menu needs to be opened.
const { event: openContextMenuEvent, emitter: emitOpenContextMenuEvent } =
	createEvent<ContextMenu<unknown, unknown>>();

// Event for when a context menu needs to be closed.
const { event: closeContextMenuEvent, emitter: emitCloseContextMenuEvent } =
	createEvent<Record<string, never>>();

export {
	launchAppEvent,
	emitLaunchAppEvent,
	closeProjectModalEvent,
	emitCloseProjectModalEvent,
	openContextMenuEvent,
	emitOpenContextMenuEvent,
	closeContextMenuEvent,
	emitCloseContextMenuEvent,
	appLaunchedEvent,
	emitAppLaunchedEvent
};
