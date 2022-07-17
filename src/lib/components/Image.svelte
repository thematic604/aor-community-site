<script lang="ts">
  export let alt: string
  export let src: string
  export let sizes: string[] = []

  $: paths = sizes.map(size => ({size, src: `/processed/${src}-${size}.webp`}))
</script>

<img
  src={paths[0].src}
  srcset={paths.map(({size, src}) => `${src} ${size}w`).join(", ")}
  {alt}
  {...$$restProps}
/>
