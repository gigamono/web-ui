import { getEndpoint } from './utils';

const getProjectsEndpoint = (space: string): string => {
	return getEndpoint(`/system/projects?space=${space}`);
};

export { getProjectsEndpoint };
