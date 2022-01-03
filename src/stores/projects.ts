import { writable, derived } from 'svelte/store';
import { getProjectsEndpoint } from '../application/endpoints/projects';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';

type Project = { name: string; space: string };

const _projects: Writable<Project[]> = writable([]);

const projects = derived(_projects, ($val) => $val);

const fetchProjects = async (space?: string): Promise<void> => {
	const response = await fetch(getProjectsEndpoint(space));
	const payload: Payload<Project[]> = await response.json();

	if (payload.data) {
		_projects.set(payload.data);
	}
};

export { projects, fetchProjects };
