<script lang="ts">
  import Anime from "./Anime.svelte";
  import { animeStore } from "../store/animeStore";
  import { filterList } from "../utils/filters/animefilters";
  import type { AnilistAnime } from "../types/anilist";
  import { onMount } from "svelte";
  import { init, sort } from "../store/actions/animeActions";
  import { fade } from "svelte/transition";

  let anilist: AnilistAnime[];

  const _ = animeStore.subscribe((state) => {
    anilist = filterList(state.anilist, state.filters);
  });

  onMount(async () => {
    await init();
    await sort();
  });
</script>

<ul class="list">
  {#if !$animeStore.loading}
    {#each anilist as anime (`${anime.id}-${anime.title.romaji}`)}
    <li transition:fade={{duration: 150}}>
      <Anime data={anime} />
    </li>
    {/each}
  {/if}
</ul>

<style lang="scss">
  .list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, max(250px, 23%));
    justify-content: center;
    gap: 1.5em;
    box-sizing: border-box;
    padding: 2em 0;
    padding-bottom: 0;
    list-style: none;
    margin: 0;

    @media only screen and (max-width: 581px) {
      grid-template-columns: 1fr;
    }
  }
</style>
