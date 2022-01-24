// Copyright 2022 the Gigamono authors. All rights reserved. GPL-3.0 License.

import type { SvelteComponent } from 'svelte';

type Position = {
	x: number;
	y: number;
};

type ContextOption = {
	iconUrl: string;
	name: string;
	color: string;
	handler: (event: Event) => void;
};

type ContextMenuColorPickerProps = {
	colors: string[];
	selectedIndex: number;
	hasNullColor: boolean;
};

type ContextMenuComponent<P> = {
	component: typeof SvelteComponent;
	props: P;
};

type ContextMenu<A, B> = {
	position: Position;
	contextOptions: ContextOption[];
	startComponent?: ContextMenuComponent<A>;
	endComponent?: ContextMenuComponent<B>;
};

type ToggleOption = {
	outlineIconUrl: string;
	filledIconUrl: string;
	name: string;
	handler: (event: Event) => void;
};

type Shortcut = {
	filledIconUrl: string;
	outlineIconUrl: string;
	id: string;
};

export type {
	Position,
	ContextOption,
	ToggleOption,
	ContextMenu,
	ContextMenuColorPickerProps,
	Shortcut
};
