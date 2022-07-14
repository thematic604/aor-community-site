<script>
  import {cars} from "../lib/leaderboard/data/cars"
  import {Swiper, SwiperSlide} from "swiper/svelte"

  import "swiper/css"
  import Car from "../lib/components/Car.svelte"
  import {groupNames} from "../lib/leaderboard/data/stage/group"
  import {Parallax} from "swiper"
</script>

<div class="swiper-container">
  <Swiper slidesPerView={1}>
    <img slot="container-start" src="/processed/areas/japan-1920.webp" alt="background" />
    {#each Object.entries(cars) as [group, carGroup]}
      <SwiperSlide>
        <Swiper modules={[Parallax]} parallax={true} centeredSlides={true} slidesPerView="auto">
          <h1 slot="container-start" data-swiper-parallax="-200">{groupNames[group]}</h1>
          {#each carGroup as car}
            <SwiperSlide>
              <Car {car} />
            </SwiperSlide>
          {/each}
        </Swiper>
      </SwiperSlide>
    {/each}
  </Swiper>
</div>

<style lang="scss">
  h1 {
    text-transform: lowercase;
    margin-left: 32px;
    margin-bottom: 32px;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 130%;
    height: 100%;

    object-fit: cover;
  }

  .swiper-container {
    display: flex;
    height: 100%;

    --swiper-navigation-color: #fff;

    :global(.swiper-slide .swiper-slide) {
      width: calc(256px + 2 * 16px);
      height: 100%;
    }

    @media (hover: none) {
      --swiper-navigation-size: 0;
    }
  }
</style>
