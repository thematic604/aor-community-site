<script lang="ts">
  export let result: any

  function getReleases() {
    releases = fetch(`https://api.github.com/repos/${result.full_name}/releases`).then(async it => it.json())
  }
  $: backgroundUrl = result.info.PreviewImage
    ? `url("https://raw.githubusercontent.com/${result.full_name}/master/${result.info.PreviewImage}")`
    : undefined
  let releases
  let download

  $: {
    download?.click()
  }
</script>

<a
  href={result.html_url}
  target="_blank"
  class="card"
  class:has-background={backgroundUrl}
  style="background-image: {backgroundUrl}"
>
  <h2>{result.info.DisplayName}</h2>
  <div class="content">
    <p class="description">{result.info.Description || result.description}</p>
    <div class="info">
      {#if releases}
        {#await releases}
          <a class="load" href="https://github.com/{result.full_name}/releases">
            <span>•</span><span>•</span><span>•</span>
          </a>
        {:then releases}
          {#if releases[0] && releases[0].assets[0]}
            <a bind:this={download} href={releases[0].assets[0].browser_download_url} download
              >{releases[0].name}</a
            >
          {/if}
        {/await}
      {:else}
        <a on:click|preventDefault={getReleases}>
          <span>•</span><span>•</span><span>•</span>
        </a>
      {/if}
      <a href={result.owner.html_url} target="_blank" rel="noreferrer" class="owner">
        <div style="background-image: url('{result.owner.avatar_url}')" />
        {result.owner.login}
      </a>
    </div>
  </div>
</a>

<style lang="scss">
  @keyframes load-bump {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-4px);
    }

    75% {
      transform: translateY(0);
    }
  }

  .load > span {
    animation: load-bump 1s ease infinite;

    &:nth-child(2) {
      animation-delay: 0.1s;
    }

    &:nth-child(3) {
      animation-delay: 0.2s;
    }
  }

  a {
    cursor: pointer;
  }

  .info > * {
    display: flex;
    align-items: center;

    height: 32px;
    padding-inline: 16px;

    color: white;
    text-decoration: unset;

    background: rgb(255 255 255 / 20%);
    border-radius: 16px;

    transition: background 200ms ease;

    &:hover {
      background: rgb(255 255 255 / 10%);
    }
  }

  h2 {
    margin-block: 16px;
    margin-block-start: -8px;
    transition: transform 200ms ease;
  }

  .card {
    overflow: hidden;
    display: flex;
    flex-direction: column;

    aspect-ratio: 1;
    height: 100%;
    padding: 32px;

    color: white;
    text-decoration: unset;

    background-color: rgb(0 0 0 / 60%);
    background-position: bottom center;
    background-size: cover;
    background-blend-mode: darken;
    border-radius: 48px;

    transition: background-color 200ms ease;

    &.has-background {
      background-color: rgb(0 0 0 / 20%);

      > h2 {
        text-shadow: 0 0 24px black;
      }
    }
  }

  .content {
    cursor: default;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    margin-top: auto;
    margin-block-end: -32px;
    margin-inline: -32px;
    padding-block-start: 16px;
    padding-block-end: 32px;
    padding-inline: 32px;

    background: rgb(0 0 0 / 50%);
    backdrop-filter: blur(10px) saturate(2) contrast(0.8);
    border-radius: 48px;

    transition: background 200ms ease;
  }

  .card:hover:not(:has(.content:hover)) {
    background-color: rgb(0 0 0 / 30%);

    &.has-background {
      background-color: rgb(255 255 255 / 0%);

      > h2 {
        transform: translateY(-150%);
      }
    }
  }

  .info {
    display: flex;
    gap: 8px;
  }

  .owner {
    display: flex;
    gap: 8px;
    padding-inline-start: 0;

    > div {
      aspect-ratio: 1;
      height: 32px;

      background-position: center;
      background-size: cover;
      border-radius: 16px;
    }
  }
</style>
