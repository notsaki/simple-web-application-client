## Simple Web Application Client

The client side of [Simple Web Application](https://github.com/notsaki/simple-web-application).

- [API Documentation](https://simpleappreactspring.stoplight.io/docs/simple-web-application/af776cba49937-user-database)

Before running the app, a `.env` file should be provided matching the content of `.env.example`.

### Environment variables

- `API_URI` the URI to access the API. If the app is being run through docker in the same network with the backend, the 
`DOCKER` port should be used. Otherwise, the `LOCAL` port must be used.