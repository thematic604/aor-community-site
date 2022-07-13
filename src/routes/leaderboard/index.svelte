<script lang="ts">
  import {areas} from "../../lib/leaderboard/data/stage/area"
  import {Swiper, SwiperSlide} from "swiper/svelte"
  import {HashNavigation, Mousewheel, Navigation, Parallax} from "swiper"
  import "swiper/css"
  import "swiper/css/navigation"
  import AreaPage from "../../lib/components/AreaPage.svelte"
</script>

<section class="title">
  <h1>leaderboard</h1>
</section>

<section class="swiper-container">
  <Swiper
    modules={[Parallax, Mousewheel, Navigation, HashNavigation]}
    navigation={true}
    hashNavigation={{watchState: true}}
    slidesPerView={1}
    parallax={true}
    mousewheel
  >
    {#each areas as area}
      <SwiperSlide data-hash={area.name.toLowerCase()}>
        <AreaPage {area} />
      </SwiperSlide>
    {/each}
  </Swiper>
</section>

<style lang="scss">
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
