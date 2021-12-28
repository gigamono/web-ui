import { writable, derived } from 'svelte/store';
import { getProjectsEndpoint } from '../application/endpoints/projects';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';

type Project = { name: string; space: string };

const projects: Writable<Project[]> = writable([]);

const getProjects = derived(projects, ($projects) => $projects);

const fetchProjects = async (space: string): Promise<void> => {
	// Fetch content from endpoint.
	const response = await fetch(getProjectsEndpoint(space));
	const payload: Payload<Project[]> = await response.json();

	// Set value to payload data if it exists.
	if (payload.data) {
		projects.set(payload.data);
	}
};

export { getProjects, fetchProjects };
