<script lang="ts">
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

  let rows = [
    { name: "You", returns: 115, moral: 87 },
    { name: "John", returns: 220, moral: 16 },
    { name: "Lena", returns: 160, moral: 70 },
  ]
</script>

<div class="pb-20">
  <h5 class="mb-5 text-5xl">Leaderboard</h5>
  <Table striped={true}>
    <TableHead>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Returns</TableHeadCell>
      <TableHeadCell>Moral</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each rows as row}
      <TableBodyRow>
        <TableBodyCell>{row.name}</TableBodyCell>
        <TableBodyCell>{row.returns}%</TableBodyCell>
        <TableBodyCell>{row.moral}%</TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>
