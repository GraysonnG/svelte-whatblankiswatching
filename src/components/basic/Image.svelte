<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let src: string;
  export let alt: string;
  export let loaded = false;
  
  let thisImage;

  onMount(() => {
    thisImage.addEventListener("load", () => {
      setTimeout(() => {
        loaded = true;
      }, 150);
    })
  });

  onDestroy(() => {
    thisImage.onload = null;
  });
</script>

<img {src} {alt} class:loaded bind:this={thisImage} />

<style lang="scss">
  img {
    height: 100%;
    width: 100%;
    opacity: 0;
    object-fit: cover;
    transition: all 500ms ease;

    &.loaded {
      opacity: 1;
    }
  }
</style>
