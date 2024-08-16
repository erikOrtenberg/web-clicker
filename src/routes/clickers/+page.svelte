<script lang="ts">
  import { GradientButton } from 'flowbite-svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<div class="grid grid-cols-1 overflow-auto gap-4">
  {#each data.clickers as clicker}
    <form method="POST" class="p-4">
      <p>price: {clicker.items.price} kr</p>
      <p>current count: {clicker.clickers.count} </p>
      <p>note: {clicker.items.comment} </p>

      <GradientButton value={clicker.clickers.id} name="clickerId" type="submit" color="pinkToOrange">{clicker.items.name}</GradientButton>
    </form>
  {/each}
</div>

