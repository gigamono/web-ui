import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { ContextMenu } from '$application/types';

type OpenAppEvent = { event: Event; name: string };

// Open App Event
const _openAppEvent: Writable<OpenAppEvent> = writable(null);
const openAppEvent = derived(_openAppEvent, ($val) => $val);
const setOpenAppEvent = (event: Event, name: string): void => {
	_openAppEvent.set({ event, name });
};

// Close Project Modal Event
const _closeProjectModalEvent: Writable<Record<string, string>> = writable(null);
const closeProjectModalEvent = derived(_closeProjectModalEvent, ($val) => $val);
const setCloseProjectModalEvent = (): void => {
	_closeProjectModalEvent.set({});
};

// Open Context MenuEvent
const _openContextMenuEvent: Writable<ContextMenu> = writable(null);
const openContextMenuEvent = derived(_openContextMenuEvent, ($val) => $val);
const setOpenContextMenuEvent = (menu: ContextMenu): void => {
	_openContextMenuEvent.set(menu);
};

// Close Context MenuEvent
const _closeContextMenuEvent: Writable<Record<string, string>> = writable(null);
const closeContextMenuEvent = derived(_closeContextMenuEvent, ($val) => $val);
const setCloseContextMenuEvent = (): void => {
	_closeContextMenuEvent.set({});
};

export {
	openAppEvent,
	setOpenAppEvent,
	closeProjectModalEvent,
	setCloseProjectModalEvent,
	openContextMenuEvent,
	setOpenContextMenuEvent,
	closeContextMenuEvent,
	setCloseContextMenuEvent
};
