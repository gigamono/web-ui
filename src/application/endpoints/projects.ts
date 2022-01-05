import { getEndpoint } from './utils';

const getProjectsEndpoint = (space?: string): string => {
	const spaceQuery = space ? `?space=${space}` : '';
	return getEndpoint(`/system/projects${spaceQuery}`);
};

const getSpecificProjectEndpoint = (id: string): string => {
	return getEndpoint(`/system/projects/=${id}`);
};

export { getProjectsEndpoint, getSpecificProjectEndpoint };
