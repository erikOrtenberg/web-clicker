<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
    import { Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
</script>
<div class="flex flex-row justify-center items-center">
  <Table striped={true} >
    <TableHead>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Role</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Edit</span>
      </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each data.users as user}
        <TableBodyRow>
          <TableBodyCell>{user.name}</TableBodyCell>
          <TableBodyCell>{#if user.id == 1}
              Admin
            {:else}
              User
            {/if}
          </TableBodyCell>
          <TableBodyCell>
            <a href={"/admin/users/update/" + user.id} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
  <div class="p-4"/>
  <Button outline color="green" href=/admin/users/add>Go To User Creation Form</Button>
</div>
