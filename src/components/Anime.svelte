<script lang="ts">
  import { onMount } from "svelte";
  import {
    addObserver,
    removeObserver,
  } from "../store/intersectionObserverStore";
  import { onDestroy } from "svelte/internal";
  import Image from "./basic/Image.svelte";
  import type { AnilistAnime } from "../types/anilist";
  import Badge from "./basic/Badge.svelte";
  import AnimeStatusInfo from "./anime/AnimeStatusInfo.svelte";

  export let data: AnilistAnime;

  let wrapper;
  let visible = false;
  let studios = data.studios.edges
    .filter((edge) => edge.isMain)
    .map((edge) => edge.node);

  onMount(() => {
    addObserver(wrapper, (element: IntersectionObserverEntry) => {
      visible = element.isIntersecting;
    });
  });

  onDestroy(() => {
    removeObserver(wrapper);
  });
</script>

<div
  class="card"
  bind:this={wrapper}
  style={`color: ${data.coverImage.color ? data.coverImage.color : "#ffffff"};`}
>
  {#if visible}
    <Image src={data.coverImage.large} alt={data.title.romaji} />
    <div class="title">
      <span>
        <a href={data.siteUrl} target="_blank">{data.title.romaji}</a>
        <hr />
        <div class="studio" href="#">
          {#each studios as studio (studio.id)}
            <a href={studio.siteUrl} target="_blank">
              <Badge color={data.coverImage.color}>
                {studio.name}
              </Badge>
            </a>
          {/each}
        </div>
      </span>
    </div>
    {#if !!data.nextAiringEpisode}
      <AnimeStatusInfo {data} />
    {/if}
  {/if}
</div>

<style lang="scss">
  @use "../styles/components/_anime";
</style>
