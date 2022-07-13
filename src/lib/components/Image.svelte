<script lang="ts">
  export let alt: string
  export let src: string
  export let sizes: string[]

  function makePath(size: string) {
    return `/processed/${src}-${size}.webp`
  }
</script>

<img
  src={makePath(sizes[0])}
  srcset={sizes.map(size => `${makePath(size)} ${size}w`).join(", ")}
  {alt}
  {...$$props}
/>
