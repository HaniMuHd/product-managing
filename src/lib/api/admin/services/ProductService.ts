/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from '../models/Product';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../request';
export class ProductService {
	/**
	 * @returns Product Success
	 * @throws ApiError
	 */
	public static getApiProduct(): CancelablePromise<Array<Product>> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/Product'
		});
	}
	/**
	 * @returns Product Success
	 * @throws ApiError
	 */
	public static postApiProduct({
		formData
	}: {
		formData?: {
			Name?: string;
			Category?: string;
			Image?: Blob;
			Price?: string;
			Description?: string;
		};
	}): CancelablePromise<Product> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/Product',
			formData: formData,
			mediaType: 'multipart/form-data'
		});
	}
	/**
	 * @returns Product Success
	 * @throws ApiError
	 */
	public static getApiProduct1({ id }: { id: number }): CancelablePromise<Product> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/Product/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * @returns any Success
	 * @throws ApiError
	 */
	public static putApiProduct({
		id,
		formData
	}: {
		id: number;
		formData?: {
			Name?: string;
			Category?: string;
			Image?: Blob;
			Price?: string;
			Description?: string;
		};
	}): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/Product/{id}',
			path: {
				id: id
			},
			formData: formData,
			mediaType: 'multipart/form-data'
		});
	}
	/**
	 * @returns any Success
	 * @throws ApiError
	 */
	public static deleteApiProduct({ id }: { id: number }): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/Product/{id}',
			path: {
				id: id
			}
		});
	}
}
