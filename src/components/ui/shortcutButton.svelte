<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { SessionAccessibleAppXApp } from '$types/model';
	import { emitAppSelectedEvent } from '$stores/events/events';

	// Props.
	export let filledIconUrl: string;
	export let outlineIconUrl: string;
	export let id: string;
	export let selected: boolean;

	// Handlers.
	const handleClick = () => {
		emitAppSelectedEvent({ appId: id });
	};
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
		--height-shortcut: 2.1rem;
		--width-shortcut: 2rem;
		--size-shortcut-icon: 1rem;

		width: var(--width-shortcut);
		height: var(--height-shortcut);
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

			> .icon_outline {
				@include hide;
			}

			> .icon_filled {
				@include show;
			}
		}

		&:hover {
			background-color: var(--color-primary);
		}

		&.selected {
			background-color: var(--color-primary-3);
		}
	}
</style>
