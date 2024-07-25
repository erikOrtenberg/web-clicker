<script>
  import "../app.css";
  import logo from "$lib/assets/logo.png"
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  const slideParams = { delay: 0, duration: 500};
</script>

<Navbar class="bg-orange-500">
  <NavBrand href="/">
    <img src={logo} class="h-20" alt="Logo" />
    <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Web Clicker</span>
  </NavBrand>
  <NavHamburger  />
  <NavUl slideParams={slideParams}>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/clickers">Clickers</NavLi>
    <NavLi href="/login">Login</NavLi>
  </NavUl>
</Navbar>

<slot />

<div class="flex flex-row h-20 w-full fixed bottom-0 bg-orange-500 justify-center justify-around content-center items-center">
  <div class="rounded px-3 py-2 bg-gray-600">
    <a class="text-white">Made with ❤️ </a>
    <a href="https://www.github.com" class="text-white"> Github Link</a>
  </div>
</div>
