<script context="module" lang="ts">
  import type {Load} from "./__types/[...leaderboardUrl]"
  import {LEADERBOARD_BASE_HREF} from "../../lib/leaderboard/leaderboard"

  export const load: Load = async ({params, fetch}) => {
    const url = `${LEADERBOARD_BASE_HREF}/leaderboard/${params.leaderboardUrl}`
    console.log(url)
    const response = await fetch(url, {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return {
      status: response.status,
      props: {
        leaderboard: response.ok && (await response.json()),
      },
    }
  }
</script>

<script lang="ts">
  import type {LeaderboardResponse} from "../../lib/leaderboard/leaderboard"
  import {platformNameByID} from "../../lib/leaderboard/data/platform"
  import {formatTime} from "../../lib/leaderboard/time-formatter"
  import {flagCodes} from "../../lib/leaderboard/flag-codes"

  export let leaderboard: LeaderboardResponse
</script>

<table>
  {#each leaderboard.leaderboard as entry}
    <tr>
      <td>{entry.rank}</td>
      <td><abbr title={entry.userID}>{entry.userName || entry.platformUserName}</abbr></td>
      <td>{formatTime(entry.score)}</td>
      <td>{platformNameByID[entry.platformID]}</td>
      <td>CarID: {entry.carID}</td>
      <td
        ><img
          class="flag-img"
          src="/flags/4x3/{flagCodes[entry.country].toLowerCase()}.svg"
          alt={flagCodes[entry.country]}
        /></td
      >
      <td><abbr title={entry.replayData}>Replay</abbr></td>
      <td><abbr title={entry.uniqueID}>UUID</abbr></td>
    </tr>
  {/each}
</table>

<style>
  table {
    color: black;
  }

  img {
    width: 32px;
    aspect-ratio: 1;
  }
</style>
