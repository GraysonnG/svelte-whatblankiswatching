<script lang="ts">
  import type { AnimeInfo } from "../types/kitsuResponse";
  export let data: AnimeInfo;
</script>

<div>
  <img
    src={data.attributes.posterImage.small}
    alt={data.attributes.canonicalTitle}
  />
</div>

<style>
  div {
    overflow: hidden;
    border-radius: 0.5em;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-width: 100%;
  }
</style>
