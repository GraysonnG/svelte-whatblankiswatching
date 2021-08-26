<script lang="ts">
  import AnimeList from "./components/AnimeList.svelte";
  import Controls from "./components/Controls.svelte";
  import LoadingScreen from "./components/LoadingScreen.svelte";
  import GlobalStyles from "./styles/globalstyles.svelte";
  import BackgroundWave from "./components/BackgroundWave.svelte";
</script>

<GlobalStyles />
<main>
  <section>
    <h1>What am I watching?</h1>
    <Controls />
    <AnimeList />
  </section>
  <LoadingScreen />
</main>
<BackgroundWave />

<style lang="scss">
  section {
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    padding: 2em;
    border-radius: 1em;
    margin-top: 8em;
    transition: height 300ms;

    @media only screen and (max-width: 581px) {
      padding: 2em 0.5em;
      margin-top: 3em;
      padding-bottom: 0.5em;
    }
  }

  main {
    width: calc(1200px + 4em);
    max-width: 100%;
    margin: 0 auto;
    margin-bottom: 25vh;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 300;
    font-size: 32px;
  }
</style>
