<script lang="ts">
  import { Label, Input, Button } from 'flowbite-svelte';
  import type { PageData } from './$types'
	export let data: PageData;
</script>

<div>
  <form method="POST">
    <div class="flex flex-col md:flex-row items-center justify-center">
      <div class="mb-6 p-4 min-w-52">
        <Label for="name-input" class="block mb-2">Name</Label>
        <Input name="name" value={data.user.name} id="name-input" type="text"/>
      </div>
      <div class="mb-6 p-4 min-w-52">
        <Label for="password-input" class="block mb-2">Password</Label>
        <Input name="password" id="password-input" type="password" placeholder="Empty for same PW" />
      </div>
      <Button outline color="green" class="bg-white" type="submit">Update User</Button>
    </div>
  </form>
</div>
