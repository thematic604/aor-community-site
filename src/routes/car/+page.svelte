<script lang="ts">
  import {cars} from "$lib/leaderboard/data/cars"
  import {Swiper, SwiperSlide} from "swiper/svelte"

  import "swiper/css"
  import Car from "$lib/components/Car.svelte"
  import {groupNames} from "$lib/leaderboard/data/stage/group"
  import {Controller, HashNavigation, Navigation, Parallax} from "swiper"

  let controlledSwiper = null

  const setControlledSwiper = e => {
    const [swiper] = e.detail
    // set Controller swiper instance
    setTimeout(() => {
      controlledSwiper = swiper
    })
  }

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
  <img data-swiper-parallax="-23%" src="/processed/areas/japan-1920.webp" alt="background" />
  <Swiper modules={[Controller]} on:swiper={setControlledSwiper} slidesPerView="auto">
    {#each carSlides as { car, carIndex, groupName }}
      <SwiperSlide no-content={carIndex !== 0}>
        {#if carIndex === 0}
          <h1>{groupName}</h1>
        {/if}
      </SwiperSlide>
    {/each}
  </Swiper>
  <Swiper
    modules={[Parallax, Navigation, HashNavigation, Controller]}
    navigation={true}
    parallax={false}
    centeredSlides={true}
    hashNavigation={{watchState: true}}
    controller={{control: controlledSwiper}}
    slidesPerView="auto"
  >
    {#each carSlides as { car, carIndex, groupName }}
      <SwiperSlide data-hash={car.name.replace(/\s/g, "-")}>
        {#if carIndex === 0}
          <!--<h1>{groupName}</h1>-->
        {/if}
        <Car {car} />
      </SwiperSlide>
    {/each}
  </Swiper>
</div>

<style lang="scss">
  h1 {
    will-change: transform;

    width: fit-content;
    height: 68px;
    margin-bottom: 32px;
    margin-left: 32px;

    text-transform: lowercase;
  }

  img {
    will-change: transform;

    position: absolute;
    top: 0;
    left: 0;

    width: 130%;
    height: 100%;

    object-fit: cover;
  }

  .swiper-container {
    --swiper-navigation-color: #fff;

    position: relative;
    height: 100%;

    :global(.swiper-slide) {
      width: calc(256px + 2 * 8px);
      height: 100%;
      padding-top: 120px;
    }

    :global(.swiper-slide[no-content="true"]) {
      width: 20px;
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
