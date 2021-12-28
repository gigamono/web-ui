<script lang="ts">
	export let filledIconUrl: string = null;
	export let outlineIconUrl: string = null;
	export let name: string = null;
</script>

<template lang="pug">
  .shortcut
    img(
      src="{filledIconUrl}"
      alt="{name}"
    )
</template>

<style lang="scss">
	.shortcut {
		--size-shortcut: 2rem;
		--size-shortcut-icon: 1rem;

		width: var(--size-shortcut);
		height: var(--size-shortcut);
		background-color: var(--color-primary);
		border-radius: var(--radius-primary);

		> img {
			width: var(--size-shortcut-icon);
			height: var(--size-shortcut-icon);
		}
	}
</style>
