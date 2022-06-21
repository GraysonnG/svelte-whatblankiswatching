<script lang="ts">
  import AnimeList from "./components/AnimeList.svelte";
  import LoadingScreen from "./components/LoadingScreen.svelte";
  import GlobalStyles from "./styles/globalstyles.svelte";
  import Header from "./components/basic/Header.svelte";
  import Footer from "./components/basic/Footer.svelte";
  import { onMount } from "svelte";
  import { animeStore } from "./store/animeStore";
  import AnimeModal from "./components/AnimeModal.svelte";

  onMount(() => {
    window.onscroll = (ev) => {

      setTimeout(() => {
        const scrollPos = document.documentElement.scrollTop + window.innerHeight
        const scrollHeight = document.body.scrollHeight

        animeStore.update(state => {
          state.hideTop = !(scrollPos <= window.innerHeight + 150)
          state.hideBottom = !(scrollHeight - scrollPos <= 300)
          return state
        })
      }, 10)
    }
  })
</script>

<GlobalStyles />
<main >
  <Header />
  <section>
    <AnimeList />
  </section>
  <Footer />
  <AnimeModal />
  <LoadingScreen />
</main>

<style lang="scss">
  @use "./styles/abstracts" as *;

  section {
    position: relative;
    box-sizing: border-box;
    padding: 2em;
    border-radius: 1em;
    transition: height 300ms;
    padding-bottom: 10em;
    padding-top: 10em;
    z-index: 100;
    min-height: 90vh;

    @media only screen and (max-width: 800px) {
      position: sticky;
      padding: 2em 0.5em;
      padding-top: 18em;
      padding-bottom: 10em;
    }
  }

  main {
    width: calc(1200px + 4em);
    max-width: 100%;
    margin: 0 auto;
  }

  
</style>
