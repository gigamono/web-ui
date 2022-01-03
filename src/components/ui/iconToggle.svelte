<script lang="ts">
	type Icon = {
		filledIconUrl: string;
		outlineIconUrl: string;
		name: string;
	};

	// Props.
	export let icons: Icon[] = [];
</script>

<template lang="pug">
  li.icons: +each("icons as icon")
    button
      img(src="{iconUrl}", alt="{name}")
</template>

<style lang="scss">
	@import '../../assets/styles/variables.scss';

	> li.icons {
		display: flex;

		> button {
			> img {
			}
		}
	}
</style>
