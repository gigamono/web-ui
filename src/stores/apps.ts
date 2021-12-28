import { writable, derived } from 'svelte/store';
import { getAppsEndpoint } from '../application/endpoints/apps';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';

type App = {
	name: string;
	installed: string;
};

const apps: Writable<App[]> = writable([]);

const getApps = derived(apps, $apps => $apps);

const fetchApps = async (installed: boolean): Promise<void> => {
	// Fetch content from endpoint.
	const response = await fetch(getAppsEndpoint(installed));
	const payload: Payload<App[]> = await response.json();

	// Set value to payload data if it exists.
	if (payload.data) {
		apps.set(payload.data);
	}
};

export { fetchApps, getApps };
