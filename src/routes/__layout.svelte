<script>
  import "../lib/style/font.scss"
</script>

<main>
  <slot />
</main>

<style lang="scss" global>
  //noinspection CssInvalidAtRule
  @layer base {
    html {
      -webkit-tap-highlight-color: transparent;
    }
  }

  body {
    margin: 0;
    padding: 0;
  }

  main {
    display: flex;
    flex-direction: column;

    overflow: hidden;
    height: 100vh;

    color: white;
  }
</style>
