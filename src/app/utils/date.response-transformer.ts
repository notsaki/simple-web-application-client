import {AxiosResponseTransformer} from "axios";

/**
 * Manual de-serialisation interceptor for Axios that supports a date in the format: yyyy-mm-dd.
 * @param data
 */
export const dateResponseTransformer: AxiosResponseTransformer = data => {
	try {
		return JSON.parse(data, (_, value) => {
			if(/\d\d\d\d-\d\d-\d\d/.test(value)) {
				const [year, month, day] = value.split("-").map(value => parseInt(value));
				// Month in a date object should be zero based.
				return new Date(year, month - 1, day);
			}

			return value;
		});
	} catch {
		// If data are not a valid JSON, just return them.
		return data;
	}
};