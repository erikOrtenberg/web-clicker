<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
</script>
<div class="bg-white rounded-xl p-2 overflow-auto">
  <Table striped={true} >
    <TableHead>
      <TableHeadCell>For User</TableHeadCell>
      <TableHeadCell>With Item</TableHeadCell>
      <TableHeadCell>Default Click Value</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Edit</span>
      </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each data.clickers as clicker}
        <TableBodyRow>
          <TableBodyCell>{clicker.users.name}</TableBodyCell>
          <TableBodyCell>{clicker.items.name}</TableBodyCell>
          <TableBodyCell>{clicker.clickers.click_number}</TableBodyCell>
          <TableBodyCell>
            <a href={"/admin/clickers/update/" + clicker.clickers.id} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>
<div class="p-4"/>
<form method="POST">
  <Button outline color="green" class="bg-white" type="submit">Generate all missing Clickers</Button>
</form>
