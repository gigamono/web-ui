// Copyright 2022 the Gigamono authors. All rights reserved. GPL-3.0 License.

import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';

type AppSelectedEvent = { appId: string };

type TabSelectedEvent = { tabId: string };

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
const { event: dashboardStartedEvent, emitter: emitDashboardStartedEvent } =
	createEvent<Record<string, never>>();

// Event for when an app has been selected.
const { event: appSelectedEvent, emitter: emitAppSelectedEvent } = createEvent<AppSelectedEvent>();

// Event for when a tab has been selected.
const { event: tabSelectedEvent, emitter: emitTabSelectedEvent } = createEvent<TabSelectedEvent>();

export {
	dashboardStartedEvent,
	emitDashboardStartedEvent,
	appSelectedEvent,
	emitAppSelectedEvent,
	tabSelectedEvent,
	emitTabSelectedEvent
};
