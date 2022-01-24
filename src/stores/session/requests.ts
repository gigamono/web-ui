// Copyright 2022 the Gigamono authors. All rights reserved. GPL-3.0 License.

import { getEndpoint } from '$application/endpoints/utils';
import type { Payload } from '$stores/types';
import type {
	SessionAccessibleAppXApp,
	SessionAccessibleProjectXProject,
	SessionOpenTabXTab
} from '$types/model';

const fetchRemoteSessionOpenTabsXTabs = async (
	appId = '',
	projectId = '',
	focus: boolean | null = null
): Promise<SessionOpenTabXTab[]> => {
	const appIdQ = appId ? `appId=${appId}` : '';
	const projectIdQ = projectId ? `projectId=${projectId}` : '';
	const focusQ = focus !== null ? `focus=${focus}` : '';

	// Fetch content from endpoint.
	const response = await fetch(
		getEndpoint(`/system/session/open_tabs/tabs?${appIdQ}&${projectIdQ}&${focusQ}`)
	);
	const payload: Payload<SessionOpenTabXTab[]> = await response.json();

	// Return payload data if it exists.
	if (payload.data) {
		return payload.data;
	}

	return [];
};

const fetchRemoteSessionAccessibleAppsXApps = async (
	focus: boolean | null = null
): Promise<SessionAccessibleAppXApp[]> => {
	const focusQ = focus !== null ? `focus=${focus}` : '';

	// Fetch content from endpoint.
	const response = await fetch(getEndpoint(`/system/session/accessible_apps/apps?${focusQ}`));
	const payload: Payload<SessionAccessibleAppXApp[]> = await response.json();

	// Return payload data if it exists.
	if (payload.data) {
		return payload.data;
	}

	return [];
};

const fetchRemoteSessionAccessibleProjectsXProjects = async (
	focus: boolean | null = null
): Promise<SessionAccessibleProjectXProject[]> => {
	const focusQ = focus !== null ? `focus=${focus}` : '';

	// Fetch content from endpoint.
	const response = await fetch(
		getEndpoint(`/system/session/accessible_projects/projects?${focusQ}`)
	);
	const payload: Payload<SessionAccessibleProjectXProject[]> = await response.json();

	// Return payload data if it exists.
	if (payload.data) {
		return payload.data;
	}

	return [];
};

export {
	fetchRemoteSessionOpenTabsXTabs,
	fetchRemoteSessionAccessibleAppsXApps,
	fetchRemoteSessionAccessibleProjectsXProjects
};
