<script lang="ts">
  import { Label, Input, Button } from 'flowbite-svelte';
  import type { PageData } from './$types'
	export let data: PageData;
</script>

<div>
  <form method="POST" class="flex flex-col items-center justify-center p-4">
    <div class="p-4">
      Editing user {data.user.name} with user id {data.user.id}
    </div>
    <div class="flex flex-row items-center justify-center p-4">
      <div class="mb-6 p-4">
        <Label for="name-input" class="block mb-2">Name</Label>
        <Input name="name" id="name-input" type="text" placeholder={data.user.name} />
      </div>
      <div class="mb-6 p-4">
        <Label for="password-input" class="block mb-2">Password</Label>
        <Input name="password" id="password-input" type="password" placeholder="..." />
      </div>
      <Button outline color="green" type="submit">Update User</Button>
    </div>
  </form>
</div>
