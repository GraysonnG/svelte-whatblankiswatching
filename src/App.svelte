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
  <h1>What am I watching?</h1>
  <GlobalStyles />
  <Controls />
  <AnimeList />
</main>

<style>
  main {
    width: 1500px;
    max-width: 100%;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    font-weight: 300;
  }
</style>
