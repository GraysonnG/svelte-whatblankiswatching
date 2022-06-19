<script lang="ts">
  import AnimeList from "./components/AnimeList.svelte";
  import Controls from "./components/Controls.svelte";
  import LoadingScreen from "./components/LoadingScreen.svelte";
  import GlobalStyles from "./styles/globalstyles.svelte";
  import BackgroundWave from "./components/BackgroundWave.svelte";
</script>

<GlobalStyles />
<main>
  <header>
    <div class="wrapper">
      <h1>What am I watching?</h1>
      <Controls />
    </div>
  </header>
  <section>
    <AnimeList />
    
  </section>
  <footer>
    <ul>
      <li><a target="_blank" href="https://blanktheevil.com">Professional Portfolio</a></li>
      <li><a target="_blank" href="https://anilist.co">Anilist</a></li>
    </ul>
  </footer>
  <LoadingScreen />
</main>
<!-- <BackgroundWave /> -->

<style lang="scss">
  @use "./styles/components/header";
  @use "./styles/abstracts" as *;

  section {
    position: relative;
    box-sizing: border-box;
    padding: 2em;
    border-radius: 1em;
    margin-top: 8em;
    transition: height 300ms;
    padding-bottom: 15vh;
    z-index: 100;
    min-height: 90vh;

    @include viewport-small {
      padding: 2em 0.5em;
      margin-top: 16em;
      padding-bottom: 0.5em;
    }
  }

  main {
    width: calc(1200px + 4em);
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

  footer {
    max-width: 100vw;
  }

  ul {
      position: relative;
      z-index: 1;
      list-style: none;
      margin: 0;
      padding: 1em 2em;
      display: flex;
      flex-wrap: wrap;
      width: 100vw;
      justify-content: space-around;
      background-color: black;
      box-sizing: border-box;

      @include viewport-small {
        flex-direction: column;
        align-items: center;
        gap: 1em;
      }

      li {
        margin: 0;
        padding: 0;

        a {
          color: white;
        }
      }
    }
</style>
