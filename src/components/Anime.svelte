<script lang="ts">
  import { onMount } from "svelte";
  import {
    addObserver,
    removeObserver,
  } from "../store/intersectionObserverStore";
  import { afterUpdate, beforeUpdate, onDestroy } from "svelte/internal";
  import Image from "./Image.svelte";
  import type { AnilistAnime } from "../types/anilistResponse";
  import { getSecondsSinceRequestDate } from "../utils/anilisthelper";
  import { createTimeFromSeconds } from "../utils/datehelper";
  import type { Time } from "../utils/datehelper";
  import Badge from "./Badge.svelte";

  export let data: AnilistAnime;

  const getPrimaryStudios = () => {
    return data.studios.edges
      .filter((edge) => edge.isMain)
      .map((edge) => edge.node);
  };

  let wrapper;
  let visible = false;
  let secondsTillAiring: number = 0;
  let timeTillAiring: Time = createTimeFromSeconds(secondsTillAiring);
  let studios = getPrimaryStudios();

  const initTimeStuff = () => {
    secondsTillAiring = !!data.nextAiringEpisode
      ? data.nextAiringEpisode.timeUntilAiring
      : 0;

    timeTillAiring = createTimeFromSeconds(secondsTillAiring);

    if (secondsTillAiring > 0) {
      secondsTillAiring -= getSecondsSinceRequestDate();
      timeTillAiring = createTimeFromSeconds(secondsTillAiring);
    }
  };

  initTimeStuff();

  onMount(() => {
    addObserver(wrapper, (element: IntersectionObserverEntry) => {
      visible = element.isIntersecting;
    });
  });

  afterUpdate(() => {
    initTimeStuff();
    studios = getPrimaryStudios();
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
      <div class={`status`}>
        <span class="dot" />Episode {data.nextAiringEpisode
          .episode}/{data.episodes ? data.episodes : "??"}:&nbsp;
        <span class="time">{timeTillAiring.days}d {timeTillAiring.hour}h</span>
      </div>
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

    .status {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.8);
      border-radius: 1em;
      margin: 0.5em;
      padding: 0.25em;
      padding-right: 0.5em;
      box-sizing: border-box;
      font-size: 0.8em;
      line-height: 1;
      font-weight: bold;
      z-index: 2;

      .dot {
        background-color: lime;
        box-sizing: border-box;
        padding: 0.33em;
        margin-right: 0.5em;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0px 0px 0.5em rgba(0, 0, 0, 0.8);
      }
      .time {
        color: #aaa;
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
