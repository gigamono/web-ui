<script lang="ts">
  import Brand from "../ui/brand.svelte";
</script>

<template lang="pug">
  #sidestrip(class="{$$props.class}")
    .brand-section
      Brand.brand

    .subapp-section

    .shortcut-section

    .system-section
</template>

<style lang="scss">
  #sidestrip {
    > .brand-section {
      display: flex;
      width: 3rem;
      height: 3rem;
      justify-content: center;
      align-items: center;
      border: 0.0625rem solid var(--color-bg-4);
      background-color: var(--color-bg-6);

      > :global(.brand) {
        height: 2rem;
        width: 2rem;
      }
    }
  }
</style>
