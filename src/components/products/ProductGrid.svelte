<script lang="ts">
	import ProductCard from './ProductCard.svelte';
	import { Button, Modal, Label, Input, Textarea } from 'flowbite-svelte';
	import { ProductService } from '$lib/api/admin/services/ProductService';
	import { products } from '$lib/stores/Products';

	let showModal = $state(false);
	let imagePreview: string | null = $state(null);
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
			imagePreview = null;
			// You might want to refresh the products list here
			products.update((products) => [...products, data]);
		} catch (error) {
			console.error('Error creating product:', error);
		}
	}

	function handleFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		
		if (file) {
			formData.Image = file;
			const reader = new FileReader();
			reader.onload = (e) => {
				imagePreview = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		} else {
			imagePreview = null;
			formData.Image = undefined;
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

	:global(.modern-modal form) {
		max-width: 600px;
		margin: 0 auto;
	}

	:global(.modern-modal) {
		--tw-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
		--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
		border-radius: 1.5rem;
		background: linear-gradient(to bottom, #ffffff, #f8fafc);
	}

	:global(.modern-input) {
		@apply transition-all duration-200 border-gray-200 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 !important;
	}

	:global(.modern-label) {
		@apply text-gray-700 font-medium mb-1.5 !important;
	}

	:global(.modern-modal .btn-primary) {
		@apply bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 !important;
	}

	:global(.modern-modal .btn-secondary) {
		@apply bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200 transition-all duration-200 !important;
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

<Modal bind:open={showModal} size="lg" class="modern-modal">
	<form
		class="space-y-6"
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
			showModal = false;
		}}>
		<div class="text-center mb-2">
			<h3 class="text-2xl font-semibold text-gray-900">Create New Product</h3>
			<p class="text-gray-500 text-sm mt-1">Fill in the details to add a new product to your store</p>
		</div>

		<div class="grid grid-cols-2 gap-6">
			<div class="space-y-1.5">
				<Label for="name" class="modern-label">Product Name</Label>
				<Input
					id="name"
					required
					bind:value={formData.Name}
					class="modern-input"
					placeholder="e.g., Premium Headphones" />
			</div>

			<div class="space-y-1.5">
				<Label for="category" class="modern-label">Category</Label>
				<Input
					id="category"
					required
					bind:value={formData.Category}
					class="modern-input"
					placeholder="e.g., Electronics" />
			</div>
		</div>

		<div class="grid grid-cols-2 gap-6">
			<div class="space-y-1.5">
				<Label for="price" class="modern-label">Price ($)</Label>
				<Input
					id="price"
					type="text"
					inputmode="numeric"
					pattern="[0-9]*\.?[0-9]*"
					placeholder="0.00"
					required
					bind:value={formData.Price}
					class="modern-input"
					on:input={(e) => {
						if (!e.target) return;
						const input = e.target as HTMLInputElement;
						const newValue = input.value.replace(/[^0-9.]/g, '');
						input.value = newValue.split('.').length > 2 ? newValue.replace(/\.+$/, '') : newValue;
					}} />
			</div>
			<div class="space-y-1.5">
				<Label for="image" class="modern-label">Product Image</Label>
				<div class="mt-1">
					<div class="flex items-center justify-center w-full h-[180px] bg-gradient-to-b from-gray-50 to-white border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 rounded-xl overflow-hidden relative group">
						{#if imagePreview}
							<img
								src={imagePreview}
								alt="Product preview"
								class="h-[180px] w-full object-contain p-2"
							/>
							<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
								<button
									type="button"
									class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 text-red-500 rounded-lg px-4 py-2 hover:bg-white hover:text-red-600 transition-all duration-200 flex items-center gap-2 text-sm font-medium"
									onclick={() => {
										imagePreview = null;
										formData.Image = undefined;
										const input = document.getElementById('image') as HTMLInputElement;
										if (input) input.value = '';
									}}
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
									Remove Image
								</button>
							</div>
						{:else}
							<div class="flex flex-col items-center justify-center text-center p-4">
								<div class="w-12 h-12 mb-3 rounded-full bg-blue-50 flex items-center justify-center">
									<svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
								</div>
								<p class="text-sm font-medium text-gray-700">Drop your image here, or click to browse</p>
								<p class="text-xs text-gray-500 mt-1">Maximum file size: 10MB</p>
							</div>
							<input
								type="file"
								id="image"
								accept="image/*"
								class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								onchange={handleFileChange}
							/>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<div class="space-y-1.5">
			<Label for="description" class="modern-label">Description</Label>
			<Textarea
				id="description"
				rows={3}
				required
				bind:value={formData.Description}
				class="modern-input"
				placeholder="Describe your product in detail..." />
		</div>

		<div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
			<Button class="btn-secondary" size="md" on:click={() => (showModal = false)}>Cancel</Button>
			<Button type="submit" class="btn-primary" size="md">Create Product</Button>
		</div>
	</form>
</Modal>
