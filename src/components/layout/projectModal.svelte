<script lang="ts">
	import ProjectModalCardSection from '$layout/projectModalCardSection.svelte';
	import type { ProjectModalCard } from '$application/types';
	import { fetchProjects, projects } from '$stores/projects';
	import { setCloseProjectModalEvent } from '$stores/events';

	type SpaceSections = {
		[spaceName: string]: ProjectModalCard[];
	};

	// Init.
	(async () => {
		// Fetch the projects.
		await fetchProjects();

		// Group the projects by space.
		for (const project of $projects) {
			if (!spaceSections[project.space]) {
				spaceSections[project.space] = [
					{
						projectName: project.name,
						imageUrl: ''
					}
				];
			} else {
				spaceSections[project.space].push({
					projectName: project.name,
					imageUrl: ''
				});

				spaceSections = spaceSections;
			}
		}
	})();

	// State.
	let spaceSections: SpaceSections = {};

	// Handlers.
	const handleBackgroundClick = (): void => {
		setCloseProjectModalEvent();
	};
</script>

<template lang="pug">
  #project-modal(class="{$$props.class}")
    .background(on:click|self="{handleBackgroundClick}")

    .modal
      .top-bar

      li.space-sections: +each("Object.entries(spaceSections) as [spaceName, projects]")
        ProjectModalCardSection(
					spaceName="{spaceName}",
					projects="{projects}"
				)

      .add-space

</template>

<style lang="scss">
	@import '../../assets/styles/variables.scss';

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

			// > .top-bar {
			// }

			> li.space-sections {
				display: flex;
				flex-direction: column;
				gap: 2rem;
			}

			// > .add-space {
			// }
		}
	}
</style>
