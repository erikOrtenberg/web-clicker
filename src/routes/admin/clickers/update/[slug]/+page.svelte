<script lang="ts">
  import { Label, Input, Button } from 'flowbite-svelte';
  import type { PageData } from './$types'
	export let data: PageData;
</script>

<div>
  <form method="POST" class="flex flex-col items-center justify-center p-4">
    <div class="p-4">
      Editing clicker id {data.clicker.clickers.id} for user {data.clicker.users.name} for item {data.clicker.items.name}
    </div>
    <div class="flex flex-row items-center justify-center p-4">
      <div class="mb-6 p-4">
        <Label for="count-input" class="block mb-2">Count</Label>
        <Input name="count" id="count-input" type="number" placeholder={data.clicker.clickers.count} />
      </div>
      <Button outline color="green" type="submit">Update Clicker</Button>
    </div>
  </form>
</div>
