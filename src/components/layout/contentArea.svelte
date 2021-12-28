<script lang="ts"></script>

<template lang="pug">
  #content-area(class="{$$props.class}")
    iframe#app-frame(title="" src="")
</template>

<style lang="scss">
	#content-area {
		> iframe {
			height: 100%;
			width: 100%;
		}
	}
</style>
