import type { SvelteComponent } from 'svelte';

type ProjectModalCard = {
	projectName: string;
	imageUrl: string;
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

export type { ProjectModalCard, Position, ContextOption, ContextMenu };
