<script lang="ts">
  import { onMount } from "svelte";
  import { animeStore } from "../../store/animeStore";
  import type { AnimeStore } from "../../store/animeStore";

  $: previewHeight = 0;
  $: previewPercent = 0;
  let hide = false;

  let elements: {
    year: number,
    y: number,
    h: number,
  }[] = [];

  const setElements = (state: AnimeStore) => {
    setTimeout(() => {
      elements = state.years
        .filter(year => document.getElementById(`year-${year}`))
        .map(year => {
          const element = document.getElementById(`year-${year}`)
          const cTop = element.offsetTop;
          const cHeight = element.clientHeight;

          return {
            year,
            y: +(cTop / document.body.clientHeight * 100).toFixed(2),
            h: +(cHeight / document.body.clientHeight * 100).toFixed(2),
          }
        });
    }, 15);
  }

  const scrollTo = (year: number) => {
    const element = document.getElementById(`year-${year}`);
    const header = document.querySelector("header")
    window.scrollTo({ top: element.offsetTop - header.clientHeight, behavior: "smooth" });
  }

  const handleScroll = (e: WheelEvent) => {
    const target = e.target as HTMLDocument;
    const element = target.activeElement;
    const scrollPos = window.scrollY;
    const maxScroll = element.clientHeight;

    previewPercent = +(scrollPos / maxScroll * 100).toFixed(2);
  }

  onMount(() => {
    animeStore.subscribe((state) => {
      if (state.filters.year !== "") {
        hide = true;
        return;
      } else {
        if (hide) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setElements(state);
        }
        hide = false;
      }
      

      if (!state.loading) {
        const newHeight = +(window.innerHeight / document.body.clientHeight * 100).toFixed(2);
        if (previewHeight != newHeight) 
          setTimeout(() => { 
            previewHeight = +(window.innerHeight / document.body.clientHeight * 100).toFixed(2);
          }, 20);

        
        setElements(state);
      }
    })

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  });
</script>

<div class="window-preview-container" class:hide>
  {#each elements as { year, y, h } (year)}
    <div class="window-card" style="top: {y}%; height: {h}%;" on:click={() => scrollTo(year)}>
      {year}
    </div>
  {/each}
</div>

<style lang="scss">
  .hide {
    display: none;
  }

  .window-preview-container {
    isolation: isolate;
    position: fixed;
    top: 0em;
    right: 0em;
    width: 50px;
    height: 100dvh;
    z-index: 20000;
    background-color: black;
    box-shadow: 0.25em 0 0.5em rgba(0, 0, 0, 0.2);
  }

  .window-card {
    position: absolute;
    width: 100%;
    z-index: 20001;
    font-weight: bold;
    user-select: none;
    cursor: pointer;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    transition: background-color 200ms;
    font-size: 0.8em;

    &:hover {
      background-color: rgba(140, 0, 255, 0.2);
    }
  }
</style>