import axios from "axios";
import {dateRequestTransformer} from "./date.request-transformer";
import {dateResponseTransformer} from "./date.response-transformer";
import {tokenRequestInterceptor, tokenResponseInterceptor} from "./token.interceptor";

if(!process.env.API_URI) throw new Error("Undefined API URI. Please provide a valid API address.");

export function axiosFactory() {
	const instance = axios.create({
		baseURL: process.env.API_URI,
		transformRequest: [dateRequestTransformer].concat(axios.defaults.transformRequest!),
		transformResponse: dateResponseTransformer,
		validateStatus: status => status >= 200 && status <= 299,
		withCredentials: false,
	});

	instance.interceptors.request.use(tokenRequestInterceptor);
	instance.interceptors.response.use(r => r, tokenResponseInterceptor);

	return instance;
}