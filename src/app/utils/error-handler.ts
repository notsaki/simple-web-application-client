export function errorHandler(error, overrides: { [key: number]: string } = {}): string[] {

	const responses = {
		400: "Invalid request.",
		401: "Session expired.",
		404: "Requested entity not found.",
		422: "Invalid data format.",
		403: "Access not allowed.",
		500: "Internal server error.",
		0: "Unexpected error.",
		...overrides,
	};

	console.log(error.response.status);

	try {
		return [responses[error.response.status]];
	} catch {
		return ["Could not communicate with the server."];
	}
}