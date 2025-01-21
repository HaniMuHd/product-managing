<script lang="ts">
	import ProductCard from './ProductCard.svelte';
	import { Button, Modal, Label, Input, Textarea, Dropzone } from 'flowbite-svelte';
	import { ProductService } from '$lib/api/admin/services/ProductService';
	import { products } from '$lib/stores/Products';

	let showModal = $state(false);
	let formData = $state({
		Name: '',
		Category: '',
		Image: undefined as Blob | undefined,
		Price: '',
		Description: ''
	});

	async function handleSubmit() {
		try {
			const data = await ProductService.postApiProduct({ formData });
			showModal = false;
			// Reset form
			formData = {
				Name: '',
				Category: '',
				Image: undefined,
				Price: '',
				Description: ''
			};
			// You might want to refresh the products list here
			products.update((products) => [...products, data]);
		} catch (error) {
			console.error('Error creating product:', error);
		}
	}

	function handleFileChange(e: Event) {
		const files = (e.target as HTMLInputElement).files;
		if (files?.[0]) {
			formData.Image = files[0];
		}
	}
</script>

<style>
	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 2rem;
		padding: 1rem;
	}
</style>

<div class="flex justify-between items-center mb-6 px-4">
	<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Products</h2>
	<Button color="blue" onclick={() => (showModal = true)}>Create Product</Button>
</div>

<div class="product-grid">
	{#each $products as product (product.id)}
		<ProductCard {product} />
	{/each}
</div>

<Modal bind:open={showModal} size="lg">
	<form
		class="space-y-6"
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
			showModal = false;
		}}>
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Create New Product</h3>

		<div>
			<Label for="name" class="mb-2">Name</Label>
			<Input id="name" required bind:value={formData.Name} />
		</div>

		<div>
			<Label for="category" class="mb-2">Category</Label>
			<Input id="category" required bind:value={formData.Category} />
		</div>

		<div>
			<Label for="price" class="mb-2">Price</Label>
			<Input id="price" type="number" step="0.01" required bind:value={formData.Price} />
		</div>

		<div>
			<Label for="description" class="mb-2">Description</Label>
			<Textarea id="description" rows={4} required bind:value={formData.Description} />
		</div>

		<div>
			<Label class="mb-2">Product Image</Label>
			<Dropzone on:change={handleFileChange} accept="image/*" />
		</div>

		<div class="flex justify-end space-x-4">
			<Button color="alternative" onclick={() => (showModal = false)}>Cancel</Button>
			<Button type="submit" color="blue">Create Product</Button>
		</div>
	</form>
</Modal>
