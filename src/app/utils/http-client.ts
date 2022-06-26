import {axiosFactory} from "./axios.factory";

enum RequestType {
	Post = "POST",
	Get = "GET",
	Put = "PUT",
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

export default class HttpClient {
	private send<TResult>(requestType: RequestType, route: string[], body?: object): Promise<TResult> {
		const [apiRoute, params] = splitRoute(route);
		const serialisedRoute = applyParametres(apiRoute, params);

		return axiosFactory()
			.request({ method: requestType, url: serialisedRoute, data: body })
			.then(response => response.data ?? {})
			.catch(error => Promise.reject(error));
	}

	public delete<TResult>(route: string[]): Promise<TResult> {
		return this.send(RequestType.Delete, route);
	}

	public get<TResult>(route: string[]): Promise<TResult> {
		return this.send(RequestType.Get, route);
	}

	public post<TResult>(route: string[], body: object): Promise<TResult> {
		return this.send(RequestType.Post, route, body);
	}

	public put<TResult>(route: string[], body: object): Promise<TResult> {
		return this.send(RequestType.Put, route, body);
	}
}