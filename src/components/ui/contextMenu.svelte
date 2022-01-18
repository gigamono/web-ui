// Copyright 2022 the Gigamono authors. All rights reserved. Apache 2.0 license.

<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { ContextMenu } from 'src/types/model';
	import Brand from './brand.svelte';

	// Props.
	export let menu: ContextMenu<unknown, unknown>;

	// State.
	$: positionX = menu.position.x;
	$: positionY = menu.position.y;
	$: startComponent = menu.startComponent;
	$: endComponent = menu.endComponent;
	$: contextOptions = menu.contextOptions;

	// Handlers.
	const handleMouseDown = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
	};
</script>

<template lang="pug">
		.context-menu(
			class="{$$props.class}",
			style=`
				--position-x: {positionX}px;
				--position-y: {positionY}px;`,
		)
			+if("startComponent")
				svelte:component(this="{startComponent.component}", props="{startComponent.props}")
				.divider

			li.options: +each("contextOptions as option")
				.option(on:click="{option.handler}", on:mousedown="{handleMouseDown}")
					.icon(
						style=`
						--icon-url: url('{option.iconUrl}');
						--color: {option.color};`
					)
					.name(style="--color: {option.color}") {option.name}

			+if("endComponent")
				.divider
				svelte:component(this="{endComponent.component}", props="{endComponent.props}")
</template>

<style lang="scss">
	@import '../../assets/styles/variables.scss';

	.divider {
		height: 0.0625rem;
		margin: 0.25rem 0;
		background-color: var(--color-bg-4);
	}

	.context-menu {
		position: absolute;
		left: var(--position-x);
		top: var(--position-y);
		background-color: var(--color-bg-8);
		border-radius: var(--radius-primary);
		border: var(--border-frame-2);
		box-shadow: var(--shadow-grey);
		width: 10.875rem;
		display: flex;
		flex-direction: column;
		padding: var(--padding-context-menu-tb) 0;

		li.options {
			display: flex;
			flex-direction: column;

			> .option {
				display: flex;
				align-items: center;
				height: var(--height-context-option);
				padding: 0 var(--padding-context-option-lr);
				cursor: pointer;

				> .icon {
					@include icon-mask(var(--icon-url));

					height: var(--size-context-option-icon);
					width: var(--size-context-option-icon);
					margin-right: var(--margin-context-option-icon-lr);
					background-color: var(--color);
				}

				> .name {
					font-size: 0.75rem;
					color: var(--color);
				}

				&:hover {
					background-color: var(--color-bg-6);
				}
			}
		}
	}
</style>
