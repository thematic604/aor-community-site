<script lang="ts">
  import {cars} from "../lib/leaderboard/data/cars"
  import {Swiper, SwiperSlide} from "swiper/svelte"

  import "swiper/css"
  import Car from "../lib/components/Car.svelte"
  import {groupNames} from "../lib/leaderboard/data/stage/group"
  import {HashNavigation, Navigation, Parallax} from "swiper"

  const carSlides: {
    car: Car
    index: number
    groupName: string
  }[] = Object.entries(cars).flatMap(([groupName, group]) => {
    return group.map((car, carIndex) => ({
      car,
      carIndex,
      groupName: groupNames[groupName],
    }))
  })
</script>

<div class="swiper-container">
  <Swiper
    modules={[Parallax, Navigation, HashNavigation]}
    navigation={true}
    parallax={false}
    centeredSlides={true}
    hashNavigation={{watchState: true}}
    slidesPerView="auto"
  >
    <img
      data-swiper-parallax="-23%"
      slot="container-start"
      src="/processed/areas/japan-1920.webp"
      alt="background"
    />
    {#each carSlides as { car, carIndex, groupName }}
      <SwiperSlide data-hash={car.name.replace(/\s/g, "-")} is-title={carIndex === 0}>
        {#if carIndex === 0}
          <h1>{groupName}</h1>
        {/if}
        <Car {car} />
      </SwiperSlide>
    {/each}
  </Swiper>
</div>

<style lang="scss">
  .fake-h1,
  h1 {
    text-transform: lowercase;
    margin-left: 32px;
    margin-bottom: 32px;
    width: fit-content;
    height: 68px;
    will-change: transform;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 130%;
    height: 100%;

    will-change: transform;

    object-fit: cover;
  }

  .swiper-container {
    display: flex;
    height: 100%;

    --swiper-navigation-color: #fff;

    :global(.swiper-slide) {
      padding-top: 120px;
      width: calc(256px + 2 * 8px);
      height: 100%;
    }

    :global(.swiper-slide[is-title="true"]) {
      margin-left: 32px;
    }

    :global(.swiper-button-next),
    :global(.swiper-button-prev) {
      // top: 275px;
    }

    h1 {
      position: absolute;
      top: 16px;
      width: 256px;
    }

    @media (hover: none) {
      --swiper-navigation-size: 0;
    }
  }
</style>
