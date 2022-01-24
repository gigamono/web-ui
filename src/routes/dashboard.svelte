// Copyright 2022 the Gigamono authors. All rights reserved. GPL-3.0 License.

<script lang="ts">
	import ContentArea from '$layout/contentArea.svelte';
	import MenuBar from '$layout/menuBar.svelte';
	import ContextMenu from '$ui/contextMenu.svelte';
	import SideStrip from '$layout/sideStrip.svelte';
	import TabBar from '$layout/tabBar.svelte';
	import { onDestroy } from 'svelte';
	import ProjectModal from '$layout/projectModal/projectModal.svelte';
	import type { Tab } from '$types/model';
	import EverythingIcon from '$assets/icons/everything.svg';
	import AddIcon from '$assets/icons/add.svg';
	import { emitDashboardStartedEvent } from '$stores/events/events';
	import { setupStoreSubscriptions } from '$stores/index';

	// State.
	let menuTabOptions = null;
	let showProjectModal = false;
	let showContextMenu = false;

	// Init.
	setupStoreSubscriptions();
	emitDashboardStartedEvent({});

	// Subscriptions.
	// $: if ($openProjectModalSignal) {
	// 	showProjectModal = true;
	// }

	// $: if ($closeProjectModalSignal) {
	// 	showProjectModal = false;
	// }

	// $: if ($openContextMenuSignal) {
	// 	showContextMenu = true;
	// }

	// $: if ($closeContextMenuSignal) {
	// 	showContextMenu = false;
	// }

	// Handlers.
	const handleMouseDown = () => {
		showContextMenu = false;
	};

	const handleWindowKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			showContextMenu = false;
		}
	};

	const handleWindowBlur = () => {
		showContextMenu = false;
	};
</script>

<template lang="pug">
	svelte:window(
		on:keydown="{handleWindowKeyDown}",
		on:blur="{handleWindowBlur}",
		on:mousedown="{handleMouseDown}"
	)

	svelte:head
		title Gigamono | Dashboard

	#dashboard
		SideStrip.side-strip
		TabBar.tab-bar

		+if("menuTabOptions")
			MenuBar.menu-bar

		ContentArea.content-area

		+if("showProjectModal")
			ProjectModal.project-modal

		+if("showContextMenu")
			ContextMenu.context-menu(menu="{null}")

		//- Preload tab bar icon images.
		link(rel="preload", as="image", href="{EverythingIcon}", crossorigin='anonymous')
		link(rel="preload", as="image", href="{AddIcon}", crossorigin='anonymous')
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
