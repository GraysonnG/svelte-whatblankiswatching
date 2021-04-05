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
  $: studios = data.studios.edges
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

<div class="card" bind:this={wrapper}>
  {#if visible}
    <Image src={data.coverImage.large} alt={data.title.romaji} />
    <div class="title">
      <span>
        <a href={data.siteUrl} target="_blank">{data.title.romaji}</a>
        <hr />
        <div class="studio" href="#">
          {#each studios as studio}
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
  .card {
    overflow: hidden;
    border-radius: 0.5em;
    position: relative;
    transition: transform 100ms;
    height: 390px;
    box-shadow: 0px 0px 1em rgba(0, 0, 0, 0.5);

    .title {
      display: flex;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0%;
      align-items: center;
      justify-content: flex-end;
      color: white;
      transition: height 200ms;
      overflow: hidden;
      z-index: 1;
      flex-direction: column;

      * {
        color: white;
        text-decoration: none;
      }

      & > span {
        color: white;
        display: block;
        text-align: center;
        padding: 1em;
        box-sizing: border-box;
        width: 100%;

        hr {
          margin: 0.25em;
          margin-bottom: 0.5em;
          opacity: 0.3;
        }

        .studio {
          font-size: 0.7em;
          display: flex;
          gap: 1em;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
      }
    }

    &::after {
      content: "";
      position: absolute;
      display: block;
      height: 0;
      width: 100%;
      top: 100%;
      left: 0;
      background-color: rgba(0, 0, 0, 0.8);
      box-sizing: border-box;
      transition: all 200ms;
      transform: rotate(5deg) translateY(2em) scaleX(1.5) scaleY(1.75);
    }

    &:hover {
      .title {
        height: 33%;
      }

      &::after {
        height: 33%;
        top: 75%;
      }
    }

    @media only screen and (max-width: 581px) {
      max-height: 125px;

      .title {
        font-size: large;
      }

      &:hover {
        .title {
          height: 100%;
        }

        &::after {
          width: 100%;
          height: 100%;
          transform: none;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
</style>
