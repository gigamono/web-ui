<script lang="ts">
	import { session } from '$stores/session';
	import NoAppSelectedIllustration from '$assets/illustrations/no_app_selected.svg';

	// State.
	let appSelected = $session?.selectedApp;
</script>

<template lang="pug">
	#content-area(class="{$$props.class}")
		+if("appSelected")
			iframe#app-frame(title="" src="")

		+if("!appSelected")
			.no-app-selected-container
				.title You have not selected any app
				.body Please select an app from the sidebar to get started
				img(src="{NoAppSelectedIllustration}" alt="no app selected")

</template>

<style lang="scss">
	#content-area {
    position: relative;

		> iframe {
			height: 100%;
			width: 100%;
		}

		> .no-app-selected-container {
			grid-area: content_area;
			background-color: var(--color-bg-8);
			display: flex;
			flex-direction: column;
			align-items: center;

			> .title {
				font-size: 1.125rem;
				font-weight: 650;
				color: var(--color-text-0);
				margin-top: 8rem;
			}

			> .body {
				color: var(--color-text-6);
				margin-top: 1.75rem;
			}

			> img {
				height: 20rem;
				margin-top: 4.75rem;
			}
		}
	}
</style>
