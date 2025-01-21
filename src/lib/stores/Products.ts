import { writable } from 'svelte/store';
import type { Product } from '$lib/api/admin/models/Product';

export const products = writable<Product[]>([]);
