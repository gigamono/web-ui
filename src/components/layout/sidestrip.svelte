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
    border: var(--border-frame);

    > .brand-section {
      display: flex;
      width: 100%;
      height: var(--size-frame-main);
      justify-content: center;
      border-bottom: var(--border-frame);
      align-items: center;
      background-color: var(--color-bg-6);

      > :global(.brand) {
        --size-brand: 1.813rem;

        height: var(--size-brand);
        width: var(--size-brand);
      }
    }
  }
</style>
