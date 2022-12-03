<script lang="ts">
  import "$lib/style/font.scss"
  import {page} from "$app/stores"
</script>

<main>
  <nav class="title">
    <h1>{$page.route.id}</h1>
  </nav>
  <slot />
</main>

<style lang="scss" global>
  //noinspection CssInvalidAtRule
  @layer base {
    html {
      -webkit-tap-highlight-color: transparent;
    }
  }

  @media (hover: hover) {
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(190, 190, 190, 0.3);
      border-radius: 4px;
    }
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  nav {
    color: white;
    padding: 8px;
    padding-inline: 16px;
    background: #000714;

    h1 {
      font-size: 24px;
      text-transform: lowercase;
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
