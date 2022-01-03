import { getEndpoint } from './utils';

const getProjectsEndpoint = (space?: string): string => {
	const spaceQuery = space ? `?space=${space}` : '';
	return getEndpoint(`/system/projects${spaceQuery}`);
};

export { getProjectsEndpoint };
