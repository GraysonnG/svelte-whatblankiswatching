<script lang="ts">
  import { animeStore } from "../store/animeStore";
  import { getUniqueYears } from "../utils/datehelper";
  import { getUniqueSeasons } from "../utils/seasonhelper";

  let years;
  let seasons;
  let disableSeason;

  let unsub = animeStore.subscribe((it) => {
    years = getUniqueYears(it.list);
    seasons = getUniqueSeasons(it.list);
    disableSeason = it.filters.year === "";
    if (disableSeason) it.filters.season = ""; // this is ugly
  });
</script>

<div class="controls">
  <input
    bind:value={$animeStore.filters.text}
    type="text"
    placeholder="Search..."
  />

  <select bind:value={$animeStore.filters.year}>
    <option value="">Select Year...</option>
    {#each years as year}
      <option value={year}>{year}</option>
    {/each}
  </select>

  <select disabled={disableSeason} bind:value={$animeStore.filters.season}>
    <option value="">Select Season...</option>
    {#each seasons as season}
      <option value={season}>{season}</option>
    {/each}
  </select>

  <div class="input">
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
    gap: 1em;
    justify-content: center;
  }

  .input {
    display: flex;
    align-items: center;
  }

  .input > input {
    margin-right: 0.5em;
  }
</style>
