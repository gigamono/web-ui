<script lang="ts">
	import Brand from '$ui/brand.svelte';
	import ShortcutButton from '$ui/shortcutButton.svelte';
	import { getAppIconEndpoint } from '$application/endpoints/apps';
	import { onDestroy } from 'svelte';
	import { enabledApps } from '$stores/apps';
	import { launchAppEvent } from '$stores/events';

	type Shortcut = {
		filledIconUrl: string;
		outlineIconUrl: string;
		name: string;
	};

	// State.
	let userAppShortcuts: Shortcut[] = [];
	let customShortcuts: Shortcut[] = [];
	let systemAppShortcuts: Shortcut[] = [];
	let selectedIndex = -1;
	let selectedSection: string = '';

	// Subscriptions.
	$: if ($enabledApps) {
		for (const app of $enabledApps) {
			if (app.isSystemApp) {
				systemAppShortcuts.push({
					filledIconUrl: getAppIconEndpoint(app.name, false),
					outlineIconUrl: getAppIconEndpoint(app.name),
					name: app.name
				});
			} else {
				userAppShortcuts.push({
					filledIconUrl: getAppIconEndpoint(app.name, false),
					outlineIconUrl: getAppIconEndpoint(app.name),
					name: app.name
				});
			}
		}

		// Force update.
		systemAppShortcuts = systemAppShortcuts;
		userAppShortcuts = userAppShortcuts;
	}

	$: if ($launchAppEvent) {
		const appName = $launchAppEvent.name;

		// Find the app in enabledApps.
		const app = $enabledApps.find((app) => app.name === appName) || null;

		if (app) {
			if (app.isSystemApp) {
				selectedIndex = systemAppShortcuts.findIndex((shortcut) => shortcut.name === appName);
				selectedSection = 'systemAppShortcuts';
			} else {
				selectedIndex = userAppShortcuts.findIndex((shortcut) => shortcut.name === appName);
				selectedSection = 'userAppShortcuts';
			}
		}
	}
</script>

<template lang="pug">
  #side-strip(class="{$$props.class}")
    .brand-section
      Brand.brand

    li.container: +each("userAppShortcuts as el, index (el.name)")
      ShortcutButton(
        outlineIconUrl="{el.outlineIconUrl}"
        filledIconUrl="{el.filledIconUrl}"
				selected!="{selectedSection === 'userAppShortcuts' && selectedIndex === index}"
        name="{el.name}"
      )

    li.container.mid: +each("customShortcuts as el (el.name)")
      ShortcutButton(
        outlineIconUrl="{el.outlineIconUrl}"
        filledIconUrl="{el.filledIconUrl}"
        name="{el.name}"
      )

    li.container: +each("systemAppShortcuts as el, index (el.name)")
      ShortcutButton(
        outlineIconUrl="{el.outlineIconUrl}"
        filledIconUrl="{el.filledIconUrl}"
				selected!="{selectedSection === 'systemAppShortcuts' && selectedIndex === index}"
        name="{el.name}"
      )
</template>

<style lang="scss">
	#side-strip {
		display: flex;
		flex-direction: column;
		border: var(--border-frame);
		height: 100%;

		> .brand-section {
			display: flex;
			width: 100%;
			height: calc(var(--size-frame) - 0.0625rem);
			justify-content: center;
			border-bottom: var(--border-frame);
			align-items: center;
			background-color: var(--color-bg-6);

			> :global(.brand) {
				--size-brand: 1.813rem;

				height: var(--size-brand);
				width: var(--size-brand);
			}
		}

		> .container {
			--spacing-shortcut: 1.25rem;

			display: flex;
			flex-direction: column;
			border-bottom: var(--border-frame);
			align-items: center;
			padding: var(--spacing-shortcut) 0;
			gap: var(--spacing-shortcut);

			&.mid {
				flex-grow: 1;
			}
		}
	}
</style>
