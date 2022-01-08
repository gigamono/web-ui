import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';
import { getEndpoint } from '$application/endpoints/utils';

type App = {
	name: string;
};

type Session = {
	activeUserApps: App[];
	activeSystemApps: App[];
	selectedSpace: string;
	selectedProject: string;
	selectedApp: string;
	selectedTab: string;
};

type SessionOptional = {
	activeUserApps?: App[];
	activeSystemApps?: App[];
	selectedSpace?: string;
	selectedProject?: string;
	selectedApp?: string;
	selectedTab?: string;
};

const _session: Writable<Session> = writable(null);
const session = derived(_session, ($val) => $val);

const fetchSession = async (): Promise<void> => {
	// Fetch content from endpoint.
	const response = await fetch(getEndpoint('/system/session'));
	const payload: Payload<Session> = await response.json();

	// Set value to payload data if it exists.
	if (payload.data) {
		_session.set(payload.data);
	}
};

const modifySession = async (newSession: SessionOptional): Promise<void> => {
	const response = await fetch(getEndpoint('/system/session'), {
		method: 'PUT',
		body: JSON.stringify(newSession)
	});

	if (response.ok) {
		_session.update((session) => ({ ...session, ...newSession }));
	}
};

export {
	session,
	fetchSession,
	modifySession
};
