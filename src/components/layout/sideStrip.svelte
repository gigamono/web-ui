<script lang="ts">
  import Brand from "$ui/brand.svelte";
  import Shortcut from "$ui/shortcut.svelte";
  import List from "$ui/list.svelte";

  // TODO(appcypher)
  const subappShortcuts = [
    { name: "deck", spec: {} },
    { name: "frontend", spec: {} },
    { name: "backend", spec: {} },
    { name: "base", spec: {} },
  ];
  const customShortcuts = [
    { name: "test", spec: {} },
    { name: "test", spec: {} },
  ];
  const systemShortcuts = [
    { name: "test", spec: {} },
    { name: "test", spec: {} },
  ];
</script>

<template lang="pug">
  #side-strip(class="{$$props.class}")
    .brand-section
      Brand.brand

    List.subapp-shortcuts(items="{subappShortcuts}", component="{Shortcut}")

    List.custom-shortcuts(items="{customShortcuts}", component="{Shortcut}")

    List.system-shortcuts(items="{systemShortcuts}", component="{Shortcut}")
</template>

<style lang="scss">
  #side-strip {
    display: flex;
    flex-direction: column;
    border: var(--border-frame);
    height: 100%;

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

    > :global(.subapp-shortcuts),
    > :global(.custom-shortcuts),
    > :global(.system-shortcuts) {
      --spacing-shortcut: 1.25rem;

      display: flex;
      flex-direction: column;
      border-bottom: var(--border-frame);
      align-items: center;
      padding: var(--spacing-shortcut) 0;

      > :global(:not(:first-child)) {
        margin-top: var(--spacing-shortcut);
      }
    }

    > :global(.custom-shortcuts)  {
      flex-grow: 1;
    }
  }
</style>
