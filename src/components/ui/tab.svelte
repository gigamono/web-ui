<script lang="ts">
import { emitTabSelectedEvent } from '$stores/events/events';

	import type { Tab } from 'src/types/model';

	// Props.
	export let tab: Tab;
	export let selected: boolean;

	// Handlers.
	const handleClick = (): void => {
		emitTabSelectedEvent({ tabId: tab.id });
	};
</script>

<template lang="pug">
	.tab(
		class="{$$props.class}",
		class:selected,
		on:click="{handleClick}"
	)
		button
			.icon
			.name {tab.name}
</template>

<style lang="scss">
	@import '../../assets/styles/styles.scss';
	@import '../../assets/styles/variables.scss';

	.tab {
		--min-width-tab: 10rem;
		--max-width-tab: 20rem;

		min-width: var(--min-width-tab);
		max-width: var(--max-width-tab);
		height: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		> button {
			width: 100%;
			height: var(--size-tab-button);
			border-radius: var(--radius-primary-2);
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0.5rem;
			gap: 0.5rem;
			box-sizing: border-box;
			cursor: pointer;

			> .icon {
				width: 1rem;
				height: 1rem;
				border-radius: var(--radius-primary-2);
				background-color: var(--color-bg-3);
			}

			> .name {
				@include ellipsis-text;
				font-size: 0.75rem;
				flex-grow: 1;
			}

			&:hover {
				background-color: var(--color-bg-3);

				> .icon {
					background-color: var(--color-bg-2);
				}
			}
		}

		&.selected {
			&::after {
				position: absolute;
				height: calc(var(--padding-tab) - 0.25rem);
				width: 100%;
				border-radius: var(--radius-primary);
				background-color: var(--color-primary-3);
				bottom: 0;
				content: '';
			}

			> button {
				font-weight: 600;
				color: var(--color-primary-2);
			}
		}
	}
</style>
