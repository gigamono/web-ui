import { writable, derived } from 'svelte/store';
import { getProjectsEndpoint, getSpecificProjectEndpoint } from '../application/endpoints/projects';
import type { Writable } from 'svelte/store';
import type { Payload } from './types';
import type { Project } from '$application/types';

const _projects: Writable<Project[]> = writable([]);

const projects = derived(_projects, ($val) => $val);

const fetchProjects = async (space?: string): Promise<void> => {
	const response = await fetch(getProjectsEndpoint(space));
	const payload: Payload<Project[]> = await response.json();

	if (payload.data) {
		_projects.set(payload.data);
	}
};

const deleteProject = async (id: string): Promise<void> => {
	const response = await fetch(getSpecificProjectEndpoint(id), {
		method: 'DELETE'
	});

	if (response.ok) {
		_projects.update((projects) => projects.filter((project) => project.id !== id));
	}
};

const createProject = async (name: string, space: string, color: string | null): Promise<void> => {
	const response = await fetch(getProjectsEndpoint(), {
		method: 'POST',
		body: JSON.stringify({ name, space, color })
	});

	if (response.ok) {
		fetchProjects();
	}
};

export { projects, fetchProjects, createProject, deleteProject };
