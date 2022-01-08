import { getEndpoint } from './utils';

const getAppsEndpoint = (enabled = true): string => {
	return getEndpoint(`/system/apps?enabled=${enabled}`);
};

const getAppIconEndpoint = (name: string, is_outline = true): string => {
	return getEndpoint(
		`/system/apps/=${name}/static?path=assets/icons/app_${is_outline ? 'outline' : 'filled'}.svg`
	);
};

export { getAppIconEndpoint, getAppsEndpoint };
