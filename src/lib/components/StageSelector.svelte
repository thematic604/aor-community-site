<script lang="ts">
  import type {Area} from "../leaderboard/data/stage/area"
  import Image from "./Image.svelte"
  import {swiper} from "./swiper"

  export let area: Area
  export let stage = area.stages[0].id
</script>

<div class="container">
  <swiper-container
    use:swiper
    effect="cards"
    grab-cursor={true}
    nested={true}
    on:activeindexchange={swiper => {
      stage = area.stages[swiper.detail[0].activeIndex].id
    }}
    mousewheel
  >
    {#each area.stages as stage}
      <swiper-slide>
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
      </swiper-slide>
    {/each}
  </swiper-container>
</div>

<style lang="scss">
  @import "../style/stage-slide";

  .container {
    width: 240px;
    margin-inline: auto;

    font-size: 24px;
    font-weight: bold;
    color: black;

    > swiper-container > swiper-slide {
      height: $stage-slide-height;
      padding: 8px;
      background-color: white;
    }

    > swiper-container {
      overflow: visible;
    }

    p {
      overflow: hidden;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :global(img) {
      width: 100%;
      height: calc(100% - 40px);
      object-fit: cover;
    }

    :global(img.minimap) {
      position: absolute;
      top: 0;
      left: 0;

      box-sizing: border-box;
      padding: 16px;

      object-fit: contain;
    }
  }
</style>
