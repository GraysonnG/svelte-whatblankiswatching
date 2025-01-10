<script lang="ts">
  type DropdownValue = {
    value: string;
    label: string;
  }

  export let values: DropdownValue[] = [];
  export let onSelected: (value: DropdownValue) => void;

  const defaultValue = {
    value: "",
    label: "Select..."
  };


  let selectedValue: DropdownValue = defaultValue;
  let open = false;
  let dropdownMenu: HTMLElement


  const selectValue = (index: number) => {
    selectedValue = index !== -1 ? values[index] : defaultValue;
    onSelected(selectedValue);
    open = false;
    dropdownMenu.scrollTo({ top: 0});
  }

</script>

<div class="dropdown" id="year">
  <div class="dropdown-label" on:click={() => {open = !open}}>
    <span>
      {selectedValue.label}
    </span>

    <i class="fa-solid fa-chevron-down" style="rotate: {open ? "0" : "-90"}deg;"></i>
  </div>
  <ul class:open bind:this={dropdownMenu}>
    <li on:click={() => {selectValue(-1)}}>Select...</li>
    {#each values as item, i}
      <li on:click={() => {selectValue(i)}}>{item.label}</li>
    {/each}
  </ul>
</div>


<style lang="scss">
  .dropdown {
    display: relative;

    & ul {
      position: absolute;
      background-color: #050505;
      list-style: none;
      margin: 0;
      padding: 0;
      max-height: 0;
      overflow-y: auto;
      box-shadow: 0 0 1em rgba(0, 0, 0, 0.5);
      border-radius: 0.5em;
      transition: max-height 100ms;

      &.open {
        max-height: 30dvh;
      }
    }

    & li {
      display: grid;
      margin: 0;
      padding: 0;
      cursor: pointer;
      padding: 0.5em 1em;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

  .dropdown-label {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
    display: block;
    padding: 0.7em;
    border-radius: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & i {
      transition: rotate 100ms;
    }
  }
</style>