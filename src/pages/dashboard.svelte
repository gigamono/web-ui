<script lang="ts">
  import Canvas from "../components/layout/canvas.svelte";
  import Menubar from "../components/layout/menubar.svelte";
  import Sidestrip from "../components/layout/sidestrip.svelte";
  import Tabbar from "../components/layout/tabbar.svelte";
</script>

<template lang="pug">
  #dashboard
    Sidestrip.sidestrip
    Tabbar.tabbar
    Menubar.menubar
    Canvas.canvas
</template>

<style lang="scss">
  #dashboard {
    background-color: yellowgreen;
    display: grid;
    height: 100%;
    grid-template-areas:
      "sidestrip tabbar"
      "sidestrip menubar"
      "sidestrip canvas";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto 1fr;
      background-color: var(--color-bg-8);

    > :global(.sidestrip) {
      grid-area: sidestrip;
      width: var(--size-frame-main);
      height: 100%;
    }

    > :global(.tabbar) {
      grid-area: tabbar;
      width: 100%;
      height: var(--size-frame-main);
    }

    > :global(.menubar) {
      grid-area: menubar;
      width: 100%;
      height: var(--size-frame-menubar);
    }

    > :global(.canvas) {
      grid-area: canvas;
      width: 100%;
      height: 100%;
    }
  }
</style>
