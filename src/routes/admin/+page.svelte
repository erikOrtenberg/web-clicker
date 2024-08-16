<script>
  import { Button } from 'flowbite-svelte';
  import { Label, Input } from 'flowbite-svelte';
</script>

<div class="flex">
  <div class="p-4 bg-gray-600">
    <p class="p-4"> Item </p>
    <form method="POST">
      <Label>Name</Label>
      <Input required name="name" type="text" />
      <Label>Price</Label>
      <Input name="price" type="number" />
      <Button type="submit" >Add this</Button>     
    </form>
  </div>
</div>
