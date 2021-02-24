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
  <section>
    <h1>What am I watching?</h1>
    <Controls />
    <AnimeList />
  </section>
</main>

<style>
  section {
    background: linear-gradient(rgba(0, 0, 0, 0.8) 0%, transparent 40em);
    box-sizing: border-box;
    padding: 2em;
    border-radius: 1em;
    margin-top: 8em;
  }

  @media only screen and (max-width: 581px) {
    section {
      padding: 2em 0.5em;
      margin-top: 3em;
    }
  }
  main {
    width: calc(1500px + 4em);
    max-width: 100%;
    margin: 0 auto;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 300;
    font-size: 32px;
  }
</style>
