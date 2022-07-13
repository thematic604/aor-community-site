<script>
  import "../lib/style/font.scss"
</script>

<nav class="title">
  <h1>leaderboard</h1>
</nav>

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

  nav {
    color: white;
    padding: 8px;
    padding-inline: 16px;
    background: #000714;

    h1 {
      font-size: 24px;
    }
  }

  body {
    margin: 0;
    padding: 0;
  }

  main {
    display: flex;
    flex-direction: column;

    // overflow: hidden;
    height: 100vh;

    color: white;
  }
</style>
