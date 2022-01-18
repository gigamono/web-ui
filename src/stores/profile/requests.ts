// Copyright 2022 the Gigamono authors. All rights reserved. Apache 2.0 license.

import { getEndpoint } from '$application/endpoints/utils';
import type { Payload } from '$stores/types';
import type { MyProfile } from '$types/model';

const fetchRemoteMyProfile = async (): Promise<MyProfile | null> => {
	// Fetch content from endpoint.
	const response = await fetch(getEndpoint('/system/profile'));
	const payload: Payload<MyProfile> = await response.json();

	// Set value to payload data if it exists.
	if (payload.data) {
		return payload.data;
	}

	return null;
};

type MyProfilePartial = Partial<MyProfile>;

const modifyRemoteMyProfile = async (newProfile: MyProfilePartial): Promise<boolean> => {
	const response = await fetch(getEndpoint('/system/profile'), {
		method: 'PUT',
		body: JSON.stringify(newProfile)
	});

	return response.ok;
};

export { fetchRemoteMyProfile, modifyRemoteMyProfile };
