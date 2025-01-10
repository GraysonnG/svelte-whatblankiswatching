<script lang="ts">
  import { animeStore } from "../store/animeStore";
  import {
    filterList,
    filterTitleStartsWith,
  } from "../utils/filters/animefilters";
  import { sortByTitle } from "../utils/listsorters";
  import Checkbox from "./controls/Checkbox.svelte";
  import Dropdown from "./controls/Dropdown.svelte";
  import Search from "./controls/Search.svelte";
  import SeasonSelector from "./controls/SeasonSelector.svelte";
  import Select from "./controls/Select.svelte";

  let disableSeason;
  let searchSuggestions: string[] = [];

  const _ = animeStore.subscribe((it) => {
    disableSeason = it.filters.year === "";
    if (disableSeason) it.filters.season = "";

    searchSuggestions = sortByTitle(
      filterList([...it.anilist], it.filters)
        .filter((info) => filterTitleStartsWith(info, it.filters.text))
        .filter((info) => info.title.romaji !== it.filters.text)
    ).map((ani) => (ani.title.english || ani.title.romaji));
  });
</script>

<div>
  <Search
    bind:value={$animeStore.filters.text}
    placeholder="Search..."
    id="text"
    suggestions={searchSuggestions}
  />

  <Dropdown 
    onSelected={(value => $animeStore.filters.year = value.value)}
    values={$animeStore.years.map(it => ({value: it.toString(), label: it.toString()}))}
  />

  <SeasonSelector bind:value={$animeStore.filters.season} disabled={disableSeason} />

  <Checkbox bind:checked={$animeStore.filters.current} id="current">
    Show currently airing...
  </Checkbox>
</div>

<style lang="scss">
  div {
    display: grid;
    grid-template-columns: 1fr 0.5fr 0.5fr 1fr;
    grid-template-areas: "search year season current";
    gap: 1em;
    max-width: 1200px;
    margin: 0 auto;

    @media only screen and (max-width: 800px) {
      grid-template-areas:
        "search search search search"
        "year year season season"
        "current current current current";
    }
  }

  * {
    :global(#text) {
      grid-area: search;
    }

    :global(#year) {
      grid-area: year;
    }

    :global(#season) {
      grid-area: season;
    }

    :global(#current) {
      grid-area: current;
    }
  }
</style>
