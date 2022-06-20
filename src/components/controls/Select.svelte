<script lang="ts">
  export let disabled = false;
  export let value;
  export let id;
</script>

<div {id}>
  <select {disabled} class:disabled bind:value>
    <slot />
  </select>
</div>

<style lang="scss">
  div {
    position: relative;

    > select {
      width: 100%;
      height: 100%;

      &:disabled {
        opacity: 0.5;
      }
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      border-bottom: 2px solid white;
      border-right: 2px solid white;
      border-radius: 1px;
      box-sizing: border-box;
      transform: rotate(45deg) translate(-7%, -10%);
      transform-origin: center center;
      transition: transform 200ms;
      right: 1em;
      top: calc(50% - 5px);
      width: 11px;
      height: 11px;
    }
  }
</style>
