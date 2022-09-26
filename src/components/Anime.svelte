<script lang="ts">
  import type { AnilistAnime } from "../types/anilist";
  import Image from "./basic/Image.svelte";
  import { addObserver, removeObserver } from "../store/intersectionObserverStore";
  import { onDestroy, onMount } from "svelte";
  import { animeStore } from "../store/animeStore";
  import { simpleCrossFade } from "../utils/simpleCrossFade";

  const [send, _] = simpleCrossFade

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

  const onSelect = () => {
    send(element, {
      duration: 200,
      key: data.siteUrl
    })

    animeStore.update(state => {
      state.modalAnime = data
      return state
    })
  }

</script>

<div
  style={`--card-bg-color: ${data.coverImage.color || "white"};`}
  class="card"
  class:img-loaded={imageLoaded}
  on:click={onSelect}
  bind:this={element}>
  {#if visible}
    <h3>{data.title.romaji}</h3>
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
