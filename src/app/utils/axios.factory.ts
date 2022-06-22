import axios from "axios";

export function axiosFactory() {
	return axios.create({
		baseURL: "http://localhost:8080",
		// ??
		// transformRequest: [dateTransformer].concat(axios.defaults.transformRequest!),
		withCredentials: true,
	});
}