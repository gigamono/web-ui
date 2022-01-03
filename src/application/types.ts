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
	handler: () => void;
};

type ContextMenu = {
	position: Position;
	contextOptions: ContextOption[];
	startComponent?: SvelteComponent;
	endComponent?: SvelteComponent;
};

export type { ProjectModalCard, Position, ContextOption, ContextMenu };
