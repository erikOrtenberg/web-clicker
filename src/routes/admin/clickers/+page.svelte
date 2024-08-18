<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
</script>
<div class="flex flex-row justify-center items-center">
  <Table striped={true} >
    <TableHead>
      <TableHeadCell>For User</TableHeadCell>
      <TableHeadCell>With Item</TableHeadCell>
      <TableHeadCell>Count</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Edit</span>
      </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each data.clickers as clicker}
        <TableBodyRow>
          <TableBodyCell>{clicker.users.name}</TableBodyCell>
          <TableBodyCell>{clicker.items.name}</TableBodyCell>
          <TableBodyCell>{clicker.clickers.count}</TableBodyCell>
          <TableBodyCell>
            <a href={"/admin/clickers/update/" + clicker.clickers.id} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  <div class="p-4"/>
  <form method="POST">
    <Button outline color="green" type="submit">Generate all missing Clickers</Button>
  </form>
</div>
