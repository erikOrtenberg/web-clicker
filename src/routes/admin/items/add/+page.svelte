<script lang="ts">
  import { Label, Input, Button } from 'flowbite-svelte';
</script>

<div>
  <form method="POST">
    <div class="flex flex-row items-center justify-center p-8">
      <div class="mb-6 p-4">
        <Label for="name-input" class="block mb-2">Name</Label>
        <Input name="name" id="name-input" type="text" placeholder="Cookie" />
      </div>
      <div class="mb-6 p-4">
        <Label for="price-input" class="block mb-2">Price?</Label>
        <Input name="price" id="price-input" type="number" placeholder="10" />
      </div>
      <div class="mb-6 p-4">
        <Label for="comment-input" class="block mb-2">Comment?</Label>
        <Input name="comment" id="comment-input" type="text" placeholder="Cool comment"} />
      </div>

      <Button outline color="green" type="submit">Add Item</Button>
    </div>
  </form>
</div>
