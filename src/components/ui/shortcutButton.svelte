<script lang="ts">
	import { onDestroy } from 'svelte';
	import { setOpenAppEvent } from '$stores/events';
	import { closeProjectModalEvent } from '$stores/events';

	// Props.
	export let filledIconUrl = '';
	export let outlineIconUrl = '';
	export let name = '';

	// State.
	let active = false;

	// Handlers.
	const handleClick = (event: Event) => {
		setOpenAppEvent(event, name);
		active = true;
	};

	// Subscriptions.
	const unsubCloseProjectModalEvent = closeProjectModalEvent.subscribe(() => {
		active = false;
	});

	// Cleanup
	onDestroy(unsubCloseProjectModalEvent);
</script>

<template lang="pug">
	button.shortcut(
		class:active="{active}",
		on:click|preventDefault="{handleClick}"
	)
		div.icon(style=`
			--icon-outline-url: url("{outlineIconUrl}");
			--icon-filled-url: url("{filledIconUrl}");
			`
		)
</template>

<style lang="scss">
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

		> .icon {
			@include icon-mask(var(--icon-outline-url));

			width: var(--size-shortcut-icon);
			height: var(--size-shortcut-icon);
			background-color: var(--color-text-5);
		}

		&:hover,
		&.active {
			cursor: pointer;
			background-color: var(--color-primary-3);

			> .icon {
				@include icon-mask-hover(var(--icon-filled-url));

				background-color: var(--color-bg-8);
			}
		}
	}
</style>
