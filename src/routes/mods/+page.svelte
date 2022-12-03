<script>
  import Mod from "./Mod.svelte"

  export let data
</script>

<section class="about">
  <p>
    This section is curated by me through the help of GitHub. For your mod to appear here, it has to have the
    topics <em>aor</em> and <em>mod</em> set, as well as a top-level <em>info.json</em> that should include
    the properties
    <em>DisplayName</em>, <em>Description</em> and <em>PreviewImage</em>. After that, contact me.
    <a target="_blank" class="discord" href="https://discord.gg/Sx3e7qGTh9"
      ><img height="12" src="/discord-logo-white.svg" /></a
    >
  </p>
</section>

<section class="mods">
  {#each data.items as result}
    <Mod {result} />
  {/each}
</section>

<img class="background" src="/processed/areas/germany-1920.webp" />

<style lang="scss">
  .about {
    background: rgba(0, 7, 20, 0.9);
    padding-inline: 12px;
  }

  .mods {
    display: grid;
    padding: 12px;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  .background {
    position: fixed;
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  em {
    font-family: monospace;
  }
</style>
