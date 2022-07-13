<script lang="ts">
  import Image from "./Image.svelte"
  import type {Area} from "../leaderboard/data/stage/area"
  import StageSelector from "./StageSelector.svelte"

  export let area: Area

  export let stage: number
</script>

<section class="content">
  <h2 data-swiper-parallax="-50%">{area.name}</h2>
  <StageSelector {area} bind:stage />

  <Image
    class="parallax-background"
    data-swiper-parallax="23%"
    src="areas/{area.image}"
    alt={area.name}
    sizes={[2560, 1920, 1280, 960, 640, 480, 320]}
  />
</section>

<style lang="scss">
  .content {
    padding-inline: 8px;
    height: 100%;

    > h2 {
      text-transform: lowercase;
      font-size: 56px;
      margin-inline: 16px;
      margin-block: 16px;
    }

    > :global(img.parallax-background) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: brightness(0.7);
      object-position: center;
      object-fit: cover;
      z-index: -1;
    }
  }
</style>
