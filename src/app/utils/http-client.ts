import {axiosFactory} from "./axios.utils/axios.factory";

enum RequestType {
	Post = "POST",
	Get = "GET",
	Patch = "PATCH",
	Delete = "DELETE",
}

function applyParametres(url: string, params: string[]): string {
	// For each param replace a {} in the url.
	return params.reduce((urlState, param) => urlState.replace("{}", param), url);
}

function splitRoute(route: string[]): [string, string[]] {
	const routeStr = route.shift();
	if (!routeStr) throw new Error("Route array should have at least one element.");
	return [routeStr, route];
}

/**
 * Wrapper class for HTTP requests.
 * Supported request types: POST, GET, PUT, DELETE.
 * The route should be provided as a list with the first element being the route. Any path param's position in the url
 * should be referenced with a {} and the actual value being after the first element in the list. e.g. [/user/{}/{},
 * "name", 25] will be translated to /user/name/25.
 *
 * POST and PATCH requests also support body.
 */
export default class HttpClient {
	private send<TResult>(requestType: RequestType, route: string[], body?: object): Promise<TResult> {
		const [apiRoute, params] = splitRoute(route);
		const serialisedRoute = applyParametres(apiRoute, params);

		return axiosFactory()
			.request({ method: requestType, url: serialisedRoute, data: body })
			.then(response => response.data)
			.catch(error => Promise.reject(error));
	}

	public delete<TResult>(route: string[]): Promise<TResult> {
		return this.send(RequestType.Delete, route, undefined);
	}

	public get<TResult>(route: string[]): Promise<TResult> {
		return this.send(RequestType.Get, route);
	}

	public post<TResult>(route: string[], body?: object): Promise<TResult> {
		return this.send(RequestType.Post, route, body);
	}

	public patch<TResult>(route: string[], body?: object): Promise<TResult> {
		return this.send(RequestType.Patch, route, body);
	}
}