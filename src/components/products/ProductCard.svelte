<script lang="ts">
	import { TrashBinSolid } from 'flowbite-svelte-icons';
	import { VITE_API_URL } from '$env/static/public';
	import type { Product } from '$lib/api/admin/models/Product';
	import { Card, Img, Button, Modal } from 'flowbite-svelte';
	import { ProductService } from '$lib/api/admin/services/ProductService';
	import { products } from '$lib/stores/Products';

	let { product } = $props<{ product: Product }>();
	let showDeleteModal = $state(false);

	async function handleDelete() {
		try {
			await ProductService.deleteApiProduct({ id: product.id });
			products.update((products) => products.filter((p) => p.id !== product.id));
			showDeleteModal = false;
		} catch (error) {
			console.error('Failed to delete product:', error);
		}
	}
</script>

<style>
	:global(.product-card) {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		background: white;
		border: 1px solid #e5e7eb;
	}

	:global(.dark .product-card) {
		background: #1f2937;
		border-color: #374151;
	}

	:global(.product-card:hover) {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
	}

	:global(.dark .product-card:hover) {
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
	}

	:global(.delete-btn) {
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
	}

	:global(.product-card:hover .delete-btn) {
		opacity: 1;
	}

	:global(.product-image) {
		transition: transform 0.3s ease-in-out;
	}

	:global(.product-card:hover .product-image) {
		transform: scale(1.05);
	}
</style>

<Card padding="none" class="h-full product-card relative overflow-hidden">
	<Button
		class="absolute right-2 top-2 !p-2 z-10 delete-btn"
		color="red"
		pill={true}
		size="xs"
		on:click={() => (showDeleteModal = true)}>
		<TrashBinSolid class="h-4 w-4" />
	</Button>
	<div class="overflow-hidden">
		<Img
			src="{VITE_API_URL}/{product.image}"
			alt={product.name}
			class="h-56 w-full object-cover product-image" />
	</div>
	<div class="p-4">
		<div class="mb-2 flex items-center justify-between">
			<span
				class="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800
				dark:bg-blue-900 dark:text-blue-300">
				{product.category}
			</span>
		</div>
		<h3 class="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
			{product.name}
		</h3>
		<p class="mb-4 line-clamp-2 text-sm font-normal text-gray-600 dark:text-gray-300">
			{product.description}
		</p>
		<p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
			{Intl.NumberFormat('en-US', { style: 'currency', currency: 'IQD' }).format(product.price)}
		</p>
	</div>
</Card>

<Modal bind:open={showDeleteModal} size="xs" autoclose>
	<div class="text-center">
		<h3 class="mb-4 text-lg font-bold text-gray-900 dark:text-white">Delete Product</h3>
		<p class="mb-6 text-gray-500 dark:text-gray-400">
			Are you sure you want to delete "{product.name}"? This action cannot be undone.
		</p>
		<div class="flex justify-center gap-4">
			<Button color="red" on:click={handleDelete}>Yes, delete</Button>
			<Button color="alternative" on:click={() => (showDeleteModal = false)}>No, cancel</Button>
		</div>
	</div>
</Modal>
