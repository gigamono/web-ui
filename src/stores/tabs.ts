import { writable, derived } from 'svelte/store';
import { getTabsEndpoint } from '../application/endpoints/tabs';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';
import type { Tab } from '$application/types';

const _tabs: Writable<Tab[]> = writable([]);
const tabs = derived(_tabs, ($val) => $val);

const fetchTabs = async (): Promise<void> => {
	// Fetch content from endpoint.
	const response = await fetch(getTabsEndpoint());
	const payload: Payload<Tab[]> = await response.json();

	// Set value to payload data if it exists.
	if (payload.data) {
		_tabs.set(payload.data);
	}
};

const fetchTabById = async (id: string): Promise<Tab | null> => {
	// Fetch content from endpoint.
	const response = await fetch(getTabsEndpoint(id));
	const payload: Payload<Tab> = await response.json();

	// Set value to payload data if it exists.
	if (payload.data) {
		return payload.data as Tab;
	}

	return null;
};

export { fetchTabs, fetchTabById, tabs };
