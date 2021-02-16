<script lang="ts">
  export let id;
  export let checked;

  let cls = "checkbox";

  const handleClick = () => {
    checked = !checked;
    cls = checked ? "checkbox active" : "checkbox";
  };
</script>

<div {id} on:click={handleClick} class={cls}>
  <span>
    <slot />
  </span>
</div>

<style>
  div.checkbox {
    display: block;
    border-radius: 0.5em;
    background: transparent;
    border: 1px solid white;
    color: white;
    padding: 0.7em;
    align-items: center;
    user-select: none;
    position: relative;
    padding-left: calc(0.7em + 21px + 0.7em);
  }

  div.checkbox::after,
  div.checkbox::before {
    content: "";
    display: block;
    height: 22px;
    width: 22px;
    position: absolute;
    left: 0.7em;
    top: calc(50% - 11px);
    box-sizing: border-box;
  }

  div.checkbox::after {
    border: 1px solid white;
    border-radius: 0.3em;
  }

  div.checkbox:hover::after {
    background-color: rgba(255, 255, 255, 0.2);
  }

  div.checkbox::before {
    z-index: 1;
    border-bottom: 4px solid white;
    border-right: 6px solid white;
    transition: all 100ms ease-in-out;
    transform: scale(0) rotate(0deg) scaleX(0.6) translate(-7%, -7%);
    transform-origin: center center;
  }

  div.checkbox.active::before {
    transform: scale(0.5) rotate(45deg) scaleX(0.6) translate(-7%, -7%);
  }

  div > * {
    margin: 0;
    padding: 0;
  }
</style>
