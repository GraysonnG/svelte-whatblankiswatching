<script lang="ts">
  import { animeStore } from "../../store/animeStore";
  import Controls from "../Controls.svelte";
  import EvaIcon from "./EvaIcon.svelte";
  
  const onMenuClicked = () => {
    animeStore.update(state => {
      state.hideTop = false
      return state
    })
  }
</script>

<header class:hide={$animeStore.hideTop} >
  <div class="wrapper">
    <Controls />
  </div>
</header>

<div class="menu" class:hide={$animeStore.hideTop} on:click={onMenuClicked}>
  <EvaIcon name="menu" size={48} />
</div>

<style lang="scss">
  @use "../../styles/components/header";
  .menu {
    position: fixed;
    left: 0.25em;
    top: -10em;
    z-index: 9999;
    transition: top 150ms;
    background-color: black;

    :global(div) {
      background-color: black;
      padding: 0.25em 0.5em;  
      padding-top: 0.5em;
    }
  }
</style>