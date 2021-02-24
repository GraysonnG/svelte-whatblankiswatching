<script lang="ts">
  import { onMount } from "svelte";
  import type { AnimeInfo } from "../types/kitsuResponse";
  import { Tilt } from "../utils/animationhelper";
  import Image from "./Image.svelte";
  export let data: AnimeInfo;

  let wrapper;
  let tilt: Tilt;

  const handleReset = (e: MouseEvent) => {
    tilt.reset();
  };

  const handleTilt = (e: MouseEvent) => {
    tilt.animate(e);
  };

  onMount(() => {
    tilt = new Tilt(wrapper, 25);
  });
</script>

<div
  class="card"
  bind:this={wrapper}
  on:mousemove={handleTilt}
  on:mouseleave={handleReset}
  on:mouseenter={handleTilt}
>
  <Image
    src={data.attributes.posterImage.large}
    alt={data.attributes.canonicalTitle}
  />

  <a href={`https://kitsu.io/anime/${data.attributes.slug}`} target="_blank">
    <span>{data.attributes.canonicalTitle}</span>
  </a>
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

  a {
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

  .card:hover a {
    height: 25%;
  }

  .card::after {
    content: "";
    position: absolute;
    display: block;
    height: 0;
    width: 100%;
    top: 100%;
    left: 0;
    backdrop-filter: blur(5px);
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
  }

  @media only screen and (max-width: 581px) {
    .card {
      max-height: 125px;
    }

    .card:hover a {
      height: 100%;
    }
  }
</style>
