<script>
  import { onMount } from "svelte";
  import * as eva from "eva-icons";

  export let size = 24;
  export let name = "";
  export let onClick = () => {};

  onMount(() => {
    eva.replace();
  });
</script>

<div on:click={onClick}>
  <i
    data-eva={name}
    data-eva-fill="#ffffff"
    data-eva-height={size}
    data-eva-width={size}
  />
</div>

<style>
  div {
    cursor: pointer;
  }
</style>
