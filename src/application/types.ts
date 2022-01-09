import type { SvelteComponent } from 'svelte';

type Project = {
	id: string;
	name: string;
	space: string;
	color: string;
};

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

type SessionOpenTab = {
	id: string;
	app: string;
	tabId: string;
	focus: boolean;
};

type SessionFocus = {
	app: string;
};

type Tab = {
	id: string;
	name: string;
	app: string;
	projectId: string;
	order: number;
};

export type {
	Project,
	Position,
	ContextOption,
	ToggleOption,
	ContextMenu,
	ContextMenuColorPickerProps,
	SessionOpenTab,
	SessionFocus,
	Tab
};
