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
    font-size: 32px;
    height: fit-content;
    margin-top: 0;
  }

  th {
    text-align: left;
  }
  td {
    text-align: right;
    white-space: nowrap;
    overflow: visible;
  }

  section {
    text-transform: lowercase;

    width: 256px;
    height: 320px;

    padding: 16px;
    border-radius: 8px;
    box-sizing: border-box;

    backdrop-filter: brightness(0.5);

    transition: all 0.2s ease-in-out;

    display: grid;
    place-items: center;
    grid-template-rows: 1fr auto;

    will-change: filter;
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
    width: 32px;
    aspect-ratio: 1;
    object-fit: contain;
  }
</style>
