// Copyright 2022 the Gigamono authors. All rights reserved. Apache 2.0 license.

<script lang="ts">
import type { ContextMenu, ContextMenuColorPickerProps } from '$types/app';
import type { Project } from '$types/model';

	import ContextMenuColorPicker from '$ui/contextMenuColorPicker.svelte';
	import { projectContextMenuOptions } from './projectContextMenuOptions';

	// Props.
	export let project: Project;

	// State.
	let imageUrl = ''; // TODO(appcypher): Implement using project generated from project eventually.

	// Handlers.
	const handleContextMenuClick = (event: PointerEvent) => {
		const menu: ContextMenu<void, ContextMenuColorPickerProps> = {
			position: {
				x: event.clientX,
				y: event.clientY
			},
			contextOptions: projectContextMenuOptions(project),
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

		// emitOpenContextMenuSignal(menu);
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

		.title {project.name}
</template>

<style lang="scss">
	@import '../../../assets/styles/variables.scss';
	@import '../../../assets/styles/styles.scss';

	.project-card {
		width: var(--width-project-card);
		height: var(--height-project-card);
		border-radius: var(--radius-primary);
		border: var(--border-frame);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.4375rem;
		cursor: pointer;

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
			@include ellipsis-text;

			font-size: 0.8rem;
			margin-top: 0.5rem;
			width: 100%;
			font-weight: 400;
		}

		&:hover {
			border: var(--border-frame-2);
			box-shadow: var(--shadow-grey);
		}
	}
</style>
