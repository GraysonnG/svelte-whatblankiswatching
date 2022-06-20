<script lang="ts">
  import AnimeList from "./components/AnimeList.svelte";
  import LoadingScreen from "./components/LoadingScreen.svelte";
  import GlobalStyles from "./styles/globalstyles.svelte";
  import Header from "./components/basic/Header.svelte";
</script>

<GlobalStyles />
<main >
  <Header />
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

<style lang="scss">
  @use "./styles/abstracts" as *;

  section {
    position: relative;
    box-sizing: border-box;
    padding: 2em;
    border-radius: 1em;
    margin-top: 10em;
    transition: height 300ms;
    padding-bottom: 15vh;
    z-index: 100;
    min-height: 90vh;

    @include viewport-small {
      position: sticky;
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
    width: 100%;
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
