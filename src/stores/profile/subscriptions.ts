import { dashboardStartedEvent } from '$stores/events/events';
import type { MyProfile } from '$types/model';
import type { Writable } from 'svelte/store';
import { fetchRemoteMyProfile } from './requests';

const subscribeDashboardStartedEvent = (_myProfile: Writable<MyProfile | null>): void => {
	dashboardStartedEvent.subscribe(async (event) => {
		if (event) {
			const myProfile = await fetchRemoteMyProfile();
			_myProfile.set(myProfile);
		}
	});
};

export { subscribeDashboardStartedEvent };
