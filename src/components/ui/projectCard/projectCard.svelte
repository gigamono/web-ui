<script lang="ts">
	import type { ContextMenu } from '$application/types';
	import { setOpenContextMenuEvent } from '$stores/events';
	import ContextMenuColorPicker from '$ui/contextMenuColorPicker.svelte';
	import { contextOptions } from './options';

	// Props.
	export let projectName = '';
	export let imageUrl = '';

	// Handlers.
	const handleContextMenuClick = (event: PointerEvent) => {
		// TODO(appcypher): How to export thisa type information from the component itself.
		type ColorPickerProps = {
			colors: string[];
			selectedIndex: number;
			hasNullColor: boolean;
		};

		const menu: ContextMenu<void, ColorPickerProps> = {
			position: {
				x: event.clientX,
				y: event.clientY
			},
			contextOptions,
			endComponent: {
				component: ContextMenuColorPicker,
				props: {
					colors: [
						'--color-misc-orchid',
						'--color-misc-coral',
						'--color-misc-pink',
						'--color-misc-orange',
						'--color-misc-blue',
						'--color-misc-green',
						'--color-misc-turquoise',
						'--color-misc-yellow',
						'--color-primary'
					],
					selectedIndex: 3, // TODO(appcypher): Get this from the project info in store.
					hasNullColor: true
				}
			}
		};
		setOpenContextMenuEvent(menu);
	};
</script>

<template lang="pug">
	.project-card(on:contextmenu|preventDefault="{handleContextMenuClick}")
		+if("imageUrl")
			img(src="{imageUrl}", alt="the card app")

		+if("!imageUrl")
			.placeholder
				.placeholder-image
				.text No Preview

		.title {projectName}
</template>

<style lang="scss">
	@import '../../../assets/styles/variables.scss';
	@import '../../../assets/styles/styles.scss';

	.project-card {
		--size-card-width: 16rem;
		--size-card-height: 10rem;

		width: var(--size-card-width);
		height: 12rem;
		border-radius: var(--radius-primary);
		border: var(--border-frame);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.4375rem;

		> img {
			width: 100%;
			height: 70%;
		}

		> .placeholder {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80%;
			width: 100%;
			position: relative;

			> .placeholder-image {
				position: absolute;
				top: 0;
				width: 100%;
				height: 100%;
				border-radius: var(--radius-primary);
			}

			> .text {
				font-size: 0.9375rem;
			}
		}

		> .title {
			font-size: 0.8rem;
			margin-top: 0.5rem;
			width: 100%;
			font-weight: 400;
		}

		&:hover {
			cursor: pointer;
			border: var(--border-frame-2);
			box-shadow: var(--shadow-grey);
		}
	}
</style>
