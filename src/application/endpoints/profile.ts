import { getEndpoint } from './utils';

const getProfileStaticEndpoint = (path: string): string =>
	getEndpoint(`/system/profile/static?path=${path}`);

export { getProfileStaticEndpoint };
