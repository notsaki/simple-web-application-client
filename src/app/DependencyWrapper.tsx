import React from "react";
import { DependencyProvider } from "./dependency.context";
import {dependencyContextFactory} from "./utils/dependency-context.factory";
import App from "./App";
import "./styles/global.scss";

export default function DependencyWrapper(): JSX.Element {
	return (
		<DependencyProvider value={dependencyContextFactory("impl")}>
			<App />
		</DependencyProvider>
	);
}