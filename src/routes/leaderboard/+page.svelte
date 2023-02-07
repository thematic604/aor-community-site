<script lang="ts">
  import {areas} from "$lib/leaderboard/data/stage/area"
  import AreaPage from "$lib/components/AreaPage.svelte"
  import StageForm from "$lib/components/StageForm.svelte"
  import Leaderboard from "$lib/components/Leaderboard.svelte"
  import {swiper} from "../../lib/components/swiper"

  let platform: number
  let weather: string
  let direction: boolean
  let group: string
  let area = areas[0].id
  let stage: number
</script>

<section class="swiper-container">
  <swiper-container
    use:swiper
    navigation={true}
    hash-navigation={{watchState: true}}
    slides-per-view={1}
    parallax={true}
    on:activeindexchange={swiper => (area = areas[swiper.detail[0].activeIndex].id)}
  >
    <div slot="container-start" class="stage-form">
      <StageForm bind:platform bind:weather bind:direction bind:group />

      <Leaderboard {platform} {weather} {direction} {group} {area} {stage} />
    </div>

    {#each areas as area}
      <swiper-slide data-hash={area.name.toLowerCase()}>
        <AreaPage {area} bind:stage />
      </swiper-slide>
    {/each}
  </swiper-container>
</section>

<style lang="scss">
  @import "../../lib/style/stage-slide";

  .stage-form {
    position: absolute;
    z-index: 2;
    top: calc(#{$stage-slide-height} + 140px);
    left: 50%;
    transform: translateX(-50%);

    overflow-y: auto;

    width: min(410px, calc(100% - 8px));
    height: min(calc(100% - (#{$stage-slide-height} + 140px + 8px)), 550px);
    padding: 2px;

    background-color: #0006;
    border-radius: 4px;
  }

  @media (hover: hover) {
    .stage-form {
      scrollbar-gutter: stable both-edges;
    }
  }

  .swiper-container {
    --swiper-navigation-color: #fff;

    display: flex;
    height: 100%;

    > swiper-container > swiper-slide {
      overflow: hidden;
      backface-visibility: hidden;
    }

    @media (hover: none) {
      --swiper-navigation-size: 0;
    }
  }
</style>
