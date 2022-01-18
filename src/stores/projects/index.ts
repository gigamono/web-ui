// Copyright 2022 the Gigamono authors. All rights reserved. Apache 2.0 license.

import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Project } from '$types/model';

// Private
const _projects: Writable<Project[]> = writable([]);

// Public.
const projects = derived(_projects, ($val) => $val);

export { projects };
