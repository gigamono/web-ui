<script lang="ts">
	import { getAppIconEndpoint } from '$application/endpoints/utils';
	import { accessibleApps, focusApp } from '$stores/session';
	import Brand from '$ui/brand.svelte';
	import ShortcutButton from '$ui/shortcutButton.svelte';
	import { onDestroy } from 'svelte';
	import type { Shortcut } from '$types/app';

	// State.
	let userAppShortcuts: Shortcut[] = [];
	let customShortcuts: Shortcut[] = [];
	let systemAppShortcuts: Shortcut[] = [];
	let selectedIndex = -1;
	let selectedSection: string = '';

	// Subscriptions.
	$: if ($accessibleApps) {
		for (const app of $accessibleApps) {
			const shortcut = {
				filledIconUrl: getAppIconEndpoint(app.name, false),
				outlineIconUrl: getAppIconEndpoint(app.name),
				id: app.id
			};

			if (app.isSystemApp) {
				systemAppShortcuts.push(shortcut);
			} else {
				userAppShortcuts.push(shortcut);
			}
		}

		// Force update.
		systemAppShortcuts = systemAppShortcuts;
		userAppShortcuts = userAppShortcuts;
	}

	$: if ($focusApp) {
		const app = $accessibleApps.find((app) => app.id === $focusApp?.id);
		if (app?.isSystemApp) {
			selectedSection = 'system';
			selectedIndex = systemAppShortcuts.findIndex((shortcut) => shortcut.id === app?.id);
		} else {
			selectedSection = 'user';
			selectedIndex = userAppShortcuts.findIndex((shortcut) => shortcut.id === app?.id);
		}
	}
</script>

<template lang="pug">
  #side-strip(class="{$$props.class}")
    .brand-section
      Brand.brand

    li.container: +each("userAppShortcuts as el, index (el.id)")
      ShortcutButton(
        outlineIconUrl="{el.outlineIconUrl}"
        filledIconUrl="{el.filledIconUrl}"
				selected!="{selectedSection === 'user' && selectedIndex === index}"
        id="{el.id}"
      )

    li.container.mid: +each("customShortcuts as el (el.id)")
      ShortcutButton(
        outlineIconUrl="{el.outlineIconUrl}"
        filledIconUrl="{el.filledIconUrl}"
        id="{el.id}"
      )

    li.container: +each("systemAppShortcuts as el, index (el.id)")
      ShortcutButton(
        outlineIconUrl="{el.outlineIconUrl}"
        filledIconUrl="{el.filledIconUrl}"
				selected!="{selectedSection === 'system' && selectedIndex === index}"
        id="{el.id}"
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
