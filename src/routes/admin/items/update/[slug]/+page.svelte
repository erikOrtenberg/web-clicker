<script lang="ts">
  import { Label, Input, Button } from 'flowbite-svelte';
  import type { PageData } from './$types'
	export let data: PageData;
</script>

<div>
  <form method="POST">
    <div class="flex flex-col lg:flex-row items-center justify-center p-4">
      <div class="mb-6 p-4 min-w-52">
        <Label for="name-input" class="block mb-2">Name</Label>
        <Input name="name" value={data.item.name} id="name-input" type="text" placeholder={data.item.name} />
      </div>
      <div class="mb-6 p-4 min-w-52">
        <Label for="price-input" class="block mb-2">Price?</Label>
        <Input name="price" value={data.item.price} id="price-input" type="number" placeholder={data.item.price ? data.item.price : 10} />
      </div>
      <div class="mb-6 p-4 min-w-52">
        <Label for="comment-input" class="block mb-2">Comment?</Label>
        <Input name="comment" value={data.item.comment} id="comment-input" type="text" placeholder={data.item.comment ? data.item.comment : "..."} />
      </div>
      <Button outline color="green" class="bg-white" type="submit">Update Item</Button>
    </div>
  </form>
</div>
