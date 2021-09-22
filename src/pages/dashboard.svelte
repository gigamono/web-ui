<script lang="ts">
  import Canvas from "../components/layout/canvas.svelte";
  import Menubar from "../components/layout/menubar.svelte";
  import Sidestrip from "../components/layout/sidestrip.svelte";
  import Tabbar from "../components/layout/tabbar.svelte";
</script>

<template lang="pug">
  #dashboard
    Sidestrip
    Tabbar
    Menubar
    Canvas
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
  }
</style>
