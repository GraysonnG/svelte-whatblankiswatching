<script lang="ts">
  import Color from "color";

  export let color;
  $: fgColor = new Color(color).isLight() ? "rgba(0, 0, 0, 0.6)" : "white";
</script>

<span class="badge" style={`background-color: ${color}; color:${fgColor}`}>
  <slot />
</span>

<style lang="scss">
  @use "../../styles/components/badge";
</style>
