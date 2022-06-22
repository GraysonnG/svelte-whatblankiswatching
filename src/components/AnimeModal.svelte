<script>
  import { animeStore } from "../store/animeStore";
  import { clickOutside } from "../utils/clickOutside";
  import Image from "./basic/Image.svelte";
  import { fly } from "svelte/transition";
  import Badge from "./basic/Badge.svelte";
  import { getColorFromName } from "../utils/genrehelper";

  const closeModal = () => {
    animeStore.update(state => {
      state.modalAnime = null
      return state
    })
  }

  animeStore.subscribe(state => {
    if (state.modalAnime) {
      document.body.style = "overflow: hidden;"
    } else {
      document.body.style = ""
    }
  })

</script>

{#if $animeStore.modalAnime !== null}
  <section>
    <div
      class="card"
      use:clickOutside
      on:click_outside={closeModal}
      style={`--anime-color:${$animeStore.modalAnime.coverImage.color || "white"}`}
      transition:fly={{duration: 250, y: 200}}
      >
      <div class="content">
        <h2>
          <a href={$animeStore.modalAnime.siteUrl} target="_blank">
            {$animeStore.modalAnime.title.romaji}
          </a>
        </h2>
        <p class="desc">{@html $animeStore.modalAnime.description}</p>
        <div class="genres">
          {#each $animeStore.modalAnime.genres as genre}
            <Badge color={getColorFromName(genre)}>
              {genre}
            </Badge>
          {/each}
        </div>
      </div>
      <div class="close" on:click={closeModal}>
        <i class="fa-solid fa-xmark"></i>
      </div>
      <Image src={$animeStore.modalAnime.coverImage.extraLarge} alt="" />
    </div>
  </section>
{/if}

<style lang="scss">
  @use "../styles/components/anime_modal"
</style>