// Copyright 2022 the Gigamono authors. All rights reserved. Apache 2.0 license.

import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { MyProfile } from '$types/model';
import { subscribeDashboardStartedEvent } from './subscriptions';

// Private.
const _myProfile: Writable<MyProfile | null> = writable(null);

// Public.
const myProfile = derived(_myProfile, ($val) => $val);

// Subscriptions.
const setupProfileSubscriptions = (): void => {
	subscribeDashboardStartedEvent(_myProfile);
};

export { myProfile, setupProfileSubscriptions };
