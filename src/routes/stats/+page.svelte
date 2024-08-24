<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
	  import type { PageData } from './$types';
    export let data : PageData
</script>

<div class="flex flex-col justify-center items-center overflow-auto gap-4">
  {#each data.spendings as spend}
      <div class="flex flex-row rounded-lg outline justify-center items-center outline-primary-600 min-w-60 max-w-60 min-h-32 m-4">
        <div class="flex flex-col shadow-inner bg-gray-200 justify-center items-center w-full h-full p-4">
            <p class="basis-1/4 text-lg dark:text-white">{spend.name}</p>
            <p class="basis-1/4 text-lg dark:text-white">Count: {spend.count}</p>
            <p class="basis-2/4 text-4xl dark:text-white">{spend.total} kr</p>
        </div>
      </div>
  {/each}
</div>

