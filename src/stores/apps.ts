import { writable, derived } from 'svelte/store';
import { getAppsEndpoint } from '../application/endpoints/apps';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';

type App = {
	name: string;
	enabled: boolean;
	isSystemApp: boolean;
};

// Private.
const _enabledApps: Writable<App[]> = writable([]);

// Public.
const enabledApps = derived(_enabledApps, $val => $val);

// Requests.
const fetchEnabledApps = async (): Promise<void> => {
	// Fetch content from endpoint.
	const response = await fetch(getAppsEndpoint(true));
	const payload: Payload<App[]> = await response.json();

	// Set value to payload data if it exists.
	if (payload.data) {
		_enabledApps.set(payload.data);
	}
};

export { fetchEnabledApps, enabledApps };
