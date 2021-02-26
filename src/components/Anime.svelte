<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import mobile from "is-mobile";
  import type { AnimeInfo } from "../types/kitsuResponse";
  import { Tilt } from "../utils/animationhelper";
  import Image from "./Image.svelte";
  import {
    addObserver,
    removeObserver,
  } from "../store/intersectionObserverStore";
  export let data: AnimeInfo;

  let wrapper;
  let tilt: Tilt;
  let visible = false;

  const handleReset = (e: MouseEvent) => {
    if (tilt) tilt.reset();
  };

  const handleTilt = (e: MouseEvent) => {
    if (tilt) tilt.animate(e);
  };

  onMount(() => {
    if (!mobile()) {
      tilt = new Tilt(wrapper, 25);
    }

    addObserver(wrapper, (element: IntersectionObserverEntry) => {
      visible = element.isIntersecting;
    });
  });

  onDestroy(() => {
    removeObserver(wrapper);
    tilt = null;
  });
</script>

<div
  class="card"
  bind:this={wrapper}
  on:mousemove={handleTilt}
  on:mouseleave={handleReset}
  on:mouseenter={handleTilt}
>
  {#if visible}
    <Image
      src={data.attributes.posterImage.large}
      alt={data.attributes.canonicalTitle}
    />
    <a
      class="nineanime"
      href={`https://9anime.to/search?keyword=${data.attributes.slug}`}
      target="_blank"
    >
      9Anime
    </a>

    <a
      class="title"
      href={`https://kitsu.io/anime/${data.attributes.slug}`}
      target="_blank"
    >
      <span>{data.attributes.canonicalTitle}</span>
    </a>
  {/if}
</div>

<style>
  span {
    display: block;
    text-align: center;
    line-height: auto;
    padding: 1em;
    box-sizing: border-box;
    width: 100%;
  }

  a.title {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0%;
    align-items: center;
    color: white;
    transition: height 200ms;
    overflow: hidden;
    z-index: 1;
  }

  a.nineanime {
    display: block;
    position: absolute;
    top: -3em;
    right: 0.25em;
    color: white;
    background-color: #9600ff;
    border-radius: 0.5em;
    box-shadow: 0px 0px 0.25em rgba(0, 0, 0, 0.5);
    transition: top 200ms;
    box-sizing: border-box;
    padding: 7px 14px;
  }

  .card:hover a.title {
    height: 25%;
  }

  .card:hover a.nineanime {
    top: 0.25em;
  }

  .card::after {
    content: "";
    position: absolute;
    display: block;
    height: 0;
    width: 100%;
    top: 100%;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transition: all 200ms;
    transform: rotate(5deg) translateY(2em) scaleX(1.5) scaleY(1.75);
  }

  .card:hover::after {
    height: 25%;
    top: 75%;
  }

  .card {
    overflow: hidden;
    border-radius: 0.5em;
    position: relative;
    transition: transform 100ms;
    height: 390px;
    box-shadow: 0px 0px 1em rgba(0, 0, 0, 0.5);
  }

  @media only screen and (max-width: 581px) {
    .card {
      max-height: 125px;
    }

    .card:hover::after {
      width: 100%;
      height: 100%;
      transform: none;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .card a.nineanime {
      display: none;
    }

    .card a.title {
      font-size: large;
    }

    .card:hover a.title {
      height: 100%;
    }

    .card:hover::after {
      height: 100%;
      top: 0;
    }
  }
</style>
