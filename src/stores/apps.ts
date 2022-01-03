import { writable, derived } from 'svelte/store';
import { getAppsEndpoint } from '../application/endpoints/apps';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';

type App = {
	name: string;
	installed: string;
};

const _apps: Writable<App[]> = writable([]);

const apps = derived(_apps, $val => $val);

const fetchApps = async (installed: boolean): Promise<void> => {
	// Fetch content from endpoint.
	const response = await fetch(getAppsEndpoint(installed));
	const payload: Payload<App[]> = await response.json();

	// Set value to payload data if it exists.
	if (payload.data) {
		_apps.set(payload.data);
	}
};

export { fetchApps, apps };
