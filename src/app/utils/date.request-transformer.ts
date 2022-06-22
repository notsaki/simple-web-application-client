import {AxiosRequestTransformer} from "axios";

export const dateRequestTransformer: AxiosRequestTransformer = data => {
	if (data instanceof Date) {
		return data.toISOString().slice(0, 10);
	}

	// Recursively handle lists. Returns the same list but with all the dates that were found serialised.
	if (Array.isArray(data)) {
		return data.map(value => dateRequestTransformer(value));
	}

	// Recursively handle objects. Returns the same object but with every date it found serialised.
	if (typeof data === "object" && data !== null) {
		return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, dateRequestTransformer(value)]));
	}

	return data;
};