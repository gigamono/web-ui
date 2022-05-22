<script lang="ts">
	import ProjectCard from '../ui/projectCard/projectCard.svelte';
	import IconButton from '../ui/iconButton.svelte';
	import CollapseIcon from '$assets/icons/collapse.svg';
	import EllipsisIcon from '$assets/icons/ellipsis.svg';
	import AddIcon from '$assets/icons/add.svg';
	import type { Project } from 'src/types/model';

	// Props.
	export let spaceName: string;
	export let projects: Array<Project | null>;

	// State.
	let isCollapsed = false;
	let collapseIconRotate = 0;

	// Handlers.
	const handleCollapse = () => {
		isCollapsed = !isCollapsed;
		collapseIconRotate = isCollapsed ? -90 : 0;
	};

	// Subscriptions.
	$: {
		projects.push(null);
	}
</script>

<template lang="pug">
	.container
		.space(on:click="{handleCollapse}")
			img.collapse-icon(src="{CollapseIcon}", alt="collapse icon", style="--collapse-icon-transform: rotate({collapseIconRotate}deg)")
			span.name {spaceName}
			IconButton.ellipsis(iconUrl="{EllipsisIcon}", name="context menu")

		+if("!isCollapsed")
			li.cards: +each("projects as project")
				+if("project")
					ProjectCard(project="{project}")

				+if("!project")
					.create-project
						.icon(style="--icon-url: url('{AddIcon}')")

	//- Preload icons.
	link(rel="preload", as="image", href="{EllipsisIcon}", crossorigin='anonymous')
	link(rel="preload", as="image", href="{AddIcon}", crossorigin='anonymous')

</template>

<style lang="scss">
	@import '../../assets/styles/styles.scss';
	@import '../../assets/styles/variables.scss';

	.container {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;

		> .space {
			display: flex;
			align-items: center;
			gap: 0.375rem;
			border-radius: var(--radius-primary-2);
			padding: 0.3125rem;
			cursor: pointer;

			> img.collapse-icon {
				height: 0.5rem;
				width: 0.5rem;
				transform: var(--collapse-icon-transform);
			}

			> span.name {
				@include ellipsis-text;

				font-size: 0.9375rem;
				letter-spacing: 0.125rem;
				font-family: var(--font-title);
				text-transform: uppercase;
				font-weight: 560;
				font-variation-settings: 'wght' 560;
			}

			> :global(.ellipsis) {
				visibility: hidden;
			}

			&:hover {
				background-color: var(--color-bg-7);

				> :global(.ellipsis) {
					visibility: visible;
				}
			}
		}

		> .cards {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;

			> .create-project {
				width: var(--width-project-card);
				height: var(--height-project-card);
				background-color: var(--color-bg-7);
				border-radius: var(--radius-primary);
				border: var(--border-frame);
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0.4375rem;
				cursor: pointer;

				.icon {
					@include icon-mask(var(--icon-url));

					width: 1rem;
					height: 1rem;
					background-color: var(--color-text-5);
				}

				&:hover {
					background-color: var(--color-bg-5);

					> .icon {
						background-color: var(--color-text-0);
					}
				}
			}
		}
	}
</style>
