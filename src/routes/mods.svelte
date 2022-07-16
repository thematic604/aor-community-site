<script>
  import {Swiper, SwiperSlide} from "swiper/svelte"

  import "swiper/css"

  export let posts
</script>

<section>
  <Swiper direction="vertical" slidesPerView={1}>
    {#each posts as post}
      <SwiperSlide>
        <article style="--bg-url: {post.image ? `url(${post.image})` : 'black'}">
          <h1>{post.title}</h1>
        </article>
      </SwiperSlide>
    {/each}
  </Swiper>
</section>

<style lang="scss">
  section {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  /*
  article {
    transform-style: preserve-3d;
    display: flex;

    height: 100vh;

    align-items: center;
    justify-content: center;

    position: relative;

    clip: rect(0, 100vw, 100vh, 0);
  }

  h1 {
    text-transform: lowercase;
    // backdrop-filter: brightness(0.5);
  }

  article::after {
    content: "";
    position: absolute;
    width: 150%;
    height: 150%;
    top: 0;
    left: 0;
    z-index: -1;

    background: var(--bg-url);
    background-position: center;
    background-size: cover;
  }

  article:nth-child(odd)::after {
    transform: translateZ(-1px);
  }*/
</style>
