// Copyright 2022 the Gigamono authors. All rights reserved. GPL-3.0 License.

import { appSelectedEvent, dashboardStartedEvent, tabSelectedEvent } from '$stores/events/events';
import type {
	App,
	Project,
	SessionAccessibleAppXApp,
	SessionAccessibleProjectXProject,
	SessionOpenTabXTab,
	Tab
} from '$types/model';
import { get } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import {
	fetchRemoteSessionAccessibleAppsXApps,
	fetchRemoteSessionAccessibleProjectsXProjects,
	fetchRemoteSessionOpenTabsXTabs
} from './requests';

const subscribeFocusApp = (
	_focusProject: Writable<Project | null>,
	_focusAppOpenTabs: Writable<SessionOpenTabXTab[]>,
	_focusAppOpenTab: Writable<Tab | null>,
	focusApp: Readable<App | null>,
	accessibleProjects: Readable<SessionAccessibleProjectXProject[]>,
	openTabs: Readable<SessionOpenTabXTab[]>
): void => {
	focusApp.subscribe(async (focusApp_) => {
		if (focusApp_) {
			const accessibleProjects_ = get(accessibleProjects);
			const openTabs_ = get(openTabs);

			let focusAppOpenTabs: SessionOpenTabXTab[] = [];
			let focusAppOpenTab: SessionOpenTabXTab | null = null;
			let focusProject: SessionAccessibleProjectXProject | null = null;

			if (focusApp) {
				focusAppOpenTabs = openTabs_.filter((tab) => tab.appId === focusApp_.id);
				focusAppOpenTab = focusAppOpenTabs.find((tab) => tab.focus) || null;
				focusProject =
					accessibleProjects_.find((project) => project.id === focusAppOpenTab?.projectId) || null;
			}

			_focusProject.set(focusProject);
			_focusAppOpenTabs.set(focusAppOpenTabs);
			_focusAppOpenTab.set(focusAppOpenTab);
		}
	});
};

const subscribeDashboardStartedEvent = (
	_accessibleApps: Writable<SessionAccessibleAppXApp[]>,
	_accessibleProjects: Writable<SessionAccessibleProjectXProject[]>,
	_openTabs: Writable<SessionOpenTabXTab[]>,
	_focusApp: Writable<App | null>
): void => {
	dashboardStartedEvent.subscribe(async (event) => {
		if (event) {
			const accessibleApps = await fetchRemoteSessionAccessibleAppsXApps();
			const accessibleProjects = await fetchRemoteSessionAccessibleProjectsXProjects();
			const openTabs = await fetchRemoteSessionOpenTabsXTabs();
			const focusApp = accessibleApps.find((app) => app.focus) || null;

			_accessibleApps.set(accessibleApps);
			_accessibleProjects.set(accessibleProjects);
			_openTabs.set(openTabs);
			_focusApp.set(focusApp);
		}
	});
};

const subscribeAppSelectedEvent = (
	_focusApp: Writable<App | null>,
	accessibleApps: Readable<SessionAccessibleAppXApp[]>
): void => {
	appSelectedEvent.subscribe((event) => {
		if (event) {
			const accessibleApps_ = get(accessibleApps);
			const focusApp = accessibleApps_.find((app) => app.id === event?.appId) || null;
			_focusApp.set(focusApp);
		}
	});
};

const subscribeTabSelectedEvent = (
	_focusAppOpenTab: Writable<Tab | null>,
	_focusAppOpenTabs: Writable<SessionOpenTabXTab[]>
): void => {
	tabSelectedEvent.subscribe((event) => {
		if (event) {
			const focusAppOpenTabs_ = get(_focusAppOpenTabs);

			let focusAppOpenTab = null;
			let set = false;

			for (const tab of focusAppOpenTabs_) {
				if (tab.id === event?.tabId) {
					tab.focus = true;
					focusAppOpenTab = tab;
					if (set) break;
					set = true;
				} else if (tab.focus) {
					tab.focus = false;
					if (set) break;
					set = true;
				}
			}

			_focusAppOpenTab.set(focusAppOpenTab);
			_focusAppOpenTabs.set(focusAppOpenTabs_);
		}
	});
};

export {
	subscribeFocusApp,
	subscribeDashboardStartedEvent,
	subscribeAppSelectedEvent,
	subscribeTabSelectedEvent
};
