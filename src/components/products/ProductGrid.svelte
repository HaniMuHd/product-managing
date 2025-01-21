<script lang="ts">
	import type { Product } from '$lib/api/admin/models/Product';
	import ProductCard from './ProductCard.svelte';

	let { products } = $props<{ products: Product[] }>();
</script>

<style>
	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 2rem;
		padding: 1rem;
	}
</style>

<div class="product-grid">
	{#each products as product (product.id)}
		<ProductCard {product} />
	{/each}
</div>
