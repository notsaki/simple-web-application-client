## Simple Web Application Client

The client application of [Simple Web Application](https://github.com/notsaki/simple-web-application).

- [API Documentation](https://simpleappreactspring.stoplight.io/docs/simple-web-application/af776cba49937-user-database)

Before running the app, a `.env` file should be provided matching the content of `.env.example`.

### Requirements

- Node JS
- Yarn

### Run the app

Before running the app, all the dependencies must be installed using `yarn install`.

- Run the app in a development environment `yarn start`.
- Build for production `yarn build`.

### Environment variables

- `API_URI` the URI to access the API. If the server is being run through docker, the port should be the same as 
- `SPRING_LOCAL_PORT` in the backend configuration.