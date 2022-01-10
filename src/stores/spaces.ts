import { writable, derived } from 'svelte/store';
import { getEndpoint } from '../application/endpoints/utils';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';

type Space = {
	space: string;
	project: string;
	app: string;
	tab: string;
};

// Private.
const _spaces: Writable<Space[]> = writable([]);

// Public.
const spaces = derived(_spaces, $val => $val);

// Requests.
const fetchSpaces = async (): Promise<void> => {
	const endpoint = getEndpoint('/system/_spaces');

	// Fetch content from endpoint.
	const response = await fetch(endpoint);
	const payload: Payload<Space[]> = await response.json();

	// Set value to payload data if it exists.
	if (payload.data) {
		_spaces.set(payload.data);
	}
};

export { spaces, fetchSpaces };
