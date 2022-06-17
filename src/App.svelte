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
  section {
    box-sizing: border-box;
    padding: 2em;
    border-radius: 1em;
    margin-top: 8em;
    transition: height 300ms;
    padding-bottom: 15vh;

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
  }

  h1 {
    margin-top: 0;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 300;
    font-size: 32px;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10000;
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: translateY(2px);
      background: linear-gradient(90deg, magenta, cyan);
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: translateY(2px);
      background: linear-gradient(90deg, magenta, cyan);
      filter: blur(0.5em);
    }

    .wrapper {
      position: relative;
      background-color: black;
      z-index: 1;
      padding: 1em;
      padding-top: 2em;
      padding-bottom: 0.5em;
    }
  }
  ul {
      position: relative;
      z-index: 1;
      list-style: none;
      margin: 0;
      padding: 1em 2em;
      display: flex;
      width: 100%;
      justify-content: space-around;
      background-color: black;

      li {
        margin: 0;
        padding: 0;

        a {
          color: white;
        }
      }
    }
</style>
