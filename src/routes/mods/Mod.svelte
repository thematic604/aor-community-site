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
      transform: translateY(0px);
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
    border-radius: 16px;
    padding-inline: 16px;
    background: rgba(255, 255, 255, 0.2);
    transition: background 200ms ease;
    color: white;
    text-decoration: unset;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .card {
    display: flex;
    flex-direction: column;
    aspect-ratio: 1;
    height: 100%;
    color: white;
    padding: 32px;
    border-radius: 48px;
    text-decoration: unset;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.6);
    background-blend-mode: darken;
    background-position: bottom center;
    background-size: cover;

    transition: background-color 200ms ease;

    &.has-background {
      background-color: rgba(0, 0, 0, 0.2);

      > h2 {
        text-shadow: 0 0 24px black;
      }
    }
  }

  h2 {
    margin-block: 16px;
    margin-block-start: -8px;
    transition: transform 200ms ease;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-inline: -32px;
    margin-block-end: -32px;
    padding-block-end: 32px;
    padding-inline: 32px;
    padding-block-start: 16px;
    border-radius: 48px;
    margin-top: auto;
    transition: background 200ms ease;
    cursor: default;
    backdrop-filter: blur(10px) saturate(2) contrast(0.8);

    background: rgba(0, 0, 0, 0.5);
  }

  .card:hover:not(:has(.content:hover)) {
    &.has-background {
      background-color: rgba(255, 255, 255, 0);

      > h2 {
        transform: translateY(-150%);
      }
    }

    background-color: rgba(0, 0, 0, 0.3);
  }

  .info {
    display: flex;
    gap: 8px;
  }

  .owner {
    display: flex;
    padding-inline-start: 0;
    gap: 8px;

    > div {
      height: 32px;
      background-size: cover;
      background-position: center;
      aspect-ratio: 1;
      border-radius: 16px;
    }
  }
</style>
