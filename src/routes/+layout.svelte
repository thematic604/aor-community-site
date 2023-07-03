<script>
  import "$lib/style/font.scss"
</script>

<main>
  <nav class="title">
    <h1><a href="/">AOR Wiki</a></h1>
    <ul>
      <li><a href="/mods">Mods</a></li>
      <li><a href="/leaderboard">Leaderboard</a></li>
    </ul>
  </nav>
  <slot />
</main>

<style lang="scss" global>
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 8px;
    padding-inline: 16px;

    color: white;

    background: #000714;

    a {
      color: white;
      text-decoration: none;
    }

    h1 {
      font-size: 24px;
      text-transform: lowercase;
    }

    ul {
      display: flex;
      gap: 8px;
      list-style: none;
    }
  }

  body {
    margin: 0;
    padding: 0;
    background: black;
  }

  main {
    display: flex;
    flex-direction: column;

    // overflow: hidden;
    height: 100vh;
    color: white;
  }

  @media (hover: hover) {
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgb(190 190 190 / 30%);
      border-radius: 4px;
    }
  } // noinspection CssInvalidAtRule
  @layer base {
    html {
      -webkit-tap-highlight-color: transparent;
    }
  }
</style>
