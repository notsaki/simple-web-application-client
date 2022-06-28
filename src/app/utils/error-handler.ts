export function errorHandler(error, overrides: { [key: number]: string } = {}): string[] {

	const responses = {
		400: "Invalid request.",
		401: "Session expired.",
		403: "Access to this page is not allowed.",
		500: "Internal server error.",
		...overrides,
	}

	try {
		return [responses[error.response.status]];
	} catch {
		return ["Could not communicate with the server."];
	}
}