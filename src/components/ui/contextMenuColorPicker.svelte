<script lang="ts">
	type Props = {
		colors: string[],
		selectedIndex: number,
		hasNullColor: boolean,
	};

	// Props.
	export let props: Props = {
		colors: [],
		selectedIndex: -1,
		hasNullColor: false
	};

	// State.
	let colors: Array<String | null> = [];

	// Add null color to list if enabled.
	if (props.hasNullColor) {
		colors = [null, ...props.colors];
	}
</script>

<template lang="pug">
	li.colors: +each("colors as color, index")
		.color-circle
			.color(
				class!="{index === 0 && props.hasNullColor ? 'placeholder-image' : 'no-placeholder'}",
				style="--color: var({color})"
			)
			.halo(class:selected="{props.selectedIndex === index}")
</template>

<style lang="scss">
	@import '../../assets/styles/styles.scss';
	@import '../../assets/styles/variables.scss';

	li.colors {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		padding: var(--padding-context-option-lr);
		gap: 0.5rem;

		> .color-circle {
			--size-circle: 1.5rem;

			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;

			> .color {
				border-radius: 50%;
				height: var(--size-circle);
				width: var(--size-circle);

				&.no-placeholder {
					background: var(--color);
				}
			}

			> .halo {
				height: calc(var(--size-circle) * 1.2);
				width: calc(var(--size-circle) * 1.2);
				position: absolute;
				border: 0.075rem solid transparent;
				border-radius: 50%;

				&.selected {
					border-color: var(--color-primary);
				}
			}

			&:hover {
				cursor: pointer;

				> .halo {
					border-color: var(--color-bg-0);
				}
			}
		}
	}
</style>
