// Copyright 2022 the Gigamono authors. All rights reserved. GPL-3.0 License.

import { getEndpoint } from '$application/endpoints/utils';
import type { Payload } from '$stores/types';
import type { Project } from '$types/model';

// Requests.
const fetchRemoteProjects = async (): Promise<Project[]> => {
	// Fetch content from endpoint.
	const response = await fetch(getEndpoint('/system/projects'));
	const payload: Payload<Project[]> = await response.json();

	if (payload.data) {
		return payload.data;
	}

	return [];
};

export { fetchRemoteProjects };
