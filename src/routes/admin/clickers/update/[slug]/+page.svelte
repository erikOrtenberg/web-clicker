<script lang="ts">
  import { Label, Input, Button } from 'flowbite-svelte';
  import type { PageData } from './$types'
	export let data: PageData;
</script>

<form method="POST">
  <div class="flex flex-row items-center justify-center p-4">
    <div class="mb-6 p-4 min-w-52">
      <Label for="click_number-input" class="block mb-2">Default Click Value</Label>
      <Input name="click_number" value={data.clicker.clickers.click_number} id="count-input" type="number" placeholder={data.clicker.clickers.click_number} />
    </div>
    <Button outline color="green" class="bg-white" type="submit">Update Clicker</Button>
  </div>
</form>
