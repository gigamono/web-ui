// Copyright 2022 the Gigamono authors. All rights reserved. GPL-3.0 License.

type Project = {
	id: string;
	name: string;
	spaceId: string;
	color: string;
};

type Tab = {
	id: string;
	name: string;
	appId: string;
	projectId: string;
};

type Space = {
	id: string;
	name: string;
};

type MyProfile = {
	username: string;
	email: string;
	avatarUrl: string;
};

type App = {
	id: string;
	name: string;
	enabled: boolean;
	isSystemApp: boolean;
};

type SessionOpenTab = {
	id: string;
	tabId: string;
	focus: boolean;
	order: number;
};

type SessionAccessibleApp = {
	id: string;
	appId: string;
	focus: boolean;
	order: number;
};

type SessionOpenTabXTab = Tab & {
	accessibleAppId: string;
	focus: boolean;
	order: number;
};

type SessionAccessibleProjectXProject = Project & {
	acccesibleProjectId: string;
	focus: boolean;
	order: number;
};

type SessionAccessibleAppXApp = App & {
	openTabId: string;
	focus: boolean;
	order: number;
};

export type {
	Project,
	Tab,
	Space,
	App,
	MyProfile,
	SessionOpenTab,
	SessionAccessibleApp,
	SessionOpenTabXTab,
	SessionAccessibleAppXApp,
	SessionAccessibleProjectXProject
};
