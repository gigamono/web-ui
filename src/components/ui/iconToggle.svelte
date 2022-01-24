// Copyright 2022 the Gigamono authors. All rights reserved. GPL-3.0 License.

<script lang="ts">
	import type { ToggleOption } from '$types/app';

	// Props.
	export let toggleOptions: ToggleOption[];
	export let selectedIndex: number;
</script>

<template lang="pug">
	li.icons: +each("toggleOptions as option, index")
		button(class:selected="{selectedIndex === index}")
			.icon_filled(style="--icon-filled-url: url('{option.filledIconUrl}');")
			.icon_outline(style="--icon-outline-url: url('{option.outlineIconUrl}');")
</template>

<style lang="scss">
	@import '../../assets/styles/styles.scss';
	@import '../../assets/styles/variables.scss';

	li.icons {
		display: flex;
		background-color: var(--color-bg-6);
		border-radius: var(--radius-primary);
		padding: var(--padding-toggle);

		> button {
			padding: var(--padding-toggle-option);
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: var(--radius-primary-2);
			cursor: pointer;

			> .icon_filled {
				@include icon-mask(var(--icon-filled-url));
				@include hide;

				width: var(--size-toggle-icon);
				height: var(--size-toggle-icon);
				background-color: var(--color-text-0);
			}

			> .icon_outline {
				@include icon-mask(var(--icon-outline-url));

				width: var(--size-toggle-icon);
				height: var(--size-toggle-icon);
				background-color: var(--color-text-5);
			}

			&.selected {
				background-color: var(--color-bg-8);
				box-shadow: var(--shadow-grey);

				> .icon_outline {
					@include hide;
				}

				> .icon_filled {
					@include show;
				}
			}

			&:not(.selected):hover {
				background-color: var(--color-bg-4);
			}
		}
	}
</style>
