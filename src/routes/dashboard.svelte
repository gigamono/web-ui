<script lang="ts">
	import NoAppSelectedIllustration from '../assets/illustrations/no_app_selected.svg';
	import ContentArea from '$layout/contentArea.svelte';
	import MenuBar from '$layout/menuBar.svelte';
	import SideStrip from '$layout/sideStrip.svelte';
	import TabBar from '$layout/tabBar.svelte';
	import { fetchApps } from '$stores/apps';
	import { fetchSessionState, fetchSessionProfile } from '$stores/session';
	import { onDestroy } from 'svelte';

	$: {
		fetchSessionState();
		fetchSessionProfile();
	}

	let appSelected = false;
</script>

<template lang="pug">
	svelte:head
		title Gigamono | Dashboard

	#dashboard
		SideStrip.side-strip
		TabBar.tab-bar

		+if("appSelected")
			MenuBar.menu-bar
			ContentArea.content-area

		+if("!appSelected")
			.no-app-selected-container
				.title You have not selected any app
				.body Please select an app from the sidebar to get started
				img(src="{NoAppSelectedIllustration}" alt="no app selected")
</template>

<style lang="scss">
	@import '../assets/styles/styles.scss';

	#dashboard {
		display: grid;
		height: 100%;
		grid-template-areas:
			'side_strip tab_bar'
			'side_strip menu_bar'
			'side_strip content_area';
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto 1fr;
		background-color: var(--color-bg-8);

		> :global(.side-strip) {
			grid-area: side_strip;
			width: var(--size-frame-main);
			height: 100%;
		}

		> :global(.tab-bar) {
			grid-area: tab_bar;
			width: 100%;
			height: var(--size-frame-main);
		}

		> :global(.menu-bar) {
			--size-frame-menubar: 2.5rem;

			grid-area: menu_bar;
			width: 100%;
			height: var(--size-frame-menubar);
		}

		> :global(.content-area) {
			grid-area: content_area;
			width: 100%;
			height: 100%;
		}

		> .no-app-selected-container {
			grid-area: content_area;
			background-color: var(--color-bg-8);
			display: flex;
			flex-direction: column;
			align-items: center;

			> .title {
				font-size: 1.125rem;
				font-weight: 900;
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
