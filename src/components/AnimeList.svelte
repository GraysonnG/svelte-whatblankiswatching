<script lang="ts">
  import Anime from "./Anime.svelte";
  import { animeStore } from "../store/animeStore";
  import type { AnimeInfo } from "../types/kitsuResponse";
  import {
    filterCurrent,
    filterSeason,
    filterTitle,
    filterYear,
  } from "../utils/filters/animefilters";

  let filteredList: AnimeInfo[];

  const unsub = animeStore.subscribe((state) => {
    filteredList = state.list
      .filter((info) => filterTitle(info, state.filters.text))
      .filter((info) => filterCurrent(info, state.filters.current))
      .filter((info) => filterYear(info, state.filters.year))
      .filter((info) => filterSeason(info, state.filters.season));
  });
</script>

<div>
  {#each filteredList as anime}
    <Anime data={anime} />
  {/each}
</div>

<style>
  div {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    justify-content: center;
    gap: 1em;
    box-sizing: border-box;
    padding: 1em 0;
  }
</style>
