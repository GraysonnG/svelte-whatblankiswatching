<script lang="ts">
  import { onMount } from "svelte";
  import AnimeList from "./components/AnimeList.svelte";
  import Controls from "./components/Controls.svelte";
  import { init, sort } from "./store/actions/animeActions";
  import GlobalStyles from "./styles/globalstyles.svelte";

  onMount(async () => {
    await init();
    await sort();
  });
</script>

<main>
  <GlobalStyles />
  <Controls />
  <AnimeList />
</main>

<style>
  main {
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
