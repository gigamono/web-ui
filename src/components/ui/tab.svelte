<script lang="ts">
	import type { Tab } from '$application/types';

	// Props.
	export let tab: Tab;
</script>

<template lang="pug">
	.tab(class="{$$props.class}")
		.name {tab?.name}
</template>

<style lang="scss">
	.tab {
		// TODO(appcypher): Add variables for tabs.
		min-width: 2rem;
		max-width: 4rem;
		height: 2rem;

		> .name {
			font-size: 1rem;
		}
	}
</style>
