<script lang="ts">
	import ProductGrid from '../components/products/ProductGrid.svelte';
	let { products } = $props();
</script>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
	}
</style>

<main>
	<h1>Our Products</h1>
	<ProductGrid {products} />
</main>
