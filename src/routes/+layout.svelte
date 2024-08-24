<script lang="ts">
  import "../app.css";
  import logo from "$lib/assets/logo.png"
  import { Button, Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem, } from 'flowbite-svelte';
  import { ChevronDownOutline } from 'flowbite-svelte-icons';
  const slideParams = { delay: 0, duration: 500};
  import { page } from '$app/stores';
  $: activeUrl = $page.url.pathname;

	import type { PageData } from './$types';
	export let data: PageData;
</script>
<head>
  <title>Web Clicker</title>
</head>
<div class="flex flex-col items-center bg-gradient-to-bl from-orange-600 to-fuchsia-600 h-max" style="min-height: 92vh">

  <Navbar class="bg-primary-600">
    <NavBrand href="/">
      <img src={logo} class="h-20" alt="Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Web Clicker</span>
    </NavBrand>
    <NavHamburger  />
    <NavUl {activeUrl} slideParams={slideParams}>
      <NavLi href="/">Home</NavLi>
      {#if data.user}
        <NavLi href="/clickers">Clickers</NavLi>
        <NavLi href="/stats">Statistics</NavLi>
        {#if data.user.id === 1}
          <NavLi class="cursor-pointer">
            Admin<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
          </NavLi>
          <Dropdown class="w-44 z-20">
            <DropdownItem href="/admin/clickers">Clickers</DropdownItem>
            <DropdownItem href="/admin/items">Items</DropdownItem>
            <DropdownItem href="/admin/users">Users</DropdownItem>
          </Dropdown>
        {/if}
      {/if}
      {#if !data.user}
        <NavLi href="/login">Login</NavLi>
      {:else}
        <NavLi>Logged in as {data.user.name}</NavLi>
        <NavLi>	
          <form method="POST" action="/?/logout">
            <Button outline color="blue" type="submit" name="logout" value="true" size="xs" on:click> Log out</Button>
  	      </form>
        </NavLi>
      {/if}
    </NavUl>
  </Navbar>
  
  <div class="rounded-xl backdrop-blur-sm bg-white/30 h-min w-min p-5 m-5">
    <slot />
  </div>
  
</div>
<div class="flex flex-row h-20 w-full bg-primary-600 justify-center justify-around content-center items-center">
  <div class="rounded px-3 py-2 bg-gray-600">
    <p class="text-white">Made with ❤️ </p>
    <a href="https://www.github.com" class="text-white"> Github Link</a>
  </div>
</div>
