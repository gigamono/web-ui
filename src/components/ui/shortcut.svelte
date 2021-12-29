<script lang="ts">
	export let filledIconUrl: string = null;
	export let outlineIconUrl: string = null;
	export let name: string = null;

	const loadApp = () => {
		// TODO(appcypher): Load the app
	};
</script>

<template lang="pug">
	button.shortcut(class="{$$props.class}" on:click|preventDefault="{loadApp}")
		div.icon(style=`
			--icon-outline-url: url("{outlineIconUrl}");
			--icon-filled-url: url("{filledIconUrl}");
			`
		)
</template>

<style lang="scss">
	@import '../../assets/styles/styles.scss';

	button.shortcut {
		--size-shortcut: 2rem;
		--size-shortcut-icon: 1rem;

		width: var(--size-shortcut);
		height: var(--size-shortcut);
		border-radius: var(--radius-primary);
		display: flex;
		align-items: center;
		justify-content: center;

		> .icon {
			@include icon-mask(var(--icon-outline-url));

			width: var(--size-shortcut-icon);
			height: var(--size-shortcut-icon);
			background-color: var(--color-text-5);
		}

		&:hover {
			cursor: pointer;
			background-color: var(--color-primary-3);

			> .icon {
				@include icon-mask-hover(var(--icon-filled-url));

				background-color: var(--color-bg-8);
			}
		}
	}
</style>
