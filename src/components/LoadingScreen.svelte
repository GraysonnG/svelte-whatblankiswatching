<script lang="ts">
  import { onMount } from "svelte";
  import { AnilistAnime } from "../types/anilist";
  import { AnimeStore, animeStore } from "../store/animeStore";
  import Anime from "./Anime.svelte";
  import { fade, scale } from "svelte/transition";

  type RandomPos = {
    x: number;
    y: number;
    time: number;
    scale: number;
    opacity: number;
    rotation: number;
  }

  const enabled = true;
  const arrSize = 20;
  const listSpeed = 25;
  let visible = true;
  let loading = true;
  let animeList: AnilistAnime[] = [];
  let randomPos: RandomPos[];

  const getBiasedRandom = (i) => {
    const aOrB = 50 + ((i % 2 ? 1 : -1) * 25);
    return aOrB + (Math.random() > 0.5 ? 1 : -1) * (i * 2.5);
  }

  const setUpRandomPos = () => {
    randomPos = Array.from({ length: arrSize }, (_, i) => ({
      x: i < arrSize - 1 ? getBiasedRandom(i) : 50,
      y: i < arrSize - 1 ? 25 + Math.floor(Math.random() * 50) : 50,
      time: listSpeed,
      scale: 0,
      opacity: 0,
      rotation: i < arrSize - 1 ? -10 + Math.floor(Math.random() * 20) : 0,
    }));
  }

  const handleStartAnimations = (html: HTMLElement) => {
    setTimeout(() => {
      loading = false;
      randomPos.forEach((pos, i) => {
        setTimeout(() => {
          randomPos[i].opacity = 1
          randomPos[i].scale = 1
        }, 100 + (pos.time * i))
      })

      setTimeout(() => {
        visible = false;
        html.style.overflow = "auto";
      }, (randomPos.length * listSpeed) + 1000);
    }, 500);
  }

  const setUpAnimeList = (state: AnimeStore) => {
    const currentYear = new Date().getFullYear();
    const recentAnime = state.anilist.filter(a => a.startDate.year === currentYear)
    const recentAnimeSize = recentAnime.length
    
    // grab arrSize - 1 anime from the list at random
    animeList = state.anilist.map(x => ({ x, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(a => a.x)
      .slice(0, arrSize - 1);

    if (recentAnimeSize > 0) {
      // add one random anime from the current year
      animeList.push(recentAnime[Math.floor(Math.random() * recentAnimeSize)])
    } else {
      animeList.push(animeList[0])
    }
  }

  onMount(() => {
    const html = document.getElementsByTagName("html")[0];
    if (enabled) html.style.overflow = "hidden";
    setUpRandomPos()

    animeStore.subscribe((state) => {
      if (!enabled)visible = false
      if (!state.loading && enabled) {
        handleStartAnimations(html);
        setUpAnimeList(state)
      }
    });
  });
</script>

{#if visible}
  <div class="loading-screen" out:fade={{duration: 1000}}>
    {#if loading}
      <h2>Loading...</h2>
    {:else}
      {#each animeList as anime, i}
        <div class="anime-card" style="z-index: {randomPos[i].time};transform: rotate({randomPos[i].rotation}deg) translate(-50%, -50%) scale({randomPos[i].scale * 2}); opacity: {randomPos[i].opacity}; top: {randomPos[i].y}%; left: {randomPos[i].x}%;">
          <Anime data={anime} />
        </div>
      {/each}
    {/if}
  </div>
{/if}

<style lang="scss">
  .loading-screen {
    isolation: isolate;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #010101;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 30000;
    scale: 1;

    h2 {
      color: white;
    }

    .anime-card {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transform: rotate(0deg) scale(1) translate(-50%, -50%);
      isolation: isolate;
      box-sizing: border-box;
      overflow: hidden;
      width: 20em;
      transition: opacity 500ms, transform 500ms ease-in;
      pointer-events: none;
      user-select: none;
      box-shadow: 0 0 2em black;
    }
  }

  @keyframes grow {
    0% {
      scale: 1;
    }
    100% {
      scale: 1.2;
    }
  }
</style>
