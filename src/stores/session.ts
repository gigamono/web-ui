import { writable, derived } from 'svelte/store';
import { getEndpoint } from '../application/endpoints/utils';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';

type ActiveApp = {
	name: string;
};

type SessionState = {
	activeApps: ActiveApp[];
	focusSpace: string;
	focusProject: string;
	focusApp: string;
	focusTab: string;
};

type SessionProfile = {
	username: string;
	email: string;
	avatar: string;
};

const sessionState: Writable<SessionState> = writable(null);
const sessionProfile: Writable<SessionProfile> = writable(null);

const getSessionState = derived(sessionState, ($val) => $val);
const getSessionProfile = derived(sessionProfile, ($val) => $val);

const fetchSession = (rx: Writable<SessionState | SessionProfile>, url: string) => {
	return async (): Promise<void> => {
		const endpoint = getEndpoint(url);

		// Fetch content from endpoint.
		const response = await fetch(endpoint);
		const payload: Payload<SessionState> = await response.json();

		// Set value to payload data if it exists.
		if (payload.data) {
			rx.set(payload.data);
		}
	};
};

const fetchSessionState = fetchSession(sessionState, '/system/session');
const fetchSessionProfile = fetchSession(sessionProfile, '/system/session?profile=true');

export { getSessionState, getSessionProfile, fetchSessionState, fetchSessionProfile };
