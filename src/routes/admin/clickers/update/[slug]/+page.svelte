<script lang="ts">
  import { Label, Input, Button } from 'flowbite-svelte';
  import type { PageData } from './$types'
	export let data: PageData;
</script>

<form method="POST">
  <div class="flex flex-row items-center justify-center p-4">
    <div class="flex flex-row items-center justify-center mb-6 p-4 min-w-96">
      <div class="p-4">
        <Label for="click_number-input" class="block mb-2">Default Click Value</Label>
        <Input name="click_number" value={data.clicker.clickers.click_number} id="count-input" type="number" placeholder={data.clicker.clickers.click_number} />
      </div>
      <div class="p-4">
        <Label for="click_number-input" class="block mb-2">Add Transaction</Label>
        <Input name="custom_transaction_count" value=0 id="count-input" type="number" placeholder=0 />
      </div>
    </div>
    <Button outline color="green" class="bg-white" type="submit">Update Clicker</Button>
  </div>
</form>
