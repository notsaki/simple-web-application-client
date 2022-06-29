import axios, {AxiosRequestConfig} from "axios";
import {tokenKey} from "../../hooks/useAuthToken";
import {Jwt} from "../../domain/entities/jwt.entity";
import {dependencyContextFactory} from "../dependency-context.factory";

/**
 * Request interceptor that reads the local storage and applies the access token to request's headers. If no access
 * token is found, the request is being passed to the next interceptor without the header.
 */
export function tokenRequestInterceptor(request: AxiosRequestConfig): AxiosRequestConfig {
	const token = localStorage.getItem(tokenKey);

	if(token) {
		const jwt: Jwt = JSON.parse(token);

		request.headers = {
			...request.headers,
			Authorization: `Bearer ${jwt.access_token}`,
		};
	}

	return request;
}

/**
 * Response interceptor for unauthorised response. It reads the refresh token from the local storage and applies uses it
 * to make a refresh token request. If no token is found, then it re-throws it. The result of the refresh token is
 * being used to repeat the original request.
 */
export function tokenResponseInterceptor(error: any) {
	const status = error.response ? error.response.status : null;
	const token = localStorage.getItem(tokenKey);

	if(status === 401 && token !== null) {
		const jwt: Jwt = JSON.parse(token);

		return dependencyContextFactory("impl").daos.authDao
			.refresh({ refreshToken: jwt.refresh_token })
			.then(newToken => {
				let config: AxiosRequestConfig = error.config;

				localStorage.setItem(tokenKey, JSON.stringify(newToken));

				config.headers = {
					...config.headers,
					Authorization: `Bearer ${newToken.access_token}`,
				}

				const instance = axios.create({
					baseURL: process.env.API_URI,
					validateStatus: status => status >= 200 && status <= 299,
					withCredentials: false,
				});

				// Re-send the original request with the updated header.
				return instance.request(config);
			});
	}

	return Promise.reject(error);
}