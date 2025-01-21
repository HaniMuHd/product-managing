<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
	import { page } from '$app/stores';

	const pageUrl = $derived($page.url.pathname);
</script>

<div class="fixed w-full z-50">
	<Navbar
		let:hidden
		let:toggle
		color="none"
		class="px-4 sm:px-6 lg:px-8 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b
		border-gray-200/20 dark:border-gray-700/30">
		<NavBrand href="/">
			<span
				class="self-center whitespace-nowrap text-xl font-semibold bg-gradient-to-r from-blue-600
				to-violet-600 bg-clip-text text-transparent">
				Product Manager
			</span>
		</NavBrand>
		<NavHamburger on:click={toggle} class="hover:bg-gray-100/50 dark:hover:bg-gray-700/50" />
		<NavUl {hidden}>
			<NavLi
				href="/"
				class="text-lg font-medium transition-all duration-300 hover:text-blue-600
				dark:hover:text-blue-400 hover:scale-105 {pageUrl === '/' ? 'text-blue-600 dark:text-blue-400' : ''}">
				Home
			</NavLi>
			<NavLi
				href="/products"
				class="text-lg font-medium transition-all duration-300 hover:text-blue-600
				dark:hover:text-blue-400 hover:scale-105 {pageUrl === '/products' ? 'text-blue-600 dark:text-blue-400' : ''}">
				Products
			</NavLi>
			<NavLi
				href="/about"
				class="text-lg font-medium transition-all duration-300 hover:text-blue-600
				dark:hover:text-blue-400 hover:scale-105 {pageUrl === '/about' ? 'text-blue-600 dark:text-blue-400' : ''}">
				About
			</NavLi>
			<NavLi>
				<DarkMode
					class="hover:bg-gray-100/50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors
					duration-200" />
			</NavLi>
		</NavUl>
	</Navbar>
</div>
