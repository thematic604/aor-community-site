<script lang="ts">
  import {cars} from "$lib/leaderboard/data/cars"
  import Car from "$lib/components/Car.svelte"
  import {groupNames} from "$lib/leaderboard/data/stage/group"
  import {swiper} from "../../lib/components/swiper"

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
  <swiper-container use:swiper on:swiper={setControlledSwiper} slides-per-view="auto">
    {#each carSlides as { car, carIndex, groupName }}
      <swiper-slide no-content={carIndex !== 0}>
        {#if carIndex === 0}
          <h1>{groupName}</h1>
        {/if}
      </swiper-slide>
    {/each}
  </swiper-container>
  <swiper-container
    use:swiper
    navigation={true}
    parallax={false}
    centered-slides={true}
    hash-navigation={{watchState: true}}
    controller={{control: controlledSwiper}}
    slides-per-view="auto"
  >
    {#each carSlides as { car, carIndex, groupName }}
      <swiper-slide data-hash={car.name.replace(/\s/g, "-")}>
        {#if carIndex === 0}
          <!--<h1>{groupName}</h1>-->
        {/if}
        <Car {car} />
      </swiper-slide>
    {/each}
  </swiper-container>
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

    swiper-slide {
      width: calc(256px + 2 * 8px);
      height: 100%;
      padding-top: 120px;
    }

    swiper-slide[no-content="true"] {
      width: 20px;
    }

    swiper-container::part(button-next),
    swiper-container::part(button-prev) {
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
