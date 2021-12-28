import { writable, derived } from 'svelte/store';
import { getEndpoint } from '../application/endpoints/utils';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';

type Session = {
	space: string;
	project: string;
	app: string;
	tab: string;
};

const session: Writable<Session> = writable(null);

const getSession = derived(session, $session => $session);

const fetchSession = async (): Promise<void> => {
	const endpoint = getEndpoint('/system/session');

	// Fetch content from endpoint.
	const response = await fetch(endpoint);
	const payload: Payload<Session> = await response.json();

	// Set value to payload data if it exists.
	if (payload.data) {
		session.set(payload.data);
	}
};

export { getSession, fetchSession };
