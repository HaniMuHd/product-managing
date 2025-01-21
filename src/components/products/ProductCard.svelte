<script lang="ts">
	import type { Product } from '$lib/api/admin/models/Product';
	import { Card } from 'flowbite-svelte';

	let { product } = $props<{ product: Product }>();
</script>

<Card padding="sm" class="h-full">
	<img src={product.image} alt={product.name} class="h-48 w-full rounded-t-lg object-cover" />
	<h3 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h3>
	<p class="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
	<p class="mb-3 line-clamp-2 text-sm font-normal text-gray-700 dark:text-gray-400">
		{product.description}
	</p>
	<p class="text-xl font-bold text-blue-600 dark:text-blue-500">${product.price}</p>
</Card>
