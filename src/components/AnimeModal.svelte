<script>
  import { animeStore } from "../store/animeStore";
  import { clickOutside } from "../utils/clickOutside";
  import Image from "./basic/Image.svelte";
  import Badge from "./basic/Badge.svelte";
  import { getColorFromName } from "../utils/genrehelper";
  import { quintOut } from "svelte/easing";
  import { fade } from "svelte/transition";
  import { simpleCrossFade } from "../utils/simpleCrossFade";

  const [_, receive] = simpleCrossFade

  const zoom = (_, { duration }) => ({
    duration,
    easing: quintOut,
    css: t => {
      return `
        transform: scale(${t});
        opacity: ${t};
      `
    }
  })

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
  <section transition:fade={{duration: 500}}>
    <div
      class="card"
      use:clickOutside
      on:click_outside={closeModal}
      style={`--anime-color:${$animeStore.modalAnime.coverImage.color || "white"}`}
      in:receive={{ key: $animeStore.modalAnime.siteUrl }}
      out:zoom={{duration: 500}}
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