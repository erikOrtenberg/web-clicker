<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
</script>
<div class="flex flex-row justify-center items-center">
  <Table striped={true} >
    <TableHead>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Price?</TableHeadCell>
      <TableHeadCell>Comment?</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Edit</span>
      </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each data.items as item}
        <TableBodyRow>
          <TableBodyCell>{item.name}</TableBodyCell>
          <TableBodyCell>{item.price}</TableBodyCell>
          <TableBodyCell>{item.comment}</TableBodyCell>
          <TableBodyCell>
            <a href={"/admin/items/update/" + item.id} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  <div class="p-4"/>
  <Button outline color="green" href=/admin/items/add>Go To Item Creation Form</Button>
</div>
