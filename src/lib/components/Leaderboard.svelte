<script lang="ts">
  import {fade} from "svelte/transition"
  import {platformNameByID} from "../leaderboard/data/platform"
  import {formatTime} from "../leaderboard/time-formatter"
  import {flagCodes} from "../leaderboard/flag-codes"
  import {makeUrl} from "../leaderboard/leaderboard"
  import {leaderboardFilters} from "../leaderboard/data/filter"
  import {cars} from "../leaderboard/data/cars"
  import {getCarById} from "../leaderboard/data/cars.js"

  export let platform: number
  export let weather: string
  export let direction: string
  export let group: string
  export let area: string
  export let stage: number

  $: leaderboard = fetch(
    makeUrl({platform, weather, direction, group, area, stage, filter: leaderboardFilters.Top}),
  ).then(response => response.json())
</script>

<div class="transition-container">
  {#await leaderboard then leaderboard}
    <table transition:fade>
      {#each leaderboard.leaderboard as entry}
        <tr>
          <th>{entry.rank}</th>
          <td>{entry.userName || entry.platformUserName}</td>
          <td class="time">{formatTime(entry.score)}</td>
          <td
            ><a href="/cars#{getCarById(group, entry.carID).name.replace(/\s/g, '-')}"
              >{getCarById(group, entry.carID).name}</a
            ></td
          >
          <td
            ><img
              class="flag-img"
              src="/flags/4x3/{flagCodes[entry.country].toLowerCase()}.svg"
              alt={flagCodes[entry.country]}
            /></td
          >
          <td
            ><img
              src="/platforms/{platformNameByID[entry.platformID]}.svg"
              alt={platformNameByID[entry.platformID]}
            /></td
          >
        </tr>
      {/each}
    </table>
  {:catch error}
    <p>Error: {error}</p>
  {/await}
</div>

<style lang="scss">
  p,
  table {
    width: 100%;
    margin-top: 4px;

    border-radius: 8px;

    padding: 4px;
  }

  a {
    color: white;
    text-decoration-color: #e0e0e0;
  }

  .transition-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    > * {
      grid-column: 1;
      grid-row: 1;
    }
  }

  .time {
    font-weight: bold;
  }

  td {
    max-width: min(100px, 15vw);
    padding: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    width: 24px;
    aspect-ratio: 1;
    object-fit: contain;
  }
</style>
