<script lang="ts">
  import ContentArea from "$layout/contentArea.svelte";
  import MenuBar from "$layout/menuBar.svelte";
  import SideStrip from "$layout/sideStrip.svelte";
  import TabBar from "$layout/tabBar.svelte";
</script>

<template lang="pug">
  #dashboard
    SideStrip.side-strip
    TabBar.tab-bar
    MenuBar.menu-bar
    ContentArea.content-area
</template>

<style lang="scss">
  @import "../assets/styles/styles.scss";

  #dashboard {
    display: grid;
    height: 100%;
    grid-template-areas:
      "side_strip tab_bar"
      "side_strip menu_bar"
      "side_strip content_area";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto 1fr;
      background-color: var(--color-bg-8);

    > :global(.side-strip) {
      grid-area: side_strip;
      width: var(--size-frame-main);
      height: 100%;
    }

    > :global(.tab-bar) {
      grid-area: tab_bar;
      width: 100%;
      height: var(--size-frame-main);
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
  }
</style>
