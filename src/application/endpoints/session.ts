import { getEndpoint } from './utils';

const getProfileAvatarEndpoint = (): string =>
	getEndpoint(`/static?path=system/session/data/avatar.png`);

export { getProfileAvatarEndpoint };
