import { getEndpoint } from './utils';

const getProfileAvatarEndpoint = (path: string): string =>
	getEndpoint(`/system/session/static?path=${path}`);

export { getProfileAvatarEndpoint };
