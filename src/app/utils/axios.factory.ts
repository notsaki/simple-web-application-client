import axios from "axios";
import {dateRequestTransformer} from "./date.request-transformer";
import {dateResponseTransformer} from "./date.response-transformer";
import {applyAuthTokenInterceptor} from "axios-jwt";
import {dependencyContextFactory} from "./dependency-context.factory";

export function axiosFactory() {
	const instance = axios.create({
		baseURL: "http://localhost:8080/",
		transformRequest: [dateRequestTransformer].concat(axios.defaults.transformRequest!),
		transformResponse: dateResponseTransformer,
		validateStatus: status => status >= 200 && status <= 299,
		withCredentials: true,
	});

	applyAuthTokenInterceptor(instance, {
		requestRefresh: refreshToken => dependencyContextFactory("impl").daos.authDao
			.refresh({ refreshToken })
			.then(jwt => jwt.access_token),
		header: "Authorization",
		headerPrefix: "Bearer ",
	});

	return instance;
}