<script lang="ts">
  import { animeStore } from "../store/animeStore";
  import Checkbox from "./Checkbox.svelte";
  import Select from "./Select.svelte";

  let disableSeason;

  // this is ugly
  const _ = animeStore.subscribe((it) => {
    disableSeason = it.filters.year === "";
    if (disableSeason) it.filters.season = "";
  });
</script>

<div>
  <input
    bind:value={$animeStore.filters.text}
    type="text"
    placeholder="Search..."
    id="text"
  />

  <Select bind:value={$animeStore.filters.year} id="year">
    <option value="">Select Year...</option>
    {#each $animeStore.years as year}
      <option value={year}>{year}</option>
    {/each}
  </Select>

  <Select
    disabled={disableSeason}
    bind:value={$animeStore.filters.season}
    id="season"
  >
    <option value="">Select Season...</option>
    {#each $animeStore.seasons as season}
      <option value={season}>{season}</option>
    {/each}
  </Select>

  <Checkbox bind:checked={$animeStore.filters.current} id="current">
    Show currently airing...
  </Checkbox>
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 1fr 0.5fr 0.5fr 1fr;
    grid-template-areas: "search year season current";
    gap: 1em;
    justify-content: center;
  }

  @media only screen and (max-width: 800px) {
    div {
      grid-template-areas:
        "search search search search"
        "year year season season"
        "current current current current";
    }
  }

  #text {
    grid-area: search;
  }

  * :global(#year) {
    grid-area: year;
  }

  * :global(#season) {
    grid-area: season;
  }

  * :global(#current) {
    grid-area: current;
  }
</style>
