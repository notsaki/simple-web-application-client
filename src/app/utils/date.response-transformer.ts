import {AxiosResponseTransformer} from "axios";

export const dateResponseTransformer: AxiosResponseTransformer = data => {
	try {
		return JSON.parse(data, (_, value) => {
			if(/\d\d\d\d-\d\d-\d\d/.test(value)) {
				const [year, month, day] = value.split("-").map(value => parseInt(value));
				return new Date(year, month - 1, day);
			}

			return value;
		});
	} catch {
		return data;
	}
};