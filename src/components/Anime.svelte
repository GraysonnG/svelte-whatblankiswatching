<script lang="ts">
  import type { AnilistAnime } from "../types/anilist";
  import Image from "./basic/Image.svelte";
  import { addObserver, removeObserver } from "../store/intersectionObserverStore";
  import { onDestroy, onMount } from "svelte";

  export let data: AnilistAnime;
  let element;
  let visible = false;
  let imageLoaded = false;

  onMount(() => {
    addObserver(element, (elem: IntersectionObserverEntry) => {
      visible = elem.isIntersecting
    })
  })

  onDestroy(() => {
    removeObserver(element)
  })

</script>

<div
  style={`--card-bg-color: ${data.coverImage.color || "white"};`}
  class="card"
  class:img-loaded={imageLoaded}
  bind:this={element}>
  {#if visible}
    <h3><a href={data.siteUrl} target="_blank">{data.title.romaji}</a></h3>
    <div class="corner" class:current={!!data.nextAiringEpisode}>

    </div>

    <!-- bg -->
    <div class="img-shadow">
      <div class="tone">
      </div>
    </div>
    <Image bind:loaded={imageLoaded} src={data.coverImage.extraLarge} alt=""/>
    <!-- /bg -->
  {/if}
</div>

<style lang="scss">
  @use "../styles/components/_anime";
</style>
