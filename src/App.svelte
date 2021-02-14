<script lang="ts">
  import { onMount } from "svelte";
  import AnimeList from "./components/AnimeList.svelte";
  import Controls from "./components/Controls.svelte";
  import { init, sort } from "./store/actions/animeActions";
  import Global from "./styles/global.svelte";

  onMount(async () => {
    await init();
    await sort();
  });
</script>

<main>
  <Global />
  <Controls />
  <AnimeList />
</main>

<style>
  main {
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
