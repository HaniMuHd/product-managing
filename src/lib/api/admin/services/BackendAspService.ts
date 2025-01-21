/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../request';
export class BackendAspService {
	/**
	 * @returns string Success
	 * @throws ApiError
	 */
	public static get(): CancelablePromise<string> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/'
		});
	}
}
