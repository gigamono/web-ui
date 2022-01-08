import { getEndpoint } from './utils';

const getProjectsEndpoint = (space = ''): string => {
	return getEndpoint(`/system/projects?space=${space}`);
};

const getSpecificProjectEndpoint = (id: string): string => {
	return getEndpoint(`/system/projects/=${id}`);
};

export { getProjectsEndpoint, getSpecificProjectEndpoint };
