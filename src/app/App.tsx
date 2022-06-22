import React from "react";
import { DependencyProvider } from "./dependency.context";
import Router from "./Router";
import {dependencyContextFactory} from "./utils/dependency-context.factory";

export default function App(): JSX.Element {
	return (
		<DependencyProvider value={dependencyContextFactory("impl")}>
			<Router />
		</DependencyProvider>
	);
}