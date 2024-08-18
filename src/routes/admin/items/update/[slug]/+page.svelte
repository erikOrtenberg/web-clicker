<script lang="ts">
  import { Label, Input, Button } from 'flowbite-svelte';
  import type { PageData } from './$types'
	export let data: PageData;
</script>

<div>
  <form method="POST" class="flex flex-col items-center justify-center p-4">
    <div class="p-4">
      Editing item {data.item.name} with item id {data.item.id}
    </div>
    <div class="flex flex-row items-center justify-center p-4">
      <div class="mb-6 p-4">
        <Label for="name-input" class="block mb-2">Name</Label>
        <Input name="name" id="name-input" type="text" placeholder={data.item.name} />
      </div>
      <div class="mb-6 p-4">
        <Label for="price-input" class="block mb-2">Price?</Label>
        <Input name="price" id="price-input" type="number" placeholder={data.item.price ? data.item.price : 10} />
      </div>
      <div class="mb-6 p-4">
        <Label for="comment-input" class="block mb-2">Comment?</Label>
        <Input name="comment" id="comment-input" type="text" placeholder={data.item.comment ? data.item.comment : "..."} />
      </div>
      <Button outline color="green" type="submit">Update Item</Button>
    </div>
  </form>
</div>
