<script>
  import { onMount } from "svelte";
  import { ANILIST_CACHE_KEY } from "../utils/anilisthelper";
  import { storedValueExpired } from "../utils/cachehelper";
  import { animeStore } from "../store/animeStore";

  let percentage = 0;
  let max = 90;
  let animation;
  let fadeOut = false;
  let visible = true;

  const onFinish = () => {
    fadeOut = true;
    animation = cancelAnimationFrame(animation);
    document.body.removeAttribute("style");
    setTimeout(() => {
      visible = false;
    }, 500);
  };

  const animate = () => {
    if (percentage < max) {
      percentage += 3;
    }

    if (percentage < 100) {
      animation = requestAnimationFrame(() => {
        animate();
      });
    } else {
      onFinish();
    }
  };

  onMount(async () => {
    if (!storedValueExpired(ANILIST_CACHE_KEY)) {
      visible = false;
    } else {
      document.body.setAttribute("style", "overflow: hidden;");
      percentage = 0;
      animation = requestAnimationFrame(() => {
        animate();
      });
    }
  });

  animeStore.subscribe((state) => {
    if (!state.loading) {
      max = 100;
    }
  });
</script>

{#if visible}
  <div class="screen" class:fadeOut>
    <h1>What<br />Blank</h1>
    <span>Loading...</span>
    <div class="bar-outer">
      <div class="bar" style={`width: ${percentage}%;`} />
    </div>
    <h1>is<br />watching</h1>
  </div>
{/if}

<style lang="scss">
  h1 {
    text-align: right;
    margin: 1rem;
    font-size: 10em;
    color: #1a1a1a;

    &:first-child {
      text-align: left;
    }

    @media only screen and (max-width: 581px) {
      font-size: 4em;
    }
  }

  .screen {
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #222;
    color: white;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity: 1;
    transition: all 500ms;
    overflow: hidden;
    z-index: 10000;
  }

  .bar {
    background: linear-gradient(to right, cyan, magenta, orange);
    height: 0.25em;
    width: 0px;
    transition: width 100ms;
  }

  .bar-outer {
    padding: 1px;
    box-sizing: border-box;
    margin: 0.5em 0;
    background-color: #1a1a1a;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .fadeOut {
    opacity: 0;
    height: 0px;
    top: 50vh;
  }
</style>
