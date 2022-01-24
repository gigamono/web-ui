// Copyright 2022 the Gigamono authors. All rights reserved. GPL-3.0 License.

import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type {
	App,
	Project,
	SessionAccessibleAppXApp,
	SessionAccessibleProjectXProject,
	SessionOpenTabXTab,
	Tab
} from '$types/model';
import {
	subscribeAppSelectedEvent,
	subscribeDashboardStartedEvent,
	subscribeFocusApp,
	subscribeTabSelectedEvent
} from './subscriptions';

// Private.
const _accessibleApps: Writable<SessionAccessibleAppXApp[]> = writable([]);
const _accessibleProjects: Writable<SessionAccessibleProjectXProject[]> = writable([]);
const _openTabs: Writable<SessionOpenTabXTab[]> = writable([]);
const _focusApp: Writable<App | null> = writable(null);
const _focusProject: Writable<Project | null> = writable(null);
const _focusAppOpenTabs: Writable<SessionOpenTabXTab[]> = writable([]);
const _focusAppOpenTab: Writable<Tab | null> = writable(null);

// Public.
const accessibleApps = derived(_accessibleApps, ($val) => $val);
const accessibleProjects = derived(_accessibleProjects, ($val) => $val);
const openTabs = derived(_openTabs, ($val) => $val);
const focusApp = derived(_focusApp, ($val) => $val);
const focusProject = derived(_focusProject, ($val) => $val);
const focusAppOpenTabs = derived(_focusAppOpenTabs, ($val) => $val);
const focusAppOpenTab = derived(_focusAppOpenTab, ($val) => $val);

// Subscriptions.
const setupSessionSubscriptions = (): void => {
	subscribeFocusApp(
		_focusProject,
		_focusAppOpenTabs,
		_focusAppOpenTab,
		focusApp,
		accessibleProjects,
		openTabs
	);
	subscribeDashboardStartedEvent(_accessibleApps, _accessibleProjects, _openTabs, _focusApp);
	subscribeAppSelectedEvent(_focusApp, accessibleApps);
	subscribeTabSelectedEvent(_focusAppOpenTab, _focusAppOpenTabs);
};

export {
	accessibleApps,
	accessibleProjects,
	openTabs,
	focusApp,
	focusProject,
	focusAppOpenTabs,
	focusAppOpenTab,
	setupSessionSubscriptions
};
