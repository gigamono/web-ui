import { getEndpoint } from './utils';

const getTabsEndpoint = (id?: string): string => {
	const param = id ? `/=${id}` : '';
	return getEndpoint(`/system/tabs${param}`);
};


export { getTabsEndpoint };
