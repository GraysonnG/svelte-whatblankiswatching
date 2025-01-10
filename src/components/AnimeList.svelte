<script lang="ts">
  import Anime from "./Anime.svelte";
  import { animeStore } from "../store/animeStore";
  import { filterList } from "../utils/filters/animefilters";
  import type { AnilistAnime } from "../types/anilist";
  import { onMount } from "svelte";
  import { init, sort } from "../store/actions/animeActions";

  let lists: {
    year: number,
    list: AnilistAnime[]
  }[];

  const _ = animeStore.subscribe((state) => {
    const anilist = filterList(state.anilist, state.filters);

    lists = state.years.map((year) => ({
      year,
      list: anilist.filter((anime) => (anime.seasonYear || anime.startDate.year) === year)
    }));
  });

  onMount(async () => {
    await init();
    await sort();
  });
</script>

{#if !$animeStore.loading}
  {#each lists as { year, list } (year)}
    {#if list.length > 0}
      <div id={"year-" + year}>
        <h2>{year}</h2>
        <ul class="list">
          {#each list as anime (`${anime.id}-${anime.title.romaji}`)}
            <Anime data={anime} />
          {/each}
        </ul>
      </div>
    {/if}
  {/each}
{/if}

<style lang="scss">
  .list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, max(200px, 15%));
    justify-content: center;
    gap: 1em;
    box-sizing: border-box;
    padding: 0 1em;
    padding-bottom: 0;
    list-style: none;
    margin: 0;

    @media only screen and (max-width: 581px) {
      grid-template-columns: 1fr;
    }
  }

  div {
    margin-bottom: 1em;
    padding-block: 2em;
    background-color: #111;
    border-radius: 1em;
    transition: all 500ms;
    overflow-x: scroll;
  }

  div:hover {
    background-color: #181818;

    & h2 {
      opacity: 1;
    }
  }

  h2 {
    display: block;
    font-size: 3rem;
    margin: 0 auto;
    padding-inline: 1em;
    padding-bottom: 0.25em;
    font-weight: 100;
    opacity: 0.2;
    transition: opacity 500ms;
  }
</style>
