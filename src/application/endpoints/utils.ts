// Copyright 2022 the Gigamono authors. All rights reserved. GPL-3.0 License.

const getEndpoint = (path: string): string => 'http://127.0.0.1:5050/api/v1' + path;

const getAppIconEndpoint = (name: string, is_outline = true): string => {
	return getEndpoint(
		`/system/apps/=${name}/static?path=assets/icons/app_${is_outline ? 'outline' : 'filled'}.svg`
	);
};

const getProfileStaticEndpoint = (path: string): string => {
	return getEndpoint(`/system/profile/static?path=${path}`);
};

export { getEndpoint, getAppIconEndpoint, getProfileStaticEndpoint };
