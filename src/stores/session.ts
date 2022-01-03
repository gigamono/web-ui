import { writable, derived } from 'svelte/store';
import { getEndpoint } from '../application/endpoints/utils';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';

type App = {
	name: string;
};

type SessionState = {
	activeUserApps: App[];
	activeSystemApps: App[];
	selectedSpace: string;
	selectedProject: string;
	selectedApp: string;
	selectedTab: string;
};

type SessionProfile = {
	username: string;
	email: string;
	avatar: string;
};

const _sessionState: Writable<SessionState> = writable(null);
const _sessionProfile: Writable<SessionProfile> = writable(null);

const sessionState = derived(_sessionState, ($val) => $val);
const sessionProfile = derived(_sessionProfile, ($val) => $val);

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

const fetchSessionState = fetchSession(_sessionState, '/system/session');
const fetchSessionProfile = fetchSession(_sessionProfile, '/system/session?profile=true');

export { sessionState, sessionProfile, fetchSessionState, fetchSessionProfile };
