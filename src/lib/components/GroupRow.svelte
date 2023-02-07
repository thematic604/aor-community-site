<script>
  export let statGroupTitle
  export let key
  export let SETUP

  $: groupValues = SETUP.map(
    ([, group]) => group.find(([it]) => it === statGroupTitle)[1].find(([it]) => it === key)[1],
  )
  $: parity = groupValues.every(it => it === groupValues[0])

  $: numeric = Number.isNaN(Number(groupValues[0]))
    ? groupValues.map(it => Number(it?.trim() === "True"))
    : groupValues.map(Number)
  $: min = numeric ? Math.min(...numeric) : undefined
  $: max = numeric ? Math.max(...numeric) : undefined

  $: percentages = numeric ? numeric.map(it => (it - min) / (max - min)) : undefined
</script>

<tr class:parity>
  <th>{key}</th>
  {#if parity}
    <td class="no-border" colspan="2">{groupValues[0] || "?"}</td>
    <td class="no-border" colSpan={SETUP.length - 2} />
  {:else}
    {#each groupValues as groupValue, i}
      <td style="background: hsl({120 * percentages[i]}deg 60% 50% / 80%)">{groupValue || "?"}</td>
    {/each}
  {/if}
</tr>

<style lang="scss">
  td {
    font-weight: bold;
    color: white;
    text-align: center;
    text-shadow: 0 0 3px black;
  }

  .no-border {
    border-inline: none;
  }
</style>
