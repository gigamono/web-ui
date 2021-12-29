<script lang="ts">
	import Brand from '$ui/brand.svelte';
	import Shortcut from '$ui/shortcut.svelte';
	import { getSessionState } from '$stores/session';
	import { getAppIconEndpoint } from '$application/endpoints/apps';
	import { onDestroy } from 'svelte';

	type Shortcut = {
		filledIconUrl: string;
		outlineIconUrl: string;
		name: string;
	};

	let appShortcuts: Shortcut[] = [];
	let customShortcuts: Shortcut[] = [];
	let systemShortcuts: Shortcut[] = [];

	$: {
		if ($getSessionState != null) {
			appShortcuts = $getSessionState.activeApps.map((app) => ({
				name: app.name,
				filledIconUrl: getAppIconEndpoint(app.name, false),
				outlineIconUrl: getAppIconEndpoint(app.name)
			}));
		}
	}
</script>

<template lang="pug">
  #side-strip(class="{$$props.class}")
    .brand-section
      Brand.brand

    li.container: +each("appShortcuts as el (el.name)")
      Shortcut.shortcut(
        outlineIconUrl="{el.outlineIconUrl}"
        filledIconUrl="{el.filledIconUrl}"
        name="{el.name}"
      )

    li.container.mid: +each("customShortcuts as el (el.name)")
      Shortcut.shortcut(
        outlineIconUrl="{el.outlineIconUrl}"
        filledIconUrl="{el.filledIconUrl}"
        name="{el.name}"
      )

    li.container: +each("systemShortcuts as el (el.name)")
      Shortcut.shortcut(
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
			height: var(--size-frame-main);
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

			> :global(:not(:first-child)) {
				margin-top: var(--spacing-shortcut);
			}

			&.mid {
				flex-grow: 1;
			}
		}
	}
</style>
