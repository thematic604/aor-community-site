<script lang="ts">
  import {leaderboardPlatforms} from "$lib/leaderboard/data/platform"

  export let platform = 2
</script>

<fieldset class="platforms">
  {#each leaderboardPlatforms as leaderboardPlatform}
    <input
      type="radio"
      name="platform"
      value={leaderboardPlatform.id}
      bind:group={platform}
      style="background-image: url('/platforms/{leaderboardPlatform.name}.svg')"
    />
  {/each}
</fieldset>

<style lang="scss">
  fieldset {
    border: none;
  }

  input[name="platform"] {
    cursor: pointer;

    background-size: contain;
    border-radius: 0;

    width: 32px;
    height: 32px;

    transition: all 0.2s ease-in-out;
  }

  input {
    width: fit-content;
    appearance: none;
    filter: brightness(0.7);
    transition: all 0.2s ease-in-out;
  }

  @media (hover: hover) {
    input:hover {
      transform: translateY(-2px);
      filter: brightness(0.9);
    }
  }

  input:checked {
    filter: brightness(1);
  }
</style>
