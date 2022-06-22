import axios from "axios";
import {dateRequestTransformer} from "./date.request-transformer";
import {dateResponseTransformer} from "./date.response-transformer";

export function axiosFactory() {
	return axios.create({
		baseURL: "http://localhost:8080",
		transformRequest: [dateRequestTransformer].concat(axios.defaults.transformRequest!),
		transformResponse: dateResponseTransformer,
		withCredentials: true,
	});
}