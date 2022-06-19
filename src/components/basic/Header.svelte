<script lang="ts">
  import { onMount } from "svelte";
  import { isSmallViewport } from "../../utils/displayhelper";
  import Controls from "../Controls.svelte";
  import EvaIcon from "./EvaIcon.svelte";

  let header;
  let hide = false

  const onMenuClicked = () => {
    hide = false;
  }

  onMount(() => {
    window.onscroll = () => {
      const scrollPos = window.pageYOffset
      hide = (scrollPos >= 114)
    }
  })
</script>

<header bind:this={header} class:hide >
  <div class="wrapper">
    <h1>What am I watching?</h1>
    <Controls />
  </div>
</header>

{#if isSmallViewport()}
  <div class="menu" class:hide on:click={onMenuClicked}>
    <EvaIcon name="menu" size={48} />
  </div>
{/if}

<style lang="scss">
  @use "../../styles/components/header";

  h1 {
    margin-top: 0;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 300;
    font-size: 32px;
  }

  .menu {
    position: fixed;
    left: 0.25em;
    top: -10em;
    z-index: 10001;
    transition: top 150ms;
    background-color: black;

    :global(div) {
      background-color: black;
      padding: 0.25em 0.5em;  
      padding-top: 0.5em;
    }

    &::before, &::after {
      content: "";
      background: linear-gradient(90deg, magenta, cyan);
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -2;
      left: 0;
      top: 3px;
    }

    &::after {
      filter: blur(5px);
    }

    &.hide {
      top: 0.5em;
    }
  }
</style>