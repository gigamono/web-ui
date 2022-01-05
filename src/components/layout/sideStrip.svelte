<script lang="ts">
	import Brand from '$ui/brand.svelte';
	import ShortcutButton from '$ui/shortcutButton.svelte';
	import { sessionState } from '$stores/session';
	import { getAppIconEndpoint } from '$application/endpoints/apps';
	import { onDestroy } from 'svelte';
	import { session } from '$app/stores';

	type Shortcut = {
		filledIconUrl: string;
		outlineIconUrl: string;
		name: string;
	};

	// State.
	let userAppShortcuts: Shortcut[] = [];
	let customShortcuts: Shortcut[] = [];
	let systemAppShortcuts: Shortcut[] = [];

	// Subscriptions.
	sessionState.subscribe(() => {
		if ($sessionState) {
			userAppShortcuts = $sessionState.activeUserApps.map((app) => ({
				name: app.name,
				filledIconUrl: getAppIconEndpoint(app.name, false),
				outlineIconUrl: getAppIconEndpoint(app.name)
			}));

			systemAppShortcuts = $sessionState.activeSystemApps.map((app) => ({
				name: app.name,
				filledIconUrl: getAppIconEndpoint(app.name, false),
				outlineIconUrl: getAppIconEndpoint(app.name)
			}));
		}
	});
</script>

<template lang="pug">
  #side-strip(class="{$$props.class}")
    .brand-section
      Brand.brand

    li.container: +each("userAppShortcuts as el (el.name)")
      ShortcutButton(
        outlineIconUrl="{el.outlineIconUrl}"
        filledIconUrl="{el.filledIconUrl}"
        name="{el.name}"
      )

    li.container.mid: +each("customShortcuts as el (el.name)")
      ShortcutButton(
        outlineIconUrl="{el.outlineIconUrl}"
        filledIconUrl="{el.filledIconUrl}"
        name="{el.name}"
      )

    li.container: +each("systemAppShortcuts as el (el.name)")
      ShortcutButton(
        outlineIconUrl="{el.outlineIconUrl}"
        filledIconUrl="{el.filledIconUrl}"
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
