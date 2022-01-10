<script lang="ts">
	import BellIcon from '$assets/icons/bell.svg';
	import EverythingIcon from '$assets/icons/everything.svg';
	import AddIcon from '$assets/icons/add.svg';
	import { myProfile } from '$stores/profile';
	import { getProfileStaticEndpoint } from '$application/endpoints/profile';
	import { default as TabComponent } from '$ui/tab.svelte';
	import type { Tab } from '$application/types';
	import { focusAppOpenTabs, focusAppTab, sessionOpenTabs, sessionFocus } from '$stores/session';
	import { launchAppEvent } from '$stores/events';

	// State.
	let avatarUrl: string;
	let tabs: Tab[] = [];
	let focusApp = false;
	let selectedIndex = -1;

	// Subscriptions.
	$: if ($myProfile) {
		avatarUrl = getProfileStaticEndpoint($myProfile.avatarUrl);
	}

	$: if ($launchAppEvent) {
		tabs = $focusAppOpenTabs;
		focusApp = !!$sessionFocus?.app;
		selectedIndex = tabs.findIndex((tab) => tab.id === $focusAppTab?.id);
	}
</script>

<template lang="pug">
	#tab-bar(class="{$$props.class}")
		.tabs-section
			+if("tabs.length > 0")
				button.everything
					.icon(style="--icon-url: url('{EverythingIcon}')")

				.divider

				li.tabs: +each("tabs as tab, index")
					TabComponent.tab("{tab}", selected="{selectedIndex === index}")
					.divider

				.divider

			+if("focusApp")
				button.add-tab
					.icon(style="--icon-url: url('{AddIcon}')")

		.profile-section
			img.notification(src="{BellIcon}", alt="notification icon")

			.profile-avatar
				.halo
				img(src="{avatarUrl}", alt="avatar")
</template>

<style lang="scss">
	@import '../../assets/styles/variables.scss';

	#tab-bar {
		--spacing-padding: 1rem;

		border-top: var(--border-frame);
		border-bottom: var(--border-frame);
		background-color: var(--color-bg-6);
		display: flex;

		> .tabs-section {
			--height-tab-divider: 60%;
			--width-tab-divider: 0.0625rem;
			--tab-gap: 0.5rem;

			margin-left: var(--spacing-padding);
			display: flex;
			align-items: center;
			flex-grow: 1;
			height: 100%;
			gap: var(--tab-gap);

			> button {
				height: var(--size-tab-button);
				width: var(--size-tab-button);
				border-radius: var(--radius-primary);
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;

				> .icon {
					width: 0.625rem;
					height: 0.625rem;
					background-color: var(--color-text-5);
				}

				&:hover {
					background-color: var(--color-bg-4);
				}
			}

			> button.everything > .icon {
				@include icon-mask(var(--icon-url));
			}

			> button.add-tab > .icon {
				@include icon-mask(var(--icon-url));
			}

			.divider {
				height: var(--height-tab-divider);
				width: var(--width-tab-divider);
				background-color: var(--color-bg-4);
			}

			> li.tabs {
				align-items: center;
				display: flex;
				height: 100%;
				gap: var(--tab-gap);

				> .divider:last-of-type {
					display: none;
				}
			}
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
