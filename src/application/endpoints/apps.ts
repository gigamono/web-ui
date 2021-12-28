import { getEndpoint } from './utils';

const getAppsEndpoint = (is_installed = true): string => {
	return getEndpoint(`/system/apps?installed=${is_installed}`);
};

const getAppIconEndpoint = (name: string, is_outline = true): string => {
	return getEndpoint(
		`/system/apps/=${name}/static?path=assets/icons/app_${is_outline ? 'outline' : 'filled'}.svg`
	);
};

export { getAppIconEndpoint, getAppsEndpoint };
