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
        <h2><a href={$animeStore.modalAnime.siteUrl} target="_blank">{$animeStore.modalAnime.title.romaji}</a></h2>
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
  @use "../styles/abstracts" as *;

  section {
    position: fixed;
    left: 0;
    top: 0;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    z-index: 10005;
    background-color: rgba(0,0,0,0.5);

    .card {
      position: relative;
      height: 80vh;
      max-width: calc(100% - 1em);
      aspect-ratio: 8/13;
      background-color: rgb(15, 15, 15);
      display: flex;
      overflow: auto;
      flex-direction: column;
      border-bottom: 4px solid var(--anime-color);
      box-shadow: 0 0 2em var(--anime-color);
      outline: 2px solid var(--anime-color);
      outline-offset: 4px;

      .content {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 1em;

        h2 {
          font-size: 2em;
          margin: 0;
          font-weight: 100;
          border-bottom: 1px solid white;
          
          a {
            color: white;
            text-decoration: none;
          }
        }

        .desc {
          max-height: 16em;
          overflow: auto;

          @include viewport-small {
            max-height: 12em;
          }  
        }

        .genres {
          font-size: 0.7em;
          display: flex;
          gap: 0.5em;
        }
      }

      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 66%;
        background: linear-gradient(transparent, black);
        z-index: 1;

        @include viewport-small {
          height: 80%;
          background: linear-gradient(transparent, black, black);
        }
      }

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 30%;
        transform: rotate(180deg);
        background-color: var(--anime-color);
        -webkit-mask-image: url("../img/tone.png");
        mask-image: url("../img/tone.png");
        -webkit-mask-size: contain;
        mask-size: contain;
        z-index: 1;
      }

      .close {
        position: absolute;
        top: 0;
        right: 0;
        height: 5em;
        aspect-ratio: 1/1;
        cursor: pointer;

        > i {
          position: absolute;
          top: 1.15em;
          right: 1.20em;
        }

        &::after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          border-top: 2.5em solid black;
          border-left: 2.5em solid transparent;
          border-right: 2.5em solid black;
          border-bottom: 2.5em solid transparent;
        }
      }
    }


    :global(img) {
      position: absolute;
      inset: 0;
      z-index: 0;
    }

    :global(:not(img)) {
      position: relative;
      z-index: 2;
    }
  }
</style>