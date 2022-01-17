import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { ContextMenu } from '$types/app';

const createSignal = <T>() => {
	const _signal: Writable<T | null> = writable(null);
	const signal = derived(_signal, ($val) => $val);
	const emitter = (args: T): void => {
		_signal.set(args);
	};

	return {
		signal,
		emitter
	};
};

// Signal that project modal needs to be opened.
const { signal: openProjectModalSignal, emitter: emitOpenProjectModalSignal } =
	createSignal<Record<string, never>>();

// Signal that project modal needs to be closed.
const { signal: closeProjectModalSignal, emitter: emitCloseProjectModalSignal } =
	createSignal<Record<string, never>>();

// Signal that a context menu needs to be opened.
const { signal: openContextMenuSignal, emitter: emitOpenContextMenuSignal } =
	createSignal<ContextMenu<unknown, unknown>>();

// Signal that a context menu needs to be closed.
const { signal: closeContextMenuSignal, emitter: emitCloseContextMenuSignal } =
	createSignal<Record<string, never>>();

export {
	openProjectModalSignal,
	emitOpenProjectModalSignal,
	closeProjectModalSignal,
	emitCloseProjectModalSignal,
	openContextMenuSignal,
	emitOpenContextMenuSignal,
	closeContextMenuSignal,
	emitCloseContextMenuSignal
};
