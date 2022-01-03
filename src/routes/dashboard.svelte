<script lang="ts">
	import ContentArea from '$layout/contentArea.svelte';
	import MenuBar from '$layout/menuBar.svelte';
	import ContextMenu from '$ui/contextMenu.svelte';
	import SideStrip from '$layout/sideStrip.svelte';
	import TabBar from '$layout/tabBar.svelte';
	import { sessionState } from '$stores/session';
	import { fetchSessionState, fetchSessionProfile } from '$stores/session';
	import { onDestroy } from 'svelte';
	import ProjectModal from '$layout/projectModal.svelte';
	import {
		openAppEvent,
		closeProjectModalEvent,
		openContextMenuEvent,
		closeContextMenuEvent
	} from '$stores/events';

	// Init.
	(async () => {
		await fetchSessionState();
		await fetchSessionProfile();
	})();

	// State.
	let appSelected = $sessionState?.selectedApp;
	let showProjectModal = false;
	let showContextMenu = false;

	// Subscriptions.
	openAppEvent.subscribe(() => {
		if ($openAppEvent) {
			showProjectModal = true;
		}
	});

	closeProjectModalEvent.subscribe(() => {
		if ($closeProjectModalEvent) {
			showProjectModal = false;
		}
	});

	openContextMenuEvent.subscribe(() => {
		if ($openContextMenuEvent) {
			showContextMenu = true;
		}
	});

	closeContextMenuEvent.subscribe(() => {
		if ($closeContextMenuEvent) {
			showContextMenu = false;
		}
	});
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

		+if("showProjectModal")
			ProjectModal.project-modal

		+if("showContextMenu")
			ContextMenu.context-menu(menu="{$openContextMenuEvent}")
</template>

<style lang="scss">
	@import '../assets/styles/variables.scss';

	#dashboard {
		--size-frame-menubar: 2.5rem;

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
			width: var(--size-frame);
			height: 100%;
		}

		> :global(.tab-bar) {
			grid-area: tab_bar;
			width: 100%;
			height: var(--size-frame);
		}

		> :global(.menu-bar) {
			grid-area: menu_bar;
			width: 100%;
			height: var(--size-frame-menubar);
		}

		> :global(.content-area) {
			grid-area: content_area;
			width: 100%;
			height: 100%;
		}

		> :global(.project-modal) {
			z-index: 0;
		}

		> :global(.context-menu) {
			z-index: 1;
		}
	}
</style>
