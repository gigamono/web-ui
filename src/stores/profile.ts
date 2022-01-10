import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';
import { getEndpoint } from '$application/endpoints/utils';

type Profile = {
	username: string;
	email: string;
	avatarUrl: string;
};

type ProfileOptional = {
	username?: string;
	email?: string;
	avatarUrl?: string;
};

// Private.
const _myProfile: Writable<Profile | null> = writable(null);

// Public.
const myProfile = derived(_myProfile, ($val) => $val);

// Requests.
const fetchMyProfile = async (): Promise<void> => {
	// Fetch content from endpoint.
	const response = await fetch(getEndpoint('/system/profile'));
	const payload: Payload<Profile> = await response.json();

	// Set value to payload data if it exists.
	if (payload.data) {
		_myProfile.set(payload.data);
	}
};

const modifyMyProfile = async (newProfile: ProfileOptional): Promise<void> => {
	const response = await fetch(getEndpoint('/system/profile'), {
		method: 'PUT',
		body: JSON.stringify(newProfile)
	});

	if (response.ok) {
		_myProfile.update((profile) => ({ ...profile as Profile, ...newProfile }));
	}
};

export { myProfile, fetchMyProfile, modifyMyProfile };
