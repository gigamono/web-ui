<script lang="ts">
	import { setOpenContextMenuEvent } from '$stores/events';
	import type { ContextMenu } from '$application/types';

	// Props.
	export let projectName = '';
	export let imageUrl = '';

	// Handlers.
	const handleContextMenuClick = (event: PointerEvent) => {
		const menu: ContextMenu = {
			position: {
				x: event.clientX,
				y: event.clientY
			},
			contextOptions: []
		};
		console.log('Context menu clicked.', menu);
		setOpenContextMenuEvent(menu);
	};
</script>

<template lang="pug">
  .project-card(on:contextmenu|preventDefault="{handleContextMenuClick}")
    +if("imageUrl")
      img(src="{imageUrl}", alt="the card app")

    +if("!imageUrl")
      .placeholder-image

    .title {projectName}
</template>

<style lang="scss">
	@import '../../assets/styles/variables.scss';
	@import '../../assets/styles/styles.scss';

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

		> .placeholder-image {
			width: 100%;
			height: 80%;
			border-radius: var(--radius-primary);
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
