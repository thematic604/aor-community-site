<script lang="ts">
  import {leaderboardWeathers} from "../leaderboard/data/stage/weather"
  import {leaderboardDirection} from "../leaderboard/data/stage/direction"
  import {groups} from "../leaderboard/data/stage/group"
  import {Swiper, SwiperSlide} from "swiper/svelte"

  import "swiper/css"
  import "swiper/css/navigation"
  import {Navigation} from "swiper"
  import PlatformSelector from "$lib/components/PlatformSelector.svelte"

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

  <Swiper
    modules={[Navigation]}
    slidesPerView={1}
    centeredSlides={true}
    navigation={true}
    on:activeIndexChange={swiper => (group = groups[swiper.detail[0].activeIndex].id)}
  >
    {#each groups as leaderboardGroup}
      <SwiperSlide>
        <p class="group">{leaderboardGroup.name}</p>
      </SwiperSlide>
    {/each}
  </Swiper>
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

  form > :global(.swiper) {
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
