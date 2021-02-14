<script lang="ts">
  import { animeStore } from "../store/animeStore";

  let disableSeason;

  // this is ugly
  const _ = animeStore.subscribe((it) => {
    disableSeason = it.filters.year === "";
    if (disableSeason) it.filters.season = "";
  });
</script>

<div class="controls">
  <input
    bind:value={$animeStore.filters.text}
    type="text"
    placeholder="Search..."
    id="text"
  />

  <select bind:value={$animeStore.filters.year} id="year">
    <option value="">Select Year...</option>
    {#each $animeStore.years as year}
      <option value={year}>{year}</option>
    {/each}
  </select>

  <select
    disabled={disableSeason}
    bind:value={$animeStore.filters.season}
    id="season"
  >
    <option value="">Select Season...</option>
    {#each $animeStore.seasons as season}
      <option value={season}>{season}</option>
    {/each}
  </select>

  <div class="input" id="current-wrapper">
    <input
      bind:checked={$animeStore.filters.current}
      id="current"
      name="current"
      type="checkbox"
    />
    <label for="current">Show currently airing...</label>
  </div>
</div>

<style>
  .controls {
    display: grid;
    grid-template-columns: 1fr 0.5fr 0.5fr 1fr;
    grid-template-areas: "search year season current";
    gap: 1em;
    justify-content: center;
  }

  @media only screen and (max-width: 800px) {
    .controls {
      grid-template-areas:
        "search search search search"
        "year year season season"
        "current current current current";
    }
  }

  #text {
    grid-area: search;
  }

  #year {
    grid-area: year;
  }

  #season {
    grid-area: season;
  }

  #current-wrapper {
    grid-area: current;
  }

  .input {
    display: flex;
    align-items: center;
  }

  .input > input {
    margin-right: 0.5em;
  }
</style>
