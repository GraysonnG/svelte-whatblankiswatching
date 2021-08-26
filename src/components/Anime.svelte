<script lang="ts">
  import { onMount } from "svelte";
  import {
    addObserver,
    removeObserver,
  } from "../store/intersectionObserverStore";
  import { onDestroy } from "svelte/internal";
  import { clickOutside } from "../utils/clickOutside";
  import Image from "./basic/Image.svelte";
  import type { AnilistAnime } from "../types/anilist";
  import Badge from "./basic/Badge.svelte";
  import EvaIcon from "./basic/EvaIcon.svelte";
  import AnimeStatusInfo from "./anime/AnimeStatusInfo.svelte";
  import { getColorFromName } from "../utils/genrehelper";

  export let data: AnilistAnime;

  let wrapper;
  let visible = false;
  let studios = data.studios.edges
    .filter((edge) => edge.isMain)
    .map((edge) => edge.node);
  let genres = data.genres;
  let show = false;

  onMount(() => {
    addObserver(wrapper, (element: IntersectionObserverEntry) => {
      visible = element.isIntersecting;
    });
  });

  onDestroy(() => {
    removeObserver(wrapper);
  });

  const handleShowInfo = () => {
    show = !show;
  };

  const handleBlurInfo = () => {
    show = false;
  };
</script>

<div
  class="card"
  bind:this={wrapper}
  style={`color: ${data.coverImage.color ? data.coverImage.color : "#ffffff"};`}
>
  {#if visible}
    <Image src={data.coverImage.medium} alt={data.title.romaji} />
    <div
      class="info"
      class:show
      use:clickOutside
      on:click_outside={handleBlurInfo}
    >
      <!-- <Image src={data.coverImage.large} alt={data.title.romaji} /> -->
      <section>
        <span>
          <div>
            {#if !!data.nextAiringEpisode}
              <AnimeStatusInfo {data} />
            {/if}
            <a href={data.siteUrl} target="_blank">{data.title.romaji}</a>
          </div>
          <EvaIcon onClick={handleShowInfo} name={"info-outline"} size={20} />
        </span>
        <div class="description">
          <hr />
          {@html data.description}
          <hr />
          <div class="genres">
            {#each genres as genre}
              <Badge color={getColorFromName(genre)}>{genre}</Badge>
            {/each}
          </div>
        </div>
        <hr />
        <div class="studio">
          {#each studios as studio (studio.id)}
            <a href={studio.siteUrl} target="_blank">
              <Badge color={data.coverImage.color}>
                {studio.name}
              </Badge>
            </a>
          {/each}
        </div>
      </section>
    </div>
  {/if}
</div>

<style lang="scss">
  @use "../styles/components/_anime";
</style>
