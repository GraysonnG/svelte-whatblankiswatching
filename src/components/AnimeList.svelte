<script lang="ts">
  import Anime from "./Anime.svelte";
  import { animeStore } from "../store/animeStore";
  import { filterList } from "../utils/filters/animefilters";
  import type { AnilistAnime } from "../types/anilist";
  import { onMount } from "svelte";
  import { init, sort } from "../store/actions/animeActions";

  let anilist: AnilistAnime[];

  const _ = animeStore.subscribe((state) => {
    anilist = filterList(state.anilist, state.filters);
  });

  onMount(async () => {
    await init();
    await sort();
  });
</script>

<div>
  {#if !$animeStore.loading}
    {#each anilist as anime}
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
