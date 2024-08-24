<script lang="ts">
  import { Label, Input, Button } from 'flowbite-svelte';
  import type { PageData } from './$types'
	export let data: PageData;
</script>

<form method="POST">
  <div class="flex flex-row items-center justify-center p-4">
    <div class="mb-6 p-4 min-w-52">
      <Label for="count-input" class="block mb-2">Count</Label>
      <Input name="count" value={data.clicker.clickers.count} id="count-input" type="number" placeholder={data.clicker.clickers.count} />
    </div>
    <Button outline color="green" class="bg-white" type="submit">Update Clicker</Button>
  </div>
</form>
