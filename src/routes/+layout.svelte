<script lang="ts">
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
	<Navbar />
	<main class="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="w-full h-full rounded-lg bg-white dark:bg-slate-800 shadow-sm">
			{@render children()}
		</div>
	</main>
	<Footer />
</div>
