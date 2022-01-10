import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';
import { getEndpoint } from '$application/endpoints/utils';
import type { SessionFocus, SessionOpenTab, Tab } from '$application/types';
import { get } from 'svelte/store';

type SessionOpenTabPartial = Partial<SessionOpenTab>;
type SessionFocusPartial = Partial<SessionFocus>;

// Private.
const _sessionOpenTabs: Writable<SessionOpenTab[]> = writable([]);
const _sessionFocus: Writable<SessionFocus | null> = writable(null);
const _focusAppOpenTabs: Writable<Tab[]> = writable([]);
const _focusAppTab: Writable<Tab | null> = writable(null);

// Public.
const sessionOpenTabs = derived(_sessionOpenTabs, ($val) => $val);
const sessionFocus = derived(_sessionFocus, ($val) => $val);
const sessionFocusAndOpenTabs = derived([_sessionFocus, _sessionOpenTabs], ([focus, openTabs]) => ({
	focus,
	openTabs
}));
const focusAppOpenTabs = derived(_focusAppOpenTabs, ($val) => $val);
const focusAppTab = derived(_focusAppTab, ($val) => $val);

// Subscriptions.
sessionFocusAndOpenTabs.subscribe(async ({ focus }) => {
	// Only if there is a focus app.
	if (focus?.app) {
		_focusAppOpenTabs.set(await fetchSessionOpenTabsTabs(focus.app));
	}
});

focusAppOpenTabs.subscribe((focusAppOpenTabs: Tab[]) => {
	const openTabs = get(_sessionOpenTabs);
	const focus = get(_sessionFocus);

	// Check list of open tabs for associated app.
	const focusAppTab = openTabs.find((tab) => tab.app === focus?.app && tab.focus) || null;

	// If it exists, fetch the actual tab.
	if (focusAppTab) {
		const foundTab = focusAppOpenTabs.find((tab) => focusAppTab.tabId === tab.id) || null;
		_focusAppTab.set(foundTab);
	} else {
		// If not, fetch the first open tab in the app if one exists.
		const firstOpenTab = openTabs.find((tab) => tab.app === focus?.app);
		if (firstOpenTab) {
			const foundTab = focusAppOpenTabs.find((tab) => firstOpenTab.tabId === tab.id) || null;
			_focusAppTab.set(foundTab);
		}
	}
});

// Requests.
const fetchSessionOpenTabsTabs = async (app: string): Promise<Tab[]> => {
	// Fetch content from endpoint.
	const response = await fetch(getEndpoint(`/system/session/open_tabs/tabs?app=${app}`));
	const payload: Payload<Tab[]> = await response.json();

	// Return payload data if it exists.
	if (payload.data) {
		return payload.data;
	}

	return [];
};

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

const fetchSessionFocus = fetchSession<SessionFocus | null>(
	_sessionFocus,
	getEndpoint('/system/session/focus')
);

const fetchSessionOpenTabs = fetchSession<SessionOpenTab[]>(
	_sessionOpenTabs,
	getEndpoint('/system/session/open_tabs')
);

const modifySessionFocusNonCritical = modifyNonCritical<SessionFocusPartial | null>(
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
	focusAppTab,
	focusAppOpenTabs,
	fetchSessionFocus,
	fetchSessionOpenTabs,
	modifySessionFocusNonCritical,
	modifySessionTabsNonCritical
};
