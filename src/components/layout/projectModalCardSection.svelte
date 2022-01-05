<script lang="ts">
	import ProjectCard from '../ui/projectCard/projectCard.svelte';
	import IconButton from '../ui/iconButton.svelte';
	import CollapseIcon from '$assets/icons/collapse.svg';
	import type { ProjectModalCard } from '$application/types';

	// Props.
	export let spaceName = '';
	export let projects: ProjectModalCard[] = [];
</script>

<template lang="pug">
	div
		.space
			img.collapse-icon(src="{CollapseIcon}", alt="collapse icon")
			span.name {spaceName}
			IconButton

		li.cards: +each("projects as project")
			ProjectCard(
				projectName="{project.projectName}",
				imageUrl="{project.imageUrl}"
			)
</template>

<style lang="scss">
	@import '../../assets/styles/variables.scss';

	.space {
		display: flex;

		> span.name {
			font-size: 0.9375rem;
			letter-spacing: 0.125rem;
			font-family: var(--font-title);
			text-transform: uppercase;
			font-weight: 560;
			font-variation-settings: 'wght' 560;
		}

		&:hover {
			cursor: pointer;
		}
	}

	.cards {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
