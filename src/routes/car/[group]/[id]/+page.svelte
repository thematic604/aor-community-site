<script context="module">
  import {getCarById} from "../../../../lib/leaderboard/data/cars"

  export const load = ({params}) => {
    return {
      props: {
        car: getCarById(params.group, Number(params.id)),
      },
    }
  }
</script>

<script lang="ts">
  import type {Car} from "../../../../lib/leaderboard/data/cars"
  import {carCountries} from "../../../../lib/leaderboard/data/cars.js"

  export let car: Car
</script>

<h1>{car.name}</h1>

<table>
  <tr>
    <th>Engine</th>
    <td>{car.carStats.Engine}</td>
  </tr>
  <tr>
    <th>Gears</th>
    <td>{car.carStats.Gears}</td>
  </tr>
  <tr>
    <th>Transmission</th>
    <td>{car.carStats.Transmission}</td>
  </tr>
  <tr>
    <th>Aspiration</th>
    <td>{car.carStats.Aspiration}</td>
  </tr>
  <tr>
    <th>Country</th>
    <td>
      <img
        src="/flags/4x3/{carCountries[car.carStats.Country]}.svg"
        alt={car.carStats.Country.replace("_", " ")}
      /></td
    >
  </tr>
</table>

<style>
  * {
    color: black;
    text-transform: lowercase;
  }

  img {
    width: 32px;
    aspect-ratio: 1;
  }
</style>
