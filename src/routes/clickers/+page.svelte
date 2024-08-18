<script lang="ts">
  import { Button } from 'flowbite-svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<div class="flex flex-col justify-center items-center overflow-auto gap-4">
  {#each data.clickers as clicker}
      <div class="flex flex-row  min-w-60 max-w-60 min-h-32 m-4">
        <div class="basis-1/4 bg-red-500 hover:bg-red-700 rounded-l-lg">
          <form method="POST" class="h-full w-full" action="?/dec">
            <button value={clicker.clickers.id} name="clickerId" type="submit" class="h-full w-full">-</button>
          </form>
        </div>
        <div class="basis-2/4 from-green-500 to-red-500 flex justify-center items-center p-4">
          <div class="flex flex-col items-center justify-center">
            <p class="basis-1/4 text-lg dark:text-white">{clicker.items.name}</p>
            <p class="basis-3/4 text-4xl dark:text-white">{clicker.clickers.count}</p>
          </div>
        </div>
        <div class="basis-1/4 bg-green-500 hover:bg-green-700 rounded-r-lg">
          <form method="POST" class="h-full w-full" action="?/inc">
            <button value={clicker.clickers.id} name="clickerId" type="submit" class="h-full w-full">+</button>
          </form>
        </div>
      </div>
        <p>note: {clicker.items.comment} </p>
        <p>price: {clicker.items.price} kr</p>
  {/each}
</div>

