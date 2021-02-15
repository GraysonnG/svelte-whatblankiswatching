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

  const _ = animeStore.subscribe((state) => {
    filteredList = state.list
      .filter((info) => filterTitle(info, state.filters.text))
      .filter((info) => filterCurrent(info, state.filters.current))
      .filter((info) => filterYear(info, state.filters.year))
      .filter((info) => filterSeason(info, state.filters.season));
  });
</script>

<div>
  {#if !$animeStore.loading}
    {#each filteredList as anime}
      <Anime data={anime} />
    {/each}
  {/if}
</div>

<style>
  div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 275px);
    justify-content: center;
    gap: 1em;
    box-sizing: border-box;
    padding: 1em 0;
  }

  @media only screen and (max-width: 581px) {
    div {
      grid-template-columns: 1fr;
    }
  }
</style>
