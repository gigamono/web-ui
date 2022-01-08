import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';
import { getEndpoint } from '$application/endpoints/utils';

type SessionOpenTab = {
	id: string;
	app: string;
	tabId: string;
	focus: boolean;
};

type SessionFocus = {
	app: string;
};

type SessionOpenTabPartial = Partial<SessionOpenTab>;

type SessionFocusPartial = Partial<SessionFocus>;

const _sessionOpenTabs: Writable<SessionOpenTab[]> = writable([]);
const _sessionFocus: Writable<SessionFocus> = writable(null);

const sessionOpenTabs = derived(_sessionOpenTabs, ($val) => $val);
const sessionFocus = derived(_sessionFocus, ($val) => $val);

const fetchSession = <T>(rx: Writable<T>, endpoint: string) => {
	return async (): Promise<void> => {
		// Fetch content from endpoint.
		const response = await fetch(endpoint);
		const payload: Payload<T> = await response.json();

		// Set value to payload data if it exists.
		if (payload.data) {
			rx.set(payload.data);
		}
	};
};

const modifyNonCritical = <T>(rx: Writable<T | Array<T & { id: string }>>, endpoint: string) => {
	return async (newValue: T & { id: string }): Promise<void> => {
		// Update session in store irrespective of whether subsequent request is succesful or not.
		rx.update((session) => {
			if (session instanceof Array) {
				// If value exists in array, replace it.
				const index = session.findIndex((value) => value.id === newValue.id);
				if (index > -1) {
					session.splice(index, 1);
					session.push(newValue);
				}

				return session;
			}

			return { ...session, ...newValue };
		});

		await fetch(endpoint, {
			method: 'PUT',
			body: JSON.stringify(newValue)
		});
	};
};

const fetchSessionFocus = fetchSession<SessionFocus>(
	_sessionFocus,
	getEndpoint('/system/session/focus')
);

const fetchSessionOpenTabs = fetchSession<SessionOpenTab[]>(
	_sessionOpenTabs,
	getEndpoint('/system/session/open_tabs')
);

const modifySessionFocusNonCritical = modifyNonCritical<SessionFocusPartial>(
	_sessionFocus,
	getEndpoint('/system/session/focus')
);

const modifySessionTabsNonCritical = modifyNonCritical<SessionOpenTabPartial>(
	_sessionOpenTabs,
	getEndpoint('/system/session/focus')
);

export {
	sessionFocus,
	sessionOpenTabs,
	fetchSessionFocus,
	fetchSessionOpenTabs,
	modifySessionFocusNonCritical,
	modifySessionTabsNonCritical
};
