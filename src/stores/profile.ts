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

const _profile: Writable<Profile> = writable(null);
const profile = derived(_profile, ($val) => $val);

const fetchProfile = async (): Promise<void> => {
	// Fetch content from endpoint.
	const response = await fetch(getEndpoint('/system/profile'));
	const payload: Payload<Profile> = await response.json();

	// Set value to payload data if it exists.
	if (payload.data) {
		_profile.set(payload.data);
	}
};

const modifyProfile = async (newProfile: ProfileOptional): Promise<void> => {
	const response = await fetch(getEndpoint('/system/profile'), {
		method: 'PUT',
		body: JSON.stringify(newProfile)
	});

	if (response.ok) {
		_profile.update((profile) => ({ ...profile, ...newProfile }));
	}
};

export {
    profile,
	fetchProfile,
    modifyProfile
};
