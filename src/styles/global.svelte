<style>
  :global(input),
  :global(select) {
    display: block;
    border-radius: 0.5em;
    background: none;
    background-color: transparent;
    border: 1px solid white;
    color: white;
    padding: 0.7em;
  }

  :global(select) {
    appearance: none;
  }

  :global(select)[disabled=""] {
    opacity: 0.5;
  }

  :global(label) {
    user-select: none;
  }
</style>
