
<script lang="ts">
  import { Season } from "../../types/anilist";
  import { fade } from "svelte/transition";

  export let value: String = ""
  export let disabled: boolean = false

  // this is weird and im not sure im ok with that
  $: selectedSeason = value === "" ? -1 : selectedSeason

  const onSeasonClicked = (seasonIndex) => () => {
    if (!disabled) {
      if (seasonIndex === selectedSeason) {
        selectedSeason = -1
        value = ""
        return
      }

      selectedSeason = seasonIndex

      switch(seasonIndex) {
        case 0:
          value = Season.WINTER
          break;
        case 1:
          value = Season.SPRING
          break;
        case 2:
          value = Season.SUMMER
          break;
        case 3:
          value = Season.FALL
          break;
      }
    }
  }
</script>

<div id="season" class:disabled>
  {#if selectedSeason >= 0}
    <span transition:fade={{duration: 150}} class="selection" style={`left: ${((selectedSeason / 4) * 100).toFixed(0)}%;`}/>
  {/if}
  <span title={Season.WINTER} on:click={onSeasonClicked(0)}><i  class="fa-solid fa-snowflake"></i></span>
  <span title={Season.SPRING} on:click={onSeasonClicked(1)}><i  class="fa-solid fa-umbrella"></i></span>
  <span title={Season.SUMMER} on:click={onSeasonClicked(2)}><i  class="fa-solid fa-sun"></i></span>
  <span title={Season.FALL} on:click={onSeasonClicked(3)}><i  class="fa-solid fa-leaf"></i></span>
</div>

<style lang="scss">
  div {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    place-items: center;

    & > span {
      display: grid;
      width: 100%;
      height: 100%;
      place-items: center;
      cursor: pointer;
    }

    &.disabled {
      opacity: 0.5;

      & > span {
        cursor: default;
      }
    }
  }

  .selection {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0%;
    width: 25%;
    height: 100%;
    background-color: rgba(255,255,255,0.3);
    transition: all 150ms;
    border-radius: 0.25em;
  }
</style>

