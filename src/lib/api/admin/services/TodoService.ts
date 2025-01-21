/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Todo } from '../models/Todo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../request';
export class TodoService {
	/**
	 * @returns Todo Success
	 * @throws ApiError
	 */
	public static getApiTodo(): CancelablePromise<Array<Todo>> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/Todo'
		});
	}
	/**
	 * @returns Todo Success
	 * @throws ApiError
	 */
	public static postApiTodo({ requestBody }: { requestBody?: Todo }): CancelablePromise<Todo> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/Todo',
			body: requestBody,
			mediaType: 'application/json'
		});
	}
	/**
	 * @returns Todo Success
	 * @throws ApiError
	 */
	public static getApiTodo1({ id }: { id: number }): CancelablePromise<Todo> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/Todo/{id}',
			path: {
				id: id
			}
		});
	}
	/**
	 * @returns any Success
	 * @throws ApiError
	 */
	public static putApiTodo({
		id,
		requestBody
	}: {
		id: number;
		requestBody?: Todo;
	}): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/Todo/{id}',
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
	public static deleteApiTodo({ id }: { id: number }): CancelablePromise<any> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/Todo/{id}',
			path: {
				id: id
			}
		});
	}
}
