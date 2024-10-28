<script lang="ts">
  import { Input } from 'flowbite-svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;

  export async function updateClickNumber(clickerId: number, clickNumber: number, index: number) {
    const formData = new FormData();
      formData.append("clickerId", String(clickerId))
      formData.append("clickNumber", String(clickNumber))
    const response = await fetch("/clickers?/updateClickNumber", {
        method: "POST",
        body: formData
      })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    data.clickers[index].clickNumber = clickNumber;

  }

  export async function inc(clickerId: number, index: number){
    const formData = new FormData();
      formData.append("clickerId", String(clickerId))
    const response = await fetch("/clickers?/inc", {
        method: "POST",
        body: formData
      })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    data.clickers[index].count!++;
  }

  export async function dec(clickerId: number, index: number){
    const formData = new FormData();
      formData.append("clickerId", String(clickerId))
    const response = await fetch("/clickers?/dec", {
        method: "POST",
        body: formData
      })
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    data.clickers[index].count!--;
  }
</script>

<div class="flex flex-col justify-center items-center overflow-auto gap-4">
  {#each data.clickers as clicker, i}
      <div class="flex flex-row rounded-lg outline outline-primary-600 min-w-60 max-w-60 min-h-32 m-4">
        <div class="basis-1/4 rounded-l-lg bg-white outline outline-primary-600">
          <button class="h-full w-full" on:mouseup={() => dec(clicker.clickers.id, i)}>
            <p class="text-4xl">-</p>
          </button>
        </div>
        <div class="basis-2/4 shadow-inner bg-gray-200 outline outline-primary-600 flex justify-center items-center p-4">
          <div class="flex flex-col items-center justify-center">
            <p class="basis-1/4 text-lg dark:text-white">{clicker.items.name}</p>
            <p class="basis-2/4 text-4xl dark:text-white">{clicker.count}</p>
            <div class="basis-1/4 dark:text-white">
              <p class="text-md">Amount:</p> 
              <Input id={"clicker-" + clicker.clickers.id + "-clickNumber"} value={clicker.clickNumber} on:change={(e) => updateClickNumber(e.target.value, i)}/>
            </div>
          </div>
        </div>
        <div class="basis-1/4 rounded-r-lg bg-white outline outline-primary-600">
          <button class="h-full w-full" on:mouseup={() => inc(clicker.clickers.id, i)}>
            <p class="text-4xl">+{clicker.clickNumber}</p>
        </button>
        </div>
      </div>
  {/each}
  
  <div class="flex flex-col max-w-60">
    <div class="flex justify-center items-center">
      <p class="text-center text-4xl text-black bg-white rounded-md outline outline-primary-600 my-2 w-full">Info</p>
    </div>
    {#each data.clickers as clicker}
      <div class="p-2 my-2 rounded-md outline outline-primary-600 bg-gray-200">
        <p>
          {clicker.items.name}
          {clicker.items.price} kr
          <br/>
          {clicker.items.comment}
        </p>
      </div>
    {/each}
  </div>
</div>

