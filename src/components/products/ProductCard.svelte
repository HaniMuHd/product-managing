<script lang="ts">
	import { VITE_API_URL } from '$env/static/public';
	import type { Product } from '$lib/api/admin/models/Product';
	import { Card, Img } from 'flowbite-svelte';

	let { product } = $props<{ product: Product }>();
</script>

<style>
	:global(.product-card) {
		transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
	}

	:global(.product-card:hover) {
		transform: translateY(-4px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
	}
</style>

<Card padding="sm" class="h-full product-card">
	<Img
		src="{VITE_API_URL}/{product.image}"
		alt={product.name}
		class="h-48 w-full rounded-t-lg object-cover" />
	<h3 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h3>
	<p class="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
	<p class="mb-3 line-clamp-2 text-sm font-normal text-gray-700 dark:text-gray-400">
		{product.description}
	</p>
	<p class="text-xl font-bold text-blue-600 dark:text-blue-500">
		{Intl.NumberFormat('en-US', { style: 'currency', currency: 'IQD' }).format(product.price)}
	</p>
</Card>
