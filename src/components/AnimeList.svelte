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
      <Anime data={anime} />
    {/each}
  {/if}
</ul>

<style lang="scss">
  .list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, max(200px, 15%));
    justify-content: center;
    gap: 1em;
    box-sizing: border-box;
    padding: 4em 0;
    padding-bottom: 0;
    list-style: none;
    margin: 0;

    @media only screen and (max-width: 581px) {
      grid-template-columns: 1fr;
    }
  }
</style>
