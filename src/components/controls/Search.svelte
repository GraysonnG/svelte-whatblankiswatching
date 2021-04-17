<script lang="ts">
  import { clickOutside } from "../../utils/clickOutside";

  export let id;
  export let value: string;
  export let placeholder;
  export let suggestions: string[];

  let showSuggestions: boolean = false;

  const handleClickOutside = () => {
    showSuggestions = false;
  };

  const handleClick = (e) => {
    value = e.target.textContent;
    close();
  };

  const handleInteraction = () => {
    showSuggestions = suggestions.length > 0;
  };

  const close = () => {
    showSuggestions = false;
  };

  const clear = () => {
    value = "";
    close();
  };
</script>

<div {id} use:clickOutside on:click_outside={handleClickOutside}>
  <input
    {placeholder}
    on:focus={handleInteraction}
    on:change={handleInteraction}
    bind:value
    type="text"
  />
  <span on:click={clear} />
  {#if showSuggestions}
    <div class="suggestions">
      <ul>
        {#each suggestions as suggestion}
          <li on:click={handleClick}>{suggestion}</li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style lang="scss">
  div {
    position: relative;
  }

  input {
    min-width: 100%;
    min-height: 100%;
  }

  .suggestions {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    box-sizing: border-box;
    padding: 1em 0.5em;
    padding-top: 0.5em;
    border-radius: 0.5em;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    max-width: calc(100% - 1em);
    max-height: 300px;
    overflow: auto;
    width: fit-content;
    z-index: 10;
    left: 0.5em;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: calc(50% - 11px);
    right: 1em;
    padding: 0;
    height: 22px;
    width: 22px;
    margin: auto 0;

    &::after,
    &::before {
      content: "";
      display: block;
      position: relative;
      transform-origin: center center;
      left: 0;
      height: 2px;
      width: 100%;
      background-color: white;
    }

    &::before {
      top: calc(50% - 1px);
      transform: rotate(-45deg);
    }

    &::after {
      top: calc(50% - 3px);
      transform: rotate(45deg);
    }
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
</style>
