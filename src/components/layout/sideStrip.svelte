<script lang="ts">
	import Brand from '$ui/brand.svelte';
	import ShortcutButton from '$ui/shortcutButton.svelte';
	import { getAppIconEndpoint } from '$application/endpoints/apps';
	import { onDestroy } from 'svelte';
	import { apps } from '$stores/apps';

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
	apps.subscribe(() => {
		if ($apps) {
			for (const app of $apps) {
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

			systemAppShortcuts = systemAppShortcuts;
			userAppShortcuts = userAppShortcuts;
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
