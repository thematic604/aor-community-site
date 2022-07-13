<script lang="ts">
  import {areas} from "../../lib/leaderboard/data/stage/area"
  import {Swiper, SwiperSlide} from "swiper/svelte"
  import {HashNavigation, Navigation, Parallax} from "swiper"
  import "swiper/css"
  import "swiper/css/navigation"
  import AreaPage from "../../lib/components/AreaPage.svelte"
  import StageForm from "../../lib/components/StageForm.svelte"
  import Leaderboard from "../../lib/components/Leaderboard.svelte"

  let platform: number
  let weather: string
  let direction: boolean
  let group: string
  let area = areas[0].id
  let stage: number
</script>

<section class="title">
  <h1>leaderboard</h1>
</section>

<section class="swiper-container">
  <Swiper
    modules={[Parallax, Navigation, HashNavigation]}
    navigation={true}
    hashNavigation={{watchState: true}}
    slidesPerView={1}
    parallax={true}
    on:activeIndexChange={swiper => (area = areas[swiper.detail[0].activeIndex].id)}
  >
    <div slot="container-start" class="stage-form">
      <StageForm bind:platform bind:weather bind:direction bind:group />

      <Leaderboard {platform} {weather} {direction} {group} {area} {stage} />
    </div>

    {#each areas as area}
      <SwiperSlide data-hash={area.name.toLowerCase()}>
        <AreaPage {area} bind:stage />
      </SwiperSlide>
    {/each}
  </Swiper>
</section>

<style lang="scss">
  @import "../../lib/style/stage-slide";

  .stage-form {
    position: absolute;
    top: calc(#{$stage-slide-height} + 140px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    -webkit-backdrop-filter: brightness(0.6);
    backdrop-filter: brightness(0.6);
    height: min(calc(100% - (#{$stage-slide-height} + 140px + 8px)), 550px);
    width: min(410px, calc(100% - 8px));

    border-radius: 4px;
    padding: 2px;

    overflow-y: auto;
  }

  .title {
    padding: 8px;
    padding-inline: 16px;
    background: #000714;

    h1 {
      font-size: 24px;
    }
  }

  .swiper-container {
    display: flex;
    height: 100%;

    --swiper-navigation-color: #fff;

    > :global(.swiper > .swiper-wrapper > .swiper-slide) {
      backface-visibility: hidden;
      overflow: hidden;
    }

    @media (hover: none) {
      --swiper-navigation-size: 0;
    }
  }
</style>
