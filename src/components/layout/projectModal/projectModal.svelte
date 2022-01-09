<script lang="ts">
	import ProjectModalCardSection from '$layout/projectModalCardSection.svelte';
	import { projects } from '$stores/projects';
	import { emitCloseProjectModalEvent } from '$stores/events';
	import {
		projectContextMenuOptions,
		projectContextOptionImages
	} from '$ui/projectCard/projectContextMenuOptions';
	import { toggleOptions } from './toggleOptions';
	import SearchIcon from '$assets/icons/search.svg';
	import IconToggle from '$ui/iconToggle.svelte';
	import type { Project } from '$application/types';
import type { Rec } from '@sveltejs/kit/types/helper';

	type SpaceSections = {
		[spaceName: string]: Project[];
	};

	// State.
	let spaceSections: SpaceSections = {};
	let selectedToggleIndex: number = 0;

	const toggleOptionImages = toggleOptions.reduce(
		(acc: string[], { outlineIconUrl, filledIconUrl }) => {
			acc.push(outlineIconUrl);
			acc.push(filledIconUrl);
			return acc;
		},
		[]
	);

	const projectContextMenuOptionImages = Object.entries(projectContextOptionImages).map(
		([_, iconUrl]) => iconUrl
	);

	type Acc = {
		[key: string]: unknown
	}

	// Subscriptions.
	projects.subscribe(($projects) => {
		spaceSections = $projects.reduce((acc: Record<string, Project[]>, val) => {
			if (!acc[val.space]) {
				acc[val.space] = [val];
			} else {
				acc[val.space].push(val);
			}
			return acc;
		}, {});
	});

	// Handlers.
	const handleBackgroundClick = (): void => {
		emitCloseProjectModalEvent({});
	};
</script>

<template lang="pug">
	#project-modal(class="{$$props.class}")
		.background(on:click|self="{handleBackgroundClick}")

		.modal
			.top-bar
				.start
					img(src="{SearchIcon}", alt="search")
					input(type="text", placeholder="Search Project...")
					.divider

				.mid

				.end
					IconToggle(
						toggleOptions="{toggleOptions}",
						selectedIndex="{selectedToggleIndex}"
					)

			li.space-sections: +each("Object.entries(spaceSections) as [spaceName, projects]")
				ProjectModalCardSection(
					spaceName="{spaceName}",
					projects="{projects}"
				)

			button.create-space + Add a space

		//- Preload toggle icon images.
		+each("toggleOptionImages as image")
			link(rel="preload", as="image", href="{image}", crossorigin='anonymous')

		//- Preload context menu images.
		+each("projectContextMenuOptionImages as image")
			link(rel="preload", as="image", href="{image}", crossorigin='anonymous')

</template>

<style lang="scss">
	@import '../../../assets/styles/variables.scss';

	#project-modal {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;

		> .background {
			position: absolute;
			height: 100%;
			width: 100%;
			background-color: var(--color-text-0);
			opacity: 0.2;
			z-index: 0;
			cursor: pointer;
		}

		> .modal {
			--padding-modal: 2.5rem;

			height: 90%;
			width: 80%;
			min-width: 50rem;
			max-width: 100rem;
			background-color: var(--color-bg-8);
			border-radius: var(--radius-primary);
			box-shadow: var(--shadow-grey);
			z-index: 1;
			padding: var(--padding-modal);
			display: flex;
			flex-direction: column;
			gap: 1.5rem;

			> .top-bar {
				display: flex;

				> .start {
					display: flex;
					align-items: center;
					gap: 0.5rem;

					> img {
						height: var(--size-icon);
						width: var(--size-icon);
					}

					> input {
						font-size: 0.75rem;
						width: 10rem;

						&::placeholder {
							color: var(--color-text-8);
						}
					}

					> .divider {
						height: 80%;
						width: 0.0625rem;
						background-color: var(--color-bg-4);
					}
				}

				> .mid {
					flex: 1;
				}
			}

			> li.space-sections {
				display: flex;
				flex-direction: column;
				gap: 2rem;
				overflow-y: scroll;
			}

			> button.create-space {
				width: 100%;
				font-size: 1rem;
				font-weight: 650;
				color: var(--color-text-8);
				cursor: pointer;
				border-radius: var(--radius-primary-2);
				padding: 0.3125rem;

				&:hover {
					background-color: var(--color-bg-6);
					color: var(--color-text-0);
				}
			}
		}
	}
</style>
