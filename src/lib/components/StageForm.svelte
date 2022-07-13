<script lang="ts">
  import {leaderboardPlatforms} from "../leaderboard/data/platform"
  import {leaderboardWeathers} from "../leaderboard/data/stage/weather"
  import {leaderboardDirection} from "../leaderboard/data/stage/direction"
  import {groups} from "../leaderboard/data/stage/group"

  export let platform = 6
  export let weather = "Dry"
  let reverseChecked: boolean
  $: {
    direction = reverseChecked ? leaderboardDirection.Reverse : leaderboardDirection.Forward
  }
  export let direction: string
  export let group = "GroupB"
</script>

<form>
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
  <fieldset class="weather">
    <div>
      {#each leaderboardWeathers as leaderboardWeather}
        <input type="radio" name="weather" bind:group={weather} value={leaderboardWeather.id} />
      {/each}
    </div>
    <input type="checkbox" name="reverse" value="reverse" bind:checked={reverseChecked} />
  </fieldset>

  <select bind:value={group}>
    {#each groups as leaderboardGroup}
      <option value={leaderboardGroup.id}>{leaderboardGroup.name.toLowerCase()}</option>
    {/each}
  </select>
</form>

<style lang="scss">
  form {
    margin-top: 16px;
    margin-inline: auto;
    width: fit-content;

    -webkit-backdrop-filter: brightness(0.6);
    backdrop-filter: brightness(0.6);

    border-radius: 4px;
    box-sizing: border-box;
  }

  fieldset {
    border: none;
  }

  .platforms,
  .weather {
    display: flex;
    justify-content: space-between;
  }

  input[name="platform"] {
    cursor: pointer;

    background-size: contain;
    border-radius: 0;

    width: 32px;
    height: 32px;

    transition: all 0.2s ease-in-out;
  }

  input[name="reverse"]::after,
  input[name="weather"]::after {
    cursor: pointer;
    color: white;

    font-size: 24px;
    font-weight: bold;

    content: attr(value);
    text-transform: lowercase;
  }

  input {
    width: fit-content;
    appearance: none;
    filter: brightness(0.7);
    transition: all 0.2s ease-in-out;
  }

  @media (hover: hover) {
    input:hover {
      filter: brightness(0.9);
    }
  }

  input:checked {
    filter: brightness(1);
  }
</style>
