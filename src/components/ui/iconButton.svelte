<script lang="ts">
	// Props.
	export let iconUrl = '';
	export let name = '';
</script>

<template lang="pug">
	button
		img(src="{iconUrl}", alt="{name}")
</template>

<style lang="scss">
	@import '../../assets/styles/variables.scss';

	button {
		--size-shortcut: 2rem;

		width: var(--size-shortcut);
		height: var(--size-shortcut);
		border-radius: var(--radius-primary);
		display: flex;
		align-items: center;
		justify-content: center;

		> img {
			width: calc(var(--size-shortcut) * 0.5);
			height: calc(var(--size-shortcut) * 0.5);
		}
	}
</style>
