<script lang="ts">
  import {Swiper, SwiperSlide} from "swiper/svelte"

  import "swiper/css"
  import "swiper/css/effect-cards"
  import {EffectCards, Mousewheel} from "swiper"
  import type {Area} from "../leaderboard/data/stage/area"
  import Image from "./Image.svelte"
  import {LEADERBOARD_BASE_HREF} from "../leaderboard/leaderboard.js"
  import {leaderboardFilters} from "../leaderboard/data/filter.js"

  export let area: Area

  export let direction: string
  export let weather: string
  export let platform: string
  export let group: string
</script>

<div class="container">
  <Swiper modules={[EffectCards, Mousewheel]} effect="cards" nested={true} mousewheel>
    {#each area.stages as stage}
      <SwiperSlide>
        <a
          href="/leaderboard/{area.id}_Stage_{stage.id}_{direction}_{weather}_{group}/{leaderboardFilters.Top}/{platform}"
        >
          <Image
            src="stages/{area.name.toLowerCase()}/cover/{area.name.toLowerCase()}_{stage.id}"
            alt={area.name}
            sizes={[256, 128, 480, 512]}
          />
          <Image
            class="minimap"
            src="stages/{area.name.toLowerCase()}/minimap/{area.name}{stage.id}"
            alt={area.name}
            sizes={[256, 128, 480, 512]}
          />
          <p>{stage.name}</p>
        </a>
      </SwiperSlide>
    {/each}
  </Swiper>
</div>

<style lang="scss">
  .container {
    width: 200px;
    margin-inline: auto;

    color: black;
    font-size: 24px;
    font-weight: bold;

    > :global(.swiper > .swiper-wrapper > .swiper-slide) {
      width: 120px;
      height: 240px;
      padding: 8px;
      background-color: white;
    }

    p {
      margin: 0;
    }
  }

  :global(img) {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }

  :global(img.minimap) {
    position: absolute;
    top: 0;
    left: 0;
  }

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
