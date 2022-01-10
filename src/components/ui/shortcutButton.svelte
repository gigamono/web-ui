<script lang="ts">
	import { onDestroy } from 'svelte';
	import { emitLaunchAppEvent } from '$stores/events';
	import { closeProjectModalEvent } from '$stores/events';

	// Props.
	export let filledIconUrl: string;
	export let outlineIconUrl: string;
	export let name: string;
	export let selected: boolean;

	// Handlers.
	const handleClick = () => {
		emitLaunchAppEvent({ name });
	};

	$: {
		console.log("App selected: ", name);
	}
</script>

<template lang="pug">
	button.shortcut(
		class:selected,
		on:click="{handleClick}"
	)
		.icon_filled(style="--icon-filled-url: url('{filledIconUrl}');")
		.icon_outline(style="--icon-outline-url: url('{outlineIconUrl}');")
</template>

<style lang="scss">
	@import '../../assets/styles/styles.scss';
	@import '../../assets/styles/variables.scss';

	button.shortcut {
		--size-shortcut: 2rem;
		--size-shortcut-icon: 1rem;

		width: var(--size-shortcut);
		height: var(--size-shortcut);
		border-radius: var(--radius-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;

		> .icon_filled {
			@include icon-mask(var(--icon-filled-url));
			@include hide;

			width: var(--size-shortcut-icon);
			height: var(--size-shortcut-icon);
			background-color: var(--color-bg-8);
		}

		> .icon_outline {
			@include icon-mask(var(--icon-outline-url));

			width: var(--size-shortcut-icon);
			height: var(--size-shortcut-icon);
			background-color: var(--color-text-5);
		}

		&:hover,
		&.selected {
			cursor: pointer;
			background-color: var(--color-primary-3);

			> .icon_outline {
				@include hide;
			}

			> .icon_filled {
				@include show;
			}
		}
	}
</style>
