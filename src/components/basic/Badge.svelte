<script lang="ts">
  import Color from "color";

  export let color;
  $: fgColor = new Color(color).isLight() ? "black" : "white";
</script>

<span class="badge" style={`background-color: ${color}; color:${fgColor}`}>
  <slot />
</span>

<style lang="scss">
  @import "../../styles/components/badge";
</style>
