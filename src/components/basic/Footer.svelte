<script lang="ts">
  import { onMount } from "svelte";
  import { animeStore } from "../../store/animeStore";
</script>

<footer class:hide={$animeStore.hideBottom}>
  <ul>
    <li><a target="_blank" href="https://blanktheevil.com">Professional Portfolio</a></li>
    <li><a target="_blank" href="https://anilist.co">Anilist</a></li>
  </ul>
</footer>

<style lang="scss">
  @use "../../styles/abstracts" as *;

  footer {
    position: fixed;
    width: 100%;
    max-width: 100vw;
    bottom: 0;
    left: 0;
    z-index: 10000;
    transform-origin: bottom;
    transition: transform 150ms;
    
    &.hide {
      transform: scaleY(0);
    }

    &::after, &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: -2px;
      left: 0;
      background: linear-gradient(90deg, magenta, cyan);
      z-index: 1;
    }

    &::after {
      filter: blur(5px);
    }
  }

  ul {
    position: relative;
    z-index: 2;
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