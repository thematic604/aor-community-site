<script lang="ts">
  import {leaderboardWeathers} from "../leaderboard/data/stage/weather"
  import {leaderboardDirection} from "../leaderboard/data/stage/direction"
  import {groups} from "../leaderboard/data/stage/group"
  import PlatformSelector from "$lib/components/PlatformSelector.svelte"
  import {swiper} from "./swiper"

  export let platform = 2
  export let weather = "Dry"
  let reverseChecked: boolean
  $: {
    direction = reverseChecked ? leaderboardDirection.Reverse : leaderboardDirection.Forward
  }
  export let direction: string
  export let group = groups[0].id
</script>

<form>
  <PlatformSelector bind:platform />
  <fieldset class="weather">
    <div>
      {#each leaderboardWeathers as leaderboardWeather}
        <input type="radio" name="weather" bind:group={weather} value={leaderboardWeather.id} />
      {/each}
    </div>
    <input type="checkbox" name="reverse" value="reverse" bind:checked={reverseChecked} />
  </fieldset>

  <swiper-container
    use:swiper
    slides-per-view={1}
    centered-slides={true}
    navigation={true}
    on:activeindexchange={swiper => (group = groups[swiper.detail[0].activeIndex].id)}
  >
    {#each groups as leaderboardGroup}
      <swiper-slide>
        <p class="group">{leaderboardGroup.name}</p>
      </swiper-slide>
    {/each}
  </swiper-container>
</form>

<style lang="scss">
  $font-size: 24px;

  form {
    box-sizing: border-box;
    width: fit-content;
    margin-top: 16px;
    margin-inline: auto;

    border-radius: 4px;
  }

  form > swiper-container {
    --swiper-navigation-size: 24px;

    width: 256px;
    font-size: $font-size;
    font-weight: bold;
    text-transform: lowercase;
  }

  .group {
    width: fit-content;
    margin-block: 16px;
    margin-inline: auto;
  }

  fieldset {
    border: none;
  }

  .platforms,
  .weather {
    display: flex;
    justify-content: space-between;
  }

  input[name="reverse"]::after,
  input[name="weather"]::after {
    cursor: pointer;
    content: attr(value);

    font-size: $font-size;
    font-weight: bold;
    color: white;
    text-transform: lowercase;
  }

  input {
    width: fit-content;
    appearance: none;
    filter: brightness(0.7);
    transition: all 0.2s ease-in-out;
  }

  input:checked {
    filter: brightness(1);
  }

  @media (hover: hover) {
    input:hover {
      transform: translateY(-2px);
      filter: brightness(0.9);
    }
  }
</style>
