<script lang="ts">
  import type { AnilistAnime } from "../../types/anilist";
  import { getSecondsSinceRequestDate } from "../../utils/anilisthelper";
  import { createTimeFromSeconds } from "../../utils/datehelper";

  export let data: AnilistAnime;

  $: secondsTillAiring = !!data.nextAiringEpisode
    ? data.nextAiringEpisode.timeUntilAiring
    : 0;
  $: timeTillAiring = createTimeFromSeconds(secondsTillAiring);
  $: color =
    data.status.toLowerCase() === "not_yet_released" ? "yellow" : "lime";

  if (secondsTillAiring > 0) {
    secondsTillAiring -= getSecondsSinceRequestDate();
    timeTillAiring = createTimeFromSeconds(secondsTillAiring);
  }
</script>

<div class={`status`}>
  <span class="dot" style={`color: ${color}`} />Current {data.nextAiringEpisode
    .episode - 1}/{data.episodes ? data.episodes : "??"}&nbsp|&nbsp;
  <span class="time">Next: {timeTillAiring.days}d {timeTillAiring.hour}h</span>
</div>

<style lang="scss">
  .status {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 1em;
    margin: 0.5em;
    padding: 0.25em;
    padding-right: 0.5em;
    box-sizing: border-box;
    font-size: 0.8em;
    line-height: 1;
    font-weight: bold;
    z-index: 2;

    .dot {
      position: relative;
      color: red;
      background-color: currentColor;
      box-sizing: border-box;
      width: 12px;
      height: 12px;
      margin-right: 0.5em;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0px 0px 0.5em rgba(0, 0, 0, 0.8);

      &::after {
        position: absolute;
        content: "";
        animation: pulse 2s ease-out infinite;
        background-color: currentColor;
        width: 16px;
        height: 16px;
        left: calc(50% - 8px);
        top: calc(50% - 8px);
        border-radius: 50%;
        opacity: 0.3;
      }
    }
    .time {
      color: #aaa;
    }
  }

  @keyframes pulse {
    0% {
      left: calc(50% - 8px);
      top: calc(50% - 8px);
      width: 16px;
      height: 16px;
      opacity: 0;
    }
    50% {
      left: calc(50% - 8px);
      top: calc(50% - 8px);
      width: 16px;
      height: 16px;
      opacity: 0.3;
    }
    75% {
      left: calc(50% - 12px);
      top: calc(50% - 12px);
      width: 24px;
      height: 24px;
    }

    100% {
      left: calc(50% - 12px);
      top: calc(50% - 12px);
      width: 24px;
      height: 24px;
      opacity: 0;
    }
  }
</style>
