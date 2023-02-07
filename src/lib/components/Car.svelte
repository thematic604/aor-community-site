<script lang="ts">
  import type {Car} from "../leaderboard/data/cars"
  import {carCountries} from "../leaderboard/data/cars"

  export let car: Car
</script>

<section>
  <h3>{car.name}</h3>

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
</section>

<style lang="scss">
  h3 {
    height: fit-content;
    margin-top: 0;
    font-size: 32px;
  }

  th {
    text-align: left;
  }

  td {
    overflow: visible;
    text-align: right;
    white-space: nowrap;
  }

  section {
    will-change: filter;

    display: grid;
    grid-template-rows: 1fr auto;
    place-items: center;

    box-sizing: border-box;
    width: 256px;
    height: 320px;
    padding: 16px;

    text-transform: lowercase;

    backdrop-filter: brightness(0.5);
    border-radius: 8px;

    transition: all 0.2s ease-in-out;
  }

  :global(.swiper-slide) > section {
    filter: brightness(0.5);
  }

  :global(.swiper-slide-active) > section {
    filter: brightness(1);
  }

  // table {
  //   display: none;
  // }
  // :global(.swiper-slide-visible) {
  //   table {
  //     display: table;
  //   }
  // }

  img {
    aspect-ratio: 1;
    width: 32px;
    object-fit: contain;
  }
</style>
