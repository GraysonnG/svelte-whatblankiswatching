<script lang="ts">
  import type { AnimeInfo } from "../types/kitsuResponse";
  import Image from "./Image.svelte";
  export let data: AnimeInfo;
</script>

<div>
  <Image
    src={data.attributes.posterImage.large}
    alt={data.attributes.canonicalTitle}
  />
</div>

<style>
  div {
    overflow: hidden;
    border-radius: 0.5em;
  }

  @media only screen and (max-width: 581px) {
    div {
      max-height: 125px;
    }
  }
</style>
