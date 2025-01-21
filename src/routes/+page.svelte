<script lang="ts">
	import { products } from '$lib/stores/Products';
	import ProductGrid from '../components/products/ProductGrid.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	$effect(() => {
		products.set(data.products ?? []);
	});
</script>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 1rem;
	}

</style>

<main >
	<ProductGrid />
</main>
