<script lang="ts">
  import {SETUP} from "../../lib/leaderboard/config-file"
  import GroupRow from "$lib/components/GroupRow.svelte"
</script>

<img src="/processed/areas/japan-1920.webp" alt="background" />

<table>
  <caption>
    <fieldset>
      <legend>Settings</legend>
      <input type="checkbox" name="show-parity" id="checkbox-show-parity" checked />
      <label for="checkbox-show-parity">Show equal stats</label>
      <input type="checkbox" name="greyed-out-hover" id="checkbox-greyed-out-hover" />
      <label for="checkbox-greyed-out-hover">Highlight Hovered Rows</label>
    </fieldset>
  </caption>
  <thead>
    <tr>
      <th />
      {#each SETUP as [group]}
        <th>{group}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each SETUP[0][1] as [statGroupTitle, stats]}
      <tr>
        <th colspan={SETUP.length + 1} class="group-separator">{statGroupTitle}</th>
      </tr>
      {#each stats as [key]}
        <GroupRow {SETUP} {statGroupTitle} {key} />
      {/each}
    {/each}
  </tbody>
</table>

<style lang="scss">
  fieldset {
    margin: auto;
  }

  th.group-separator {
    background: black;
    color: white;
  }

  table {
    backdrop-filter: blur(8px);
    margin-inline: auto;
  }

  table :global(th:not(.group-separator)) {
    background: rgba(0, 0, 0, 0.4);
    color: white;
  }

  table :global(th),
  table :global(td),
  table,
  fieldset {
    border: 1px solid black;
    border-collapse: collapse;
  }

  fieldset {
    border-bottom: none;
  }

  table :global(td),
  table :global(th) {
    padding-block: 2px;
    padding-inline: 6px;
  }

  thead {
    position: sticky;
    top: 0;
  }

  caption:has(input[name="show-parity"]:not(:checked)) ~ tbody :global(.parity) {
    display: none;
  }

  caption:has(input[name="greyed-out-hover"]:checked) ~ tbody :global(tr:not(:hover)) {
    filter: contrast(0.5);
  }

  img {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
</style>
