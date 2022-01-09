<script lang="ts">
	import BellIcon from '$assets/icons/bell.svg';
	import { myProfile } from '$stores/profile';
	import { getProfileStaticEndpoint } from '$application/endpoints/profile';
	import { default as TabComponent } from '$ui/tab.svelte';
	import type { Tab } from '$application/types';

	// State.
	let avatarUrl: string;
	// TODO(appcypher): Get data from store instead.
	let tabs: Tab[] = [
		{
			id: 'cb1311b8-5644-4a14-99f4-a95cf7d8c1b2',
			name: 'The First Tab',
			app: 'frontend@v0.1',
			projectId: 'dfb8ec34-928d-42e4-87aa-d50e055cf09b',
			order: 0
		},
		{
			id: 'cb1311b8-5644-4a14-99f4-a95cf7d8c1b2',
			name: 'The Second Tab',
			app: 'frontend@v0.1',
			projectId: 'dfb8ec34-928d-42e4-87aa-d50e055cf09b',
			order: 1
		}
	];

	// Subscriptions.
	$: {
		if ($myProfile) {
			avatarUrl = getProfileStaticEndpoint($myProfile.avatarUrl);
		}
	}
</script>

<template lang="pug">
	#tab-bar(class="{$$props.class}")
		li.tabs-section: +each("tabs as tab")
			TabComponent.tab("{tab}")

		.profile-section
			img.notification(src="{BellIcon}", alt="notification icon")

			.profile-avatar
				.halo
				img(src="{avatarUrl}", alt="avatar")
</template>

<style lang="scss">
	#tab-bar {
		--spacing-padding: 1rem;

		border-top: var(--border-frame);
		border-bottom: var(--border-frame);
		background-color: var(--color-bg-6);
		display: flex;

		> li.tabs-section {
			height: 100%;
			flex-grow: 1;
			margin-left: var(--spacing-padding);
			align-items: center;
			display: flex;
		}

		> .profile-section {
			height: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin-right: var(--spacing-padding);

			> img.notification {
				--size-notification: 1.3125rem;

				width: var(--size-notification);
				height: var(--size-notification);
				margin-right: 0.75rem;
			}

			> .profile-avatar {
				--size-avatar: 1.8rem;

				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;

				> .halo {
					height: calc(var(--size-avatar) * 1.1);
					width: calc(var(--size-avatar) * 1.1);
					border: 0.075rem solid var(--color-primary);
					border-radius: 50%;
				}

				> img {
					height: var(--size-avatar);
					width: var(--size-avatar);
					border-radius: 50%;
					position: absolute;
				}
			}
		}
	}
</style>
