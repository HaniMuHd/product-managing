import { error, fail } from '@sveltejs/kit';
import { ProductService } from '$lib/api/admin/services/ProductService';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const products = await ProductService.getApiProduct();
		console.log(products);
		return {
			products
		};
	} catch (err) {
		throw error(500, 'Failed to load products');
	}
};
