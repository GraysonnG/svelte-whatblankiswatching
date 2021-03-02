<script lang="ts">
  import Anime from "./Anime.svelte";
  import { animeStore } from "../store/animeStore";
  import type { AnimeInfo } from "../types/kitsuResponse";
  import { filterList } from "../utils/filters/animefilters";

  let filteredList: AnimeInfo[];

  const _ = animeStore.subscribe((state) => {
    filteredList = filterList(state.list, state.filters);
  });
</script>

<div>
  {#if !$animeStore.loading}
    {#each filteredList as anime}
      <Anime data={anime} />
    {/each}
  {/if}
</div>

<style lang="scss">
  div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 275px);
    justify-content: center;
    gap: 1em;
    box-sizing: border-box;
    padding: 1em 0;

    @media only screen and (max-width: 581px) {
      grid-template-columns: 1fr;
    }
  }
</style>
