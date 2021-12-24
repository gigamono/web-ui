<script lang="ts">
  import { compute_rest_props } from "svelte/internal";

  export let items: any[] = [];
  export let component: any;
</script>

<template lang="pug">
  li(class="{$$props.class}")
    +each("items as item")
      svelte:component(this="{component}" '{...item}')
</template>
