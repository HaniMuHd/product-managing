/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageCompression } from '../models/ImageCompression';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../request';
export class ImageCompressionService {
	/**
	 * @returns ImageCompression Success
	 * @throws ApiError
	 */
	public static getApiImageCompression(): CancelablePromise<Array<ImageCompression>> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/ImageCompression'
		});
	}
	/**
	 * @returns ImageCompression Success
	 * @throws ApiError
	 */
	public static postApiImageCompression({
		formData
	}: {
		formData?: {
			file?: Blob;
		};
	}): CancelablePromise<ImageCompression> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/ImageCompression',
			formData: formData,
			mediaType: 'multipart/form-data'
		});
	}
	/**
	 * @returns ImageCompression Success
	 * @throws ApiError
	 */
	public static getApiImageCompression1({
		id
	}: {
		id: number;
	}): CancelablePromise<ImageCompression> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/ImageCompression/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * @returns any Success
	 * @throws ApiError
	 */
	public static putApiImageCompression({
		id,
		requestBody
	}: {
		id: number;
		requestBody?: ImageCompression;
	}): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/ImageCompression/{id}',
			path: {
				id: id
			},
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * @returns any Success
	 * @throws ApiError
	 */
	public static deleteApiImageCompression({ id }: { id: number }): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/ImageCompression/{id}',
			path: {
				id: id
			}
		});
	}
}
