<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { ContextMenu } from '$application/types';

	// Props.
	export let menu: ContextMenu = null;

	// State.
	let positionX = menu.position.x;
	let positionY = menu.position.y;
	let startComponent = menu.startComponent;
	let endComponent = menu.endComponent;
</script>

<template lang="pug">
    .context-menu(
      class="{$$props.class}",
      style=`
        --position-x: {positionX}px;
        --position-y: {positionY}px;`,
    )
      +if("menu.startComponent")
        svelte:component(this="{startComponent}")

      li.options: +each("menu.contextOptions as option")
        .option(on:click="{option.handler}")
          img(src="{option.iconUrl}", alt="{option.name}")
          span.name {option.name}

      +if("menu.endComponent")
        svelte:component(this="{endComponent}")
</template>

<style lang="scss">
	.context-menu {
		position: absolute;
		height: 10rem; // TODO: remove
		width: 5rem; // TODO: remove
		left: var(--position-x);
		top: var(--position-y);

		li.options {
			display: flex;
			flex-direction: column;

			> .option {
				height: 5rem; // TODO: Change
			}
		}
	}
</style>
