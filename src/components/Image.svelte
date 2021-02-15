<script lang="ts">
  import { onMount } from "svelte";

  export let src: string;
  export let alt: string;

  let loaded = false;
  let thisImage;

  onMount(() => {
    thisImage.onload = () => {
      loaded = true;
    };
  });
</script>

<img {src} {alt} class:loaded bind:this={thisImage} />

<style>
  img {
    height: 100%;
    width: 100%;
    opacity: 0;
    object-fit: cover;
    transition: all 500ms;
  }

  img.loaded {
    opacity: 1;
  }
</style>
