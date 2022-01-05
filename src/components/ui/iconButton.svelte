<script lang="ts">
	// Props.
	export let iconUrl = '';
	export let name = '';
</script>

<template lang="pug">
	button(class="{$$props.class}")
		img(src="{iconUrl}", alt="{name}")
</template>

<style lang="scss">
	@import '../../assets/styles/variables.scss';

	button {
		width: var(--size-icon-button);
		height: var(--size-icon-button);
		border-radius: var(--radius-primary);
		display: flex;
		align-items: center;
		justify-content: center;

		> img {
			width: var(--size-icon-2);
			height: var(--size-icon-2);
		}

		&:hover {
			background-color: var(--color-bg-5);
		}
	}
</style>
