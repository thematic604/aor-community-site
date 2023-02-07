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
    height: 100%;
    padding-inline: 8px;

    > h2 {
      margin-block: 16px;
      margin-inline: 16px;
      font-size: 56px;
      text-transform: lowercase;
    }

    > :global(img.parallax-background) {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      object-fit: cover;
      object-position: center;
      filter: brightness(0.7);
    }
  }
</style>
